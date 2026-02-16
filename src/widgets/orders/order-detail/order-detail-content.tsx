"use client";

import { memo, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useOrder } from "@/entities/order/api/use-order";
import { useOrderDocuments } from "@/entities/order/api/use-order-documents";
import { useDeleteOrder } from "@/entities/order/api/use-delete-order";
import { useUpdateOrder } from "@/entities/order/api/use-update-order";
import { useToastState } from "@/shared/store/toast-store";
import { Surface } from "@/shared/ui/surface/surface";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { OrderDetailSkeleton } from "./order-detail-skeleton";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { ORDER_STATUS_LABELS, ORDER_STATUS_BADGE_CLASSES, ORDER_CUSTOMER_TYPE_LABELS } from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import { FileDown, FileText, User, Loader2, Pencil, Trash2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import type { OrganizationSuggestion } from "@/shared/ui/form-fields/organization-suggest-input";
import { useRouter } from "next/navigation";
import { OrderDocumentKind, OrderStatus } from "@/shared/api/generated/graphql";

function formatOrderDate(date: string | unknown): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

/** Только дата (без времени), чтобы не показывать 03:00 из-за UTC. */
function formatDocumentDate(date: string | unknown): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(date);
  }
}

function documentFileLabel(fileUrl: string): "PDF" | "DOCX" {
  const lower = fileUrl.toLowerCase();
  return lower.endsWith(".docx") || lower.includes(".docx?") ? "DOCX" : "PDF";
}

function documentKindLabel(kind: OrderDocumentKind): string {
  switch (kind) {
    case OrderDocumentKind.TrainingApplication:
      return "Заявка на обучение";
    case OrderDocumentKind.Contract:
      return "Договор";
    case OrderDocumentKind.Act:
      return "Акт оказанных услуг";
    default:
      return kind;
  }
}

