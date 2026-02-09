"use client";

import { memo, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useOrder } from "@/entities/order/api/use-order";
import {
  useUpdateOrderStatus,
  PROGRESS_ORDER_STATUS_OPTIONS,
} from "@/entities/order/api/use-update-order-status";
import { useDeleteOrder } from "@/entities/order/api/use-delete-order";
import { useUpdateOrder } from "@/entities/order/api/use-update-order";
import { useToastState } from "@/shared/store/toast-store";
import { Surface } from "@/shared/ui/surface/surface";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { ORDER_STATUS_LABELS, ORDER_CUSTOMER_TYPE_LABELS } from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import { ArrowLeft, FileText, User, Loader2, ChevronDown, Pencil, Trash2 } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import type { OrganizationSuggestion } from "@/shared/ui/form-fields/organization-suggest-input";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/shared/api/generated/graphql";

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

const CAN_CHANGE_PROGRESS_STATUS = [OrderStatus.Paid, OrderStatus.InProgress];

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
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Редактировать
        </Button>
      </DialogTrigger>
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
  const [updatingStatus, setUpdatingStatus] = useState<OrderStatus | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const { order, loading, error, refetch } = useOrder(orderId);
  const { updateOrderStatus, loading: updateLoading } = useUpdateOrderStatus();
  const { deleteOrder, loading: deleteLoading } = useDeleteOrder();
  const { updateOrder, loading: updateOrderLoading } = useUpdateOrder();

  const handleStatusChange = useCallback(
    async (newStatus: OrderStatus) => {
      if (!orderId) return;
      setUpdatingStatus(newStatus);
      try {
        await updateOrderStatus(orderId, newStatus);
        await refetch();
        showToast("success", "Статус заявки обновлён.");
      } catch (e) {
        showToast("error", getGraphQLErrorMessage(e));
      } finally {
        setUpdatingStatus(null);
      }
    },
    [orderId, updateOrderStatus, refetch, showToast]
  );

  const handleCancelOrder = useCallback(() => {
    handleStatusChange(OrderStatus.Cancelled);
  }, [handleStatusChange]);

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
    return <LoadingState message="Загрузка заявки…" />;
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
  const customerTypeLabel =
    ORDER_CUSTOMER_TYPE_LABELS[order.customerType] ?? order.customerType;
  const orderDisplayNumber = (order as OrderFieldsFragment & { number?: string | null }).number ?? order.id;
  const isAwaitingPayment = order.status === OrderStatus.AwaitingPayment;

  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground">
            Заявка №{orderDisplayNumber}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatOrderDate(order.createdAt)}
          </p>
          <span className="inline-block rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-sm font-semibold text-muted-foreground">
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
              <Button
                variant="outline"
                size="sm"
                disabled={updateLoading && updatingStatus === OrderStatus.Cancelled}
                onClick={handleCancelOrder}
                className="gap-2"
              >
                {updateLoading && updatingStatus === OrderStatus.Cancelled ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                Отменить заявку
              </Button>
              <EditOrderDialog
                order={order}
                open={editOpen}
                onOpenChange={setEditOpen}
                onSave={handleEditOrder}
                loading={updateOrderLoading}
              />
              <Button
                variant="outline"
                size="sm"
                disabled={deleteLoading}
                onClick={() => setDeleteConfirmOpen(true)}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Удалить
              </Button>
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
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="self-start sm:self-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        </div>
      </div>

      {CAN_CHANGE_PROGRESS_STATUS.includes(order.status) && (
        <Surface variant="inset" className="flex flex-wrap items-center justify-between gap-4 p-4">
          <span className="text-sm font-medium text-muted-foreground">Сменить статус заявки</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={updateLoading}
                className="gap-2 rounded-xl border-border/60"
              >
                {updateLoading && updatingStatus ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                Выбрать статус
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px] rounded-xl">
              {PROGRESS_ORDER_STATUS_OPTIONS.map(({ value, label }) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => handleStatusChange(value)}
                  disabled={value === order.status || (updateLoading && updatingStatus === value)}
                  className="gap-2"
                >
                  {updatingStatus === value ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Surface>
      )}

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
                      {line.programTitle}
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

      <div className="flex justify-start">
        <Button variant="outline" asChild>
          <Link href="/orders">К списку заявок</Link>
        </Button>
      </div>
    </div>
  );
});
