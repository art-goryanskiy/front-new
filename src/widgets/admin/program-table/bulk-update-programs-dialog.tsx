"use client";

import { useMemo, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/entities/category/api/use-categories";
import { useUpdateProgramsBulk } from "@/entities/program/api/use-update-programs-bulk";
import type { CategoryType } from "@/shared/api/generated/graphql";
import type {
  BulkFailureCode,
  BulkPatchMode,
  UpdateProgramsBulkFailedItem,
  UpdateProgramsBulkInput,
  UpdateProgramsBulkResult,
} from "@/entities/program/api/use-update-programs-bulk";
import { getAdminFormErrorMessage } from "@/shared/lib/graphql/error-to-user-message";
import { useToastState } from "@/shared/store/toast-store";

const FAILED_CODE_LABELS: Record<string, string> = {
  NOT_FOUND: "Не найдено",
  BAD_REQUEST: "Некорректные данные",
  CONFLICT: "Конфликт данных",
  INTERNAL_ERROR: "Внутренняя ошибка",
};

type PricingRow = {
  id: string;
  hours: string;
  price: string;
};

type FailedFilter = "ALL" | BulkFailureCode;

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
  const { updateProgramsBulk, loading } = useUpdateProgramsBulk();
  const { categories } = useCategories();

  const [mode, setMode] = useState<BulkPatchMode>("REPLACE");
  const [category, setCategory] = useState("");
  const [baseHours, setBaseHours] = useState("");
  const [pricingRows, setPricingRows] = useState<PricingRow[]>([]);
  const [dryRunDefault, setDryRunDefault] = useState(true);
  const [confirmClear, setConfirmClear] = useState(false);
  const [autoDryRunBeforeApply, setAutoDryRunBeforeApply] =
    useState(true);
  const [failedFilter, setFailedFilter] =
    useState<FailedFilter>("ALL");
  const [lastResult, setLastResult] =
    useState<UpdateProgramsBulkResult | null>(null);
  const [lastRunMeta, setLastRunMeta] = useState<{
    dryRun: boolean;
    idsKey: string;
    draftKey: string;
  } | null>(null);

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
  const selectedIdsKey = useMemo(
    () => [...selectedUniqueIds].sort().join("|"),
    [selectedUniqueIds]
  );
  const currentDraftKey = useMemo(
    () =>
      JSON.stringify({
        mode,
        category: category.trim(),
        baseHours: baseHours.trim(),
        pricingRows: pricingRows.map((item) => ({
          hours: item.hours,
          price: item.price,
        })),
      }),
    [mode, category, baseHours, pricingRows]
  );
  const failedByCode = useMemo(() => {
    const groups: Record<
      BulkFailureCode,
      UpdateProgramsBulkFailedItem[]
    > = {
      NOT_FOUND: [],
      BAD_REQUEST: [],
      CONFLICT: [],
      INTERNAL_ERROR: [],
    };
    if (!lastResult) return groups;
    for (const item of lastResult.failed) {
      groups[item.code].push(item);
    }
    return groups;
  }, [lastResult]);
  const filteredFailed = useMemo(() => {
    if (!lastResult) return [];
    if (failedFilter === "ALL") return lastResult.failed;
    return failedByCode[failedFilter];
  }, [failedByCode, failedFilter, lastResult]);
  const lastFailedIds = useMemo(
    () => new Set(lastResult?.failed.map((item) => item.id) ?? []),
    [lastResult]
  );
  const passedIdsFromLastDryRun = useMemo(() => {
    if (!lastRunMeta?.dryRun) return [];
    const ids = lastRunMeta.idsKey
      ? lastRunMeta.idsKey.split("|")
      : [];
    return ids.filter((id) => id && !lastFailedIds.has(id));
  }, [lastFailedIds, lastRunMeta]);
  const canApplyOnlyPassed = useMemo(
    () =>
      !!lastResult &&
      !!lastRunMeta &&
      lastRunMeta.dryRun &&
      lastRunMeta.idsKey === selectedIdsKey &&
      lastRunMeta.draftKey === currentDraftKey &&
      passedIdsFromLastDryRun.length > 0,
    [
      currentDraftKey,
      lastResult,
      lastRunMeta,
      passedIdsFromLastDryRun.length,
      selectedIdsKey,
    ]
  );

  const resetDraft = () => {
    setMode("REPLACE");
    setCategory("");
    setBaseHours("");
    setPricingRows([]);
    setDryRunDefault(true);
    setConfirmClear(false);
    setAutoDryRunBeforeApply(true);
    setFailedFilter("ALL");
    setLastResult(null);
    setLastRunMeta(null);
  };

  const parsePatch = () => {
    if (mode === "CLEAR") {
      return { mode: "CLEAR" as const };
    }

    if (mode === "DELTA") {
      if (!baseHours.trim()) {
        throw new Error("Для режима DELTA нужно указать baseHours");
      }

      const deltaHours = Number(baseHours);
      if (!Number.isFinite(deltaHours)) {
        throw new Error("baseHours должен быть числом");
      }

      return {
        mode: "DELTA" as const,
        baseHours: deltaHours,
      };
    }

    const pricing = pricingRows
      .map((row) => ({
        hours: Number(row.hours),
        price: Number(row.price),
      }))
      .filter((row) => Number.isFinite(row.hours));

    if (pricing.some((row) => !Number.isFinite(row.price))) {
      throw new Error(
        "Для pricing заполните корректные значения hours и price"
      );
    }

    return {
      mode: "REPLACE" as const,
      ...(category.trim() ? { category: category.trim() } : {}),
      ...(baseHours.trim() ? { baseHours: Number(baseHours) } : {}),
      ...(pricing.length > 0 ? { pricing } : {}),
    };
  };

  const runMutation = async (
    dryRun: boolean,
    idsOverride?: string[]
  ) => {
    const idsToUse = Array.from(
      new Set((idsOverride ?? selectedUniqueIds).filter(Boolean))
    );
    if (idsToUse.length === 0) {
      throw new Error("Выберите хотя бы одну программу");
    }

    const patch = parsePatch();
    if (
      patch.mode === "REPLACE" &&
      patch.category &&
      !scopedCategories.some((item) => item.id === patch.category)
    ) {
      throw new Error(
        "Выбранная подкатегория не относится к текущей основной категории"
      );
    }
    if (patch.mode === "CLEAR" && !dryRun && !confirmClear) {
      throw new Error("Подтвердите CLEAR режим перед применением");
    }
    const input: UpdateProgramsBulkInput = {
      ids: idsToUse,
      patch,
      dryRun,
    };

    const result = await updateProgramsBulk(input);
    if (!result) {
      throw new Error("Сервер вернул пустой ответ");
    }
    setLastResult(result);
    setLastRunMeta({
      dryRun,
      idsKey: [...idsToUse].sort().join("|"),
      draftKey: currentDraftKey,
    });
    setFailedFilter("ALL");
    return result;
  };
  const copyIds = async (ids: string[], label: string) => {
    if (ids.length === 0) {
      showToast("info", `Нет ID для копирования: ${label}`);
      return;
    }
    try {
      await navigator.clipboard.writeText(ids.join("\n"));
      showToast(
        "success",
        `Скопировано ID (${label}): ${ids.length}`
      );
    } catch {
      showToast("error", "Не удалось скопировать ID");
    }
  };

  const handleDryRun = async () => {
    try {
      const result = await runMutation(true);
      showToast(
        "info",
        `Проверка: ${result.updated} из ${result.total} программ готовы к обновлению`
      );
    } catch (error) {
      showToast(
        "error",
        getAdminFormErrorMessage(
          error,
          "Не удалось выполнить предварительную проверку"
        )
      );
    }
  };

  const handleApply = async () => {
    try {
      if (!dryRunDefault && autoDryRunBeforeApply) {
        const preview = await runMutation(true);
        if (preview.failed.length > 0) {
          showToast(
            "info",
            `Dry-run выявил ошибки (${preview.failed.length}). Проверьте детали справа перед применением.`
          );
          return;
        }
      }

      const result = await runMutation(dryRunDefault);
      if (!dryRunDefault) {
        showToast(
          result.failed.length === 0 ? "success" : "info",
          result.failed.length === 0
            ? `Обновлено программ: ${result.updated}/${result.total}`
            : `Обновлено ${result.updated}/${result.total}, с ошибками: ${result.failed.length}`
        );
        onApplied?.();
      } else {
        showToast("info", "dryRun включен: изменения не сохранены");
      }
    } catch (error) {
      showToast(
        "error",
        getAdminFormErrorMessage(
          error,
          "Не удалось выполнить массовое обновление"
        )
      );
    }
  };
  const handleRetryFilteredFailedDryRun = async () => {
    try {
      const ids = filteredFailed.map((item) => item.id);
      const result = await runMutation(true, ids);
      showToast(
        "info",
        `Повторная проверка: ${result.updated}/${result.total}`
      );
    } catch (error) {
      showToast(
        "error",
        getAdminFormErrorMessage(
          error,
          "Не удалось повторить проверку для выбранной группы"
        )
      );
    }
  };
  const handleApplyOnlyPassed = async () => {
    try {
      if (!canApplyOnlyPassed) {
        throw new Error(
          "Сначала выполните dry-run на текущем наборе и без изменения черновика"
        );
      }
      const result = await runMutation(
        false,
        passedIdsFromLastDryRun
      );
      showToast(
        result.failed.length === 0 ? "success" : "info",
        `Применено по прошедшим preflight: ${result.updated}/${result.total}`
      );
      onApplied?.();
    } catch (error) {
      showToast(
        "error",
        getAdminFormErrorMessage(
          error,
          "Не удалось применить изменения для прошедших preflight"
        )
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!loading) {
          onOpenChange(next);
          if (!next) {
            resetDraft();
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Массовое обновление программ</DialogTitle>
          <DialogDescription>
            Выбрано программ: {selectedUniqueIds.length}. Доступен
            правый клик по строке для быстрого выбора.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-border/50 p-4">
            <div className="space-y-2">
              <Label htmlFor="bulk-mode">Режим обновления</Label>
              <Select
                value={mode}
                onValueChange={(value) =>
                  setMode(value as BulkPatchMode)
                }
              >
                <SelectTrigger id="bulk-mode">
                  <SelectValue placeholder="Выберите режим" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REPLACE">
                    Замена (REPLACE) - обновить выбранные поля
                  </SelectItem>
                  <SelectItem value="DELTA">
                    Дельта (DELTA) - изменить только базовые часы
                  </SelectItem>
                  <SelectItem value="CLEAR">
                    Очистка (CLEAR) - очистить часы и цены
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {mode === "REPLACE"
                  ? "REPLACE: можно указать подкатегорию, базовые часы и/или цены."
                  : mode === "DELTA"
                    ? "DELTA: разрешено только поле базовых часов."
                    : "CLEAR: очищаются базовые часы и цены; подкатегорию указывать нельзя."}
              </p>
            </div>

            {mode === "REPLACE" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bulk-category">
                    Подкатегория (опционально)
                  </Label>
                  <Select
                    value={category || "__none__"}
                    onValueChange={(value) =>
                      setCategory(value === "__none__" ? "" : value)
                    }
                  >
                    <SelectTrigger id="bulk-category">
                      <SelectValue placeholder="Не изменять подкатегорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">
                        Не изменять подкатегорию
                      </SelectItem>
                      {scopedCategories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {scopedCategories.length === 0
                      ? "Для текущей основной категории пока нет доступных подкатегорий."
                      : "Выберите подкатегорию только из текущей основной категории."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulk-base-hours">
                    Базовые часы (опционально)
                  </Label>
                  <Input
                    id="bulk-base-hours"
                    type="number"
                    placeholder="72"
                    value={baseHours}
                    onChange={(e) => setBaseHours(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Цены и часы (опционально)</Label>
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
                  <div className="space-y-2">
                    {pricingRows.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        Если не заполнить pricing, поле не будет
                        изменено.
                      </p>
                    ) : null}
                    {pricingRows.map((row) => (
                      <div
                        key={row.id}
                        className="flex items-center gap-2"
                      >
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
                              prev.filter(
                                (item) => item.id !== row.id
                              )
                            )
                          }
                          aria-label="Удалить тариф"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {mode === "DELTA" && (
              <div className="space-y-2">
                <Label htmlFor="bulk-delta-base-hours">
                  Базовые часы (обязательно)
                </Label>
                <Input
                  id="bulk-delta-base-hours"
                  type="number"
                  placeholder="Например: 16"
                  value={baseHours}
                  onChange={(e) => setBaseHours(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  В DELTA-режиме разрешено только поле baseHours.
                </p>
              </div>
            )}

            {mode === "CLEAR" && (
              <div className="space-y-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  CLEAR очистит pricing и baseHours. Передавать
                  category в этом режиме нельзя.
                </p>
                <label className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-amber-500"
                    checked={confirmClear}
                    onChange={(event) =>
                      setConfirmClear(event.target.checked)
                    }
                  />
                  Подтверждаю, что понимаю последствия CLEAR
                </label>
              </div>
            )}

            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Режим dry-run по умолчанию
                </p>
                <p className="text-xs text-muted-foreground">
                  Если включено, изменения не сохраняются.
                </p>
              </div>
              <Switch
                checked={dryRunDefault}
                onCheckedChange={setDryRunDefault}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/50 p-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Авто dry-run перед Apply
                </p>
                <p className="text-xs text-muted-foreground">
                  Работает, если dryRun отключен.
                </p>
              </div>
              <Switch
                checked={autoDryRunBeforeApply}
                onCheckedChange={setAutoDryRunBeforeApply}
              />
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-border/50 p-4">
            <p className="text-sm font-semibold">
              Результат последнего запуска
            </p>

            {lastResult ? (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    total: {lastResult.total}
                  </Badge>
                  <Badge variant="success">
                    updated: {lastResult.updated}
                  </Badge>
                  <Badge
                    variant={
                      lastResult.failed.length > 0
                        ? "warning"
                        : "secondary"
                    }
                  >
                    failed: {lastResult.failed.length}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/40 p-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={
                      failedFilter === "ALL" ? "default" : "outline"
                    }
                    onClick={() => setFailedFilter("ALL")}
                  >
                    Все ({lastResult.failed.length})
                  </Button>
                  {(
                    Object.keys(failedByCode) as BulkFailureCode[]
                  ).map((code) => (
                    <Button
                      key={code}
                      type="button"
                      size="sm"
                      variant={
                        failedFilter === code ? "default" : "outline"
                      }
                      onClick={() => setFailedFilter(code)}
                    >
                      {FAILED_CODE_LABELS[code]} (
                      {failedByCode[code].length})
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyIds(
                        lastResult.failed.map((item) => item.id),
                        "все ошибки"
                      )
                    }
                  >
                    Копировать ID всех ошибок
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyIds(
                        filteredFailed.map((item) => item.id),
                        failedFilter === "ALL"
                          ? "текущий фильтр"
                          : FAILED_CODE_LABELS[failedFilter]
                      )
                    }
                  >
                    Копировать ID по фильтру ошибок
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={filteredFailed.length === 0 || loading}
                    onClick={handleRetryFilteredFailedDryRun}
                  >
                    Повторить проверку по фильтру
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    disabled={!canApplyOnlyPassed || loading}
                    onClick={handleApplyOnlyPassed}
                  >
                    Применить только прошедшие preflight (
                    {passedIdsFromLastDryRun.length})
                  </Button>
                </div>

                <div className="max-h-64 space-y-2 overflow-auto rounded-lg border border-border/40 p-2">
                  {filteredFailed.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      По текущему фильтру ошибок нет.
                    </p>
                  ) : (
                    filteredFailed.map((item) => (
                      <div
                        key={`${item.id}-${item.code}`}
                        className="rounded-md border border-border/40 p-2 text-xs"
                      >
                        <p className="font-medium">
                          {FAILED_CODE_LABELS[item.code] ?? item.code}
                        </p>
                        <p className="text-muted-foreground">
                          id: {item.id}
                        </p>
                        <p className="text-muted-foreground">
                          {item.message}
                        </p>
                        <div className="mt-1">
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={() =>
                              copyIds([item.id], `ID ${item.id}`)
                            }
                          >
                            Копировать ID
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Сначала выполните dry-run или применение, чтобы
                увидеть детализацию.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={handleDryRun}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Проверить (dry-run)
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={handleApply}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {dryRunDefault ? "Запустить с dryRun" : "Применить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