function EditOrderDialog({
  order,
  open,
  onOpenChange,
  onSave,
  loading,
}: {
  order: OrderFieldsFragment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (input: {
    contactEmail?: string;
    contactPhone?: string;
    organizationId?: string;
    organizationQuery?: string;
  }) => Promise<void>;
  loading: boolean;
}) {
  const [email, setEmail] = useState(order.contactEmail ?? "");
  const [phone, setPhone] = useState(order.contactPhone ?? "");
  const [selectedOrg, setSelectedOrg] = useState<OrganizationSuggestion | null>(null);

  useEffect(() => {
    if (open) {
      setEmail(order.contactEmail ?? "");
      setPhone(order.contactPhone ?? "");
      setSelectedOrg(null);
    }
  }, [open, order.contactEmail, order.contactPhone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrg) {
      onSave({
        contactEmail: email || undefined,
        contactPhone: phone || undefined,
        organizationQuery: selectedOrg.inn,
      });
    } else {
      onSave({
        contactEmail: email || undefined,
        contactPhone: phone || undefined,
      });
    }
  };

  const handleOrgSelect = useCallback((suggestion: OrganizationSuggestion) => {
    setSelectedOrg(suggestion);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Контактные данные заявки</DialogTitle>
          <DialogDescription className="sr-only">
            Измените email, телефон и организацию для заявки
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-order-email">Email</Label>
            <Input
              id="edit-order-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-order-phone">Телефон</Label>
            <Input
              id="edit-order-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 000-00-00"
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <OrganizationSuggestInput
              label="Организация"
              placeholder="ИНН или название организации"
              description="Необязательно. Введите ИНН или название и выберите из списка."
              onSelect={handleOrgSelect}
              clearAfterSelect={false}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getGraphQLErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) return String((error as { message: string }).message);
  if (error && typeof error === "object" && "graphQLErrors" in error) {
    const gql = (error as { graphQLErrors?: Array<{ message?: string }> }).graphQLErrors;
    return gql?.[0]?.message ?? "Ошибка операции";
  }
  return "Ошибка операции";
}

export const OrderDetailContent = memo(function OrderDetailContent({
  orderId,
}: {
  orderId: string;
}) {
  const router = useRouter();
  const { showToast } = useToastState();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { order, loading, error, refetch } = useOrder(orderId);
  const { documents, loading: documentsLoading } = useOrderDocuments(orderId);
  const { deleteOrder, loading: deleteLoading } = useDeleteOrder();
  const { updateOrder, loading: updateOrderLoading } = useUpdateOrder();

  const handleDeleteOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      const ok = await deleteOrder(orderId);
      if (ok) {
        showToast("success", "Заявка удалена.");
        router.push("/orders");
      } else {
        showToast("error", "Не удалось удалить заявку.");
      }
    } catch (e) {
      showToast("error", getGraphQLErrorMessage(e));
      throw e;
    }
  }, [orderId, deleteOrder, router, showToast]);

  const handleEditOrder = useCallback(
    async (input: {
      contactEmail?: string;
      contactPhone?: string;
      organizationId?: string;
      organizationQuery?: string;
    }) => {
      if (!orderId) return;
      try {
        await updateOrder(orderId, {
          contactEmail: input.contactEmail ?? null,
          contactPhone: input.contactPhone ?? null,
          organizationId: input.organizationId ?? null,
          organizationQuery: input.organizationQuery ?? null,
        });
        await refetch();
        setEditOpen(false);
        showToast("success", "Контактные данные обновлены.");
      } catch (e) {
        showToast("error", getGraphQLErrorMessage(e));
      }
    },
    [orderId, updateOrder, refetch, showToast]
  );

  if (loading && !order) {
    return <OrderDetailSkeleton />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!order) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Заявка не найдена.</p>
        <Button
          variant="link"
          className="mt-2"
          onClick={() => router.push("/orders")}
        >
          К списку заявок
        </Button>
      </Surface>
    );
  }

  const statusLabel =
    ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] ??
    order.status;
  const statusBadgeClass =
    ORDER_STATUS_BADGE_CLASSES[order.status] ??
    "border-border/60 bg-muted/20 text-muted-foreground";
  const customerTypeLabel =
    ORDER_CUSTOMER_TYPE_LABELS[order.customerType] ?? order.customerType;
  const orderDisplayNumber = (order as OrderFieldsFragment & { number?: string | null }).number ?? order.id;
  const isAwaitingPayment = order.status === OrderStatus.AwaitingPayment;

  return (
    <div className="space-y-6">
      <Surface variant="floating" className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Заявка №{orderDisplayNumber}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatOrderDate(order.createdAt)}
            </p>
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-sm font-semibold",
                statusBadgeClass
              )}
            >
              {statusLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {isAwaitingPayment && (
              <Button asChild>
                <Link href={`/orders/${order.id}/pay`}>Оплатить</Link>
              </Button>
            )}
            {isAwaitingPayment && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Действия с заявкой">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[180px] rounded-xl">
                    <DropdownMenuItem onClick={() => setEditOpen(true)} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteConfirmOpen(true)}
                      disabled={deleteLoading}
                      className="gap-2 text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <EditOrderDialog
                  order={order}
                  open={editOpen}
                  onOpenChange={setEditOpen}
                  onSave={handleEditOrder}
                  loading={updateOrderLoading}
                />
                <ConfirmDialog
                  open={deleteConfirmOpen}
                  onOpenChange={setDeleteConfirmOpen}
                  title="Удалить заявку?"
                  description="Это действие нельзя отменить."
                  confirmLabel="Удалить"
                  cancelLabel="Отмена"
                  variant="destructive"
                  onConfirm={handleDeleteOrder}
                  loading={deleteLoading}
                />
              </>
            )}
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/orders">К списку заявок</Link>
            </Button>
          </div>
        </div>
      </Surface>

      <Surface variant="floating" className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Тип заказчика:</span>
            <span className="font-medium text-foreground">{customerTypeLabel}</span>
          </div>
          {order.contactEmail && (
            <div className="text-sm">
              <span className="text-muted-foreground">Email: </span>
              <span className="font-medium text-foreground">{order.contactEmail}</span>
            </div>
          )}
          {order.contactPhone && (
            <div className="text-sm">
              <span className="text-muted-foreground">Телефон: </span>
              <span className="font-medium text-foreground">{order.contactPhone}</span>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <FileText className="h-5 w-5" />
            Позиции заявки
          </h2>
          <ul className="space-y-3">
            {order.lines.map((line, idx) => (
              <li
                key={`${line.programId}-${line.hours}-${idx}`}
                className="rounded-xl border border-border/60 bg-muted/10 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      {line.subProgramTitle ?? line.programTitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {line.hours} ч × {line.quantity} —{" "}
                      {formatPriceWithCurrency(line.lineAmount)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {formatPriceWithCurrency(line.lineAmount)}
                  </span>
                </div>
                {line.learners && line.learners.length > 0 && (
                  <div className="mt-3 border-t border-border/60 pt-3">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Слушатели:
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-foreground">
                      {line.learners.map((l, i) => (
                        <li key={i}>
                          {l.lastName} {l.firstName}
                          {l.middleName ? ` ${l.middleName}` : ""}
                          {l.email ? ` (${l.email})` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border/60 pt-4 text-right">
          <span className="text-sm text-muted-foreground">Итого: </span>
          <span className="text-xl font-bold text-primary">
            {formatPriceWithCurrency(order.totalAmount)}
          </span>
        </div>
      </Surface>

      <Surface variant="floating" className="space-y-4 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <FileText className="h-5 w-5" />
          Документы
        </h2>
        {documentsLoading ? (
          <p className="text-sm text-muted-foreground">Загрузка…</p>
        ) : documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Документы по заявке пока не сформированы.
          </p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => {
              const fileLabel = doc.fileUrl
                ? documentFileLabel(doc.fileUrl)
                : "PDF";
              const isPdf = fileLabel === "PDF";
              return (
                <li
                  key={doc.id}
                  className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-xl border border-border/50 bg-muted/5 px-4 py-3 dark:border-white/10 sm:gap-4"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50"
                    aria-hidden
                  >
                    <FileText
                      className={cn(
                        "h-4 w-4",
                        isPdf ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                      )}
                    />
                  </span>
                  <span className="min-w-0 text-sm font-medium text-foreground">
                    {documentKindLabel(doc.kind)}
                  </span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {formatDocumentDate(doc.documentDate)}
                  </span>
                  {doc.fileUrl ? (
                    <Button variant="outline" size="sm" asChild className="shrink-0 gap-2 rounded-xl">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <FileDown className="h-4 w-4 shrink-0" aria-hidden />
                        Скачать {fileLabel}
                      </a>
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Surface>
    </div>
  );
});
