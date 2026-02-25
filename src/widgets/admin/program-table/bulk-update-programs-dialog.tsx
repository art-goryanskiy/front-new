"use client";

import { useMemo, useState } from "react";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCategories } from "@/entities/category/api/use-categories";
import { useUpdateProgramsBulk } from "@/entities/program/api/use-update-programs-bulk";
import { useDeleteProgram } from "@/entities/program/api/use-delete-program";
import type { CategoryType } from "@/shared/api/generated/graphql";
import type { UpdateProgramsBulkInput } from "@/entities/program/api/use-update-programs-bulk";
import { getAdminFormErrorMessage } from "@/shared/lib/graphql/error-to-user-message";
import { useToastState } from "@/shared/store/toast-store";

type BulkAction = "category" | "pricing" | "delete";

type PricingRow = {
  id: string;
  hours: string;
  price: string;
};

export function BulkUpdateProgramsDialog({
  open,
  onOpenChange,
  selectedIds,
  onApplied,
  categoryType,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedIds: string[];
  onApplied?: () => void;
  categoryType?: CategoryType | null;
}) {
  const { showToast } = useToastState();
  const { updateProgramsBulk } = useUpdateProgramsBulk();
  const { deleteProgram } = useDeleteProgram();
  const { categories } = useCategories();

  const [action, setAction] = useState<BulkAction>("category");
  const [category, setCategory] = useState("");
  const [baseHours, setBaseHours] = useState("");
  const [pricingRows, setPricingRows] = useState<PricingRow[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedUniqueIds = useMemo(
    () => Array.from(new Set(selectedIds)),
    [selectedIds]
  );
  const scopedCategories = useMemo(
    () =>
      categoryType
        ? categories.filter((item) => item.type === categoryType)
        : categories,
    [categories, categoryType]
  );

  const resetDraft = () => {
    setAction("category");
    setCategory("");
    setBaseHours("");
    setPricingRows([]);
    setConfirmDelete(false);
    setSubmitting(false);
  };

  const parsePricingPatch = () => {
    const rows = pricingRows
      .map((row) => ({
        rawHours: row.hours.trim(),
        rawPrice: row.price.trim(),
        hours: Number(row.hours),
        price: Number(row.price),
      }));
    const hasPartial = rows.some(
      (row) =>
        (row.rawHours.length > 0 && row.rawPrice.length === 0) ||
        (row.rawPrice.length > 0 && row.rawHours.length === 0)
    );
    if (hasPartial) {
      throw new Error("Заполните и часы, и цену в каждой строке.");
    }
    const pricing = rows
      .filter((row) => row.rawHours.length > 0 && row.rawPrice.length > 0)
      .map((row) => ({ hours: row.hours, price: row.price }));
    if (
      pricing.some(
        (row) => !Number.isFinite(row.hours) || !Number.isFinite(row.price)
      )
    ) {
      throw new Error("Часы и цена должны быть корректными числами.");
    }
    const parsedBaseHours =
      baseHours.trim().length > 0 ? Number(baseHours) : undefined;
    if (
      parsedBaseHours !== undefined &&
      (!Number.isFinite(parsedBaseHours) || parsedBaseHours < 0)
    ) {
      throw new Error("Базовые часы должны быть корректным числом.");
    }
    if (pricing.length === 0 && parsedBaseHours === undefined) {
      throw new Error("Добавьте хотя бы одну строку часы-цена или базовые часы.");
    }
    return {
      mode: "REPLACE" as const,
      ...(parsedBaseHours !== undefined
        ? { baseHours: parsedBaseHours }
        : {}),
      ...(pricing.length > 0 ? { pricing } : {}),
    };
  };

  const handleApply = async () => {
    if (selectedUniqueIds.length === 0) {
      showToast("error", "Выберите хотя бы одну программу.");
      return;
    }

    try {
      setSubmitting(true);

      if (action === "delete") {
        if (!confirmDelete) {
          throw new Error("Подтвердите удаление выбранных программ.");
        }
        const results = await Promise.allSettled(
          selectedUniqueIds.map((id) => deleteProgram(id))
        );
        const deleted = results.filter(
          (item) => item.status === "fulfilled" && !!item.value
        ).length;
        const failed = selectedUniqueIds.length - deleted;
        if (deleted === 0) {
          showToast("error", "Не удалось удалить выбранные программы.");
          return;
        }
        showToast(
          failed === 0 ? "success" : "info",
          failed === 0
            ? `Удалено программ: ${deleted}`
            : `Удалено: ${deleted}, с ошибками: ${failed}`
        );
        onApplied?.();
        onOpenChange(false);
        resetDraft();
        return;
      }

      let input: UpdateProgramsBulkInput;
      if (action === "category") {
        if (!category.trim()) {
          throw new Error("Выберите категорию.");
        }
        if (!scopedCategories.some((item) => item.id === category.trim())) {
          throw new Error(
            "Выбранная категория не относится к текущему разделу."
          );
        }
        input = {
          ids: selectedUniqueIds,
          patch: {
            mode: "REPLACE",
            category: category.trim(),
          },
          dryRun: false,
        };
      } else {
        input = {
          ids: selectedUniqueIds,
          patch: parsePricingPatch(),
          dryRun: false,
        };
      }

      const result = await updateProgramsBulk(input);
      if (!result) {
        throw new Error("Сервер вернул пустой ответ.");
      }
      if (result.updated === 0 && result.failed.length > 0) {
        showToast("error", "Не удалось применить изменения.");
        return;
      }
      showToast(
        result.failed.length === 0 ? "success" : "info",
        result.failed.length === 0
          ? `Обновлено программ: ${result.updated}/${result.total}`
          : `Обновлено: ${result.updated}/${result.total}, с ошибками: ${result.failed.length}`
      );
      onApplied?.();
      onOpenChange(false);
      resetDraft();
    } catch (error) {
      showToast(
        "error",
        getAdminFormErrorMessage(
          error,
          action === "delete"
            ? "Не удалось удалить выбранные программы"
            : "Не удалось применить изменения"
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const ActionButton = ({
    value,
    label,
    description,
    danger,
  }: {
    value: BulkAction;
    label: string;
    description: string;
    danger?: boolean;
  }) => (
    <button
      type="button"
      onClick={() => setAction(value)}
      className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
        action === value
          ? danger
            ? "border-red-500/60 bg-red-500/10"
            : "border-primary/50 bg-primary/10"
          : "border-border/50 bg-background/40 hover:bg-background/60"
      }`}
    >
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">
        {description}
      </div>
    </button>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!submitting) {
          onOpenChange(next);
          if (!next) resetDraft();
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Пакетное изменение программ
          </DialogTitle>
          <DialogDescription>
            Выбрано программ: <span className="font-semibold">{selectedUniqueIds.length}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <div className="space-y-2">
            <ActionButton
              value="category"
              label="Сменить категорию"
              description="Перенос выбранных программ"
            />
            <ActionButton
              value="pricing"
              label="Часы и цены"
              description="Добавить или обновить тарифы"
            />
            <ActionButton
              value="delete"
              label="Удалить программы"
              description="Полное удаление выбранных"
              danger
            />
          </div>

          <div className="rounded-xl border border-border/50 bg-background/40 p-4">
            {action === "category" && (
              <div className="space-y-2">
                <Label htmlFor="bulk-category">Новая категория</Label>
                <Select
                  value={category || "__none__"}
                  onValueChange={(value) =>
                    setCategory(value === "__none__" ? "" : value)
                  }
                >
                  <SelectTrigger id="bulk-category">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__" disabled>
                      Выберите категорию
                    </SelectItem>
                    {scopedCategories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {action === "pricing" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bulk-base-hours">
                    Базовые часы (опционально)
                  </Label>
                  <Input
                    id="bulk-base-hours"
                    type="number"
                    placeholder="Например: 72"
                    value={baseHours}
                    onChange={(e) => setBaseHours(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Часы - цена</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPricingRows((prev) => [
                          ...prev,
                          {
                            id: crypto.randomUUID(),
                            hours: "",
                            price: "",
                          },
                        ])
                      }
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Добавить
                    </Button>
                  </div>

                  {pricingRows.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Добавьте строки, если нужно изменить цены по часам.
                    </p>
                  ) : null}

                  <div className="space-y-2">
                    {pricingRows.map((row) => (
                      <div key={row.id} className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="часы"
                          value={row.hours}
                          onChange={(e) =>
                            setPricingRows((prev) =>
                              prev.map((item) =>
                                item.id === row.id
                                  ? {
                                      ...item,
                                      hours: e.target.value,
                                    }
                                  : item
                              )
                            )
                          }
                        />
                        <Input
                          type="number"
                          placeholder="цена"
                          value={row.price}
                          onChange={(e) =>
                            setPricingRows((prev) =>
                              prev.map((item) =>
                                item.id === row.id
                                  ? {
                                      ...item,
                                      price: e.target.value,
                                    }
                                  : item
                              )
                            )
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setPricingRows((prev) =>
                              prev.filter((item) => item.id !== row.id)
                            )
                          }
                          aria-label="Удалить строку"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {action === "delete" && (
              <div className="space-y-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                <div className="flex items-start gap-2">
                  <Trash2 className="mt-0.5 h-4 w-4 text-red-500" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Будут удалены выбранные программы. Действие необратимо.
                  </p>
                </div>
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-red-500"
                    checked={confirmDelete}
                    onChange={(event) =>
                      setConfirmDelete(event.target.checked)
                    }
                  />
                  Подтверждаю удаление
                </label>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={submitting}
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            type="button"
            disabled={submitting}
            variant={action === "delete" ? "destructive" : "default"}
            onClick={handleApply}
          >
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {action === "category"
              ? "Сменить категорию"
              : action === "pricing"
                ? "Применить цены"
                : "Удалить программы"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
