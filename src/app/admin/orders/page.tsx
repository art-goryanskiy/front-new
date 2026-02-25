"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { useAdminOrders } from "@/entities/order/api/use-admin-orders";
import { ADMIN_ORDERS_LIMIT } from "@/shared/constants/admin";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { Surface } from "@/shared/ui/surface/surface";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import {
  formatAdminDate,
  formatDateRange,
  formatPriceWithCurrency,
} from "@/shared/lib/helpers/format-helpers";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_CUSTOMER_TYPE_LABELS,
} from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import type { OrderStatus } from "@/shared/api/generated/graphql";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { Package, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: {
  value: OrderStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "Все статусы" },
  {
    value: "AWAITING_PAYMENT" as OrderStatus,
    label:
      ORDER_STATUS_LABELS["AWAITING_PAYMENT"] ?? "Ожидает оплаты",
  },
  {
    value: "PAID" as OrderStatus,
    label: ORDER_STATUS_LABELS["PAID"] ?? "Оплачен",
  },
  {
    value: "IN_PROGRESS" as OrderStatus,
    label: ORDER_STATUS_LABELS["IN_PROGRESS"] ?? "В работе",
  },
  {
    value: "COMPLETED" as OrderStatus,
    label: ORDER_STATUS_LABELS["COMPLETED"] ?? "Завершён",
  },
  {
    value: "CANCELLED" as OrderStatus,
    label: ORDER_STATUS_LABELS["CANCELLED"] ?? "Отменён",
  },
];

function orderSummary(order: OrderFieldsFragment) {
  const lines = order.lines ?? [];
  const programsCount = lines.length;
  const learnersCount = lines.reduce(
    (sum, line) => sum + (line.learners?.length ?? 0),
    0
  );
  const firstLine = lines[0];
  const firstProgramTitle =
    firstLine?.programTitle?.trim() ||
    firstLine?.subProgramTitle?.trim() ||
    null;
  return { programsCount, learnersCount, firstProgramTitle };
}

const OrderRow = memo(function OrderRow({
  order,
}: {
  order: OrderFieldsFragment;
}) {
  const statusLabel =
    ORDER_STATUS_LABELS[order.status] ?? order.status;
  const statusClass =
    ORDER_STATUS_BADGE_CLASSES[order.status] ??
    "border-border/60 bg-muted/20 text-muted-foreground";
  const customerTypeLabel =
    ORDER_CUSTOMER_TYPE_LABELS[order.customerType] ??
    order.customerType;
  const { programsCount, learnersCount, firstProgramTitle } =
    orderSummary(order);
  const displayNumber =
    (order as { number?: string | null }).number ?? order.id;
  const customerDisplayName =
    order.customerDisplayName?.trim() || "—";
  const trainingDates = formatDateRange(
    order.trainingStartDate,
    order.trainingEndDate
  );
  const statusChangedAtFormatted = order.statusChangedAt
    ? formatAdminDate(order.statusChangedAt)
    : null;

  return (
    <Link href={`/admin/orders/${order.id}`}>
      <Surface
        variant="floating"
        className={cn(
          "group flex flex-wrap items-center justify-between gap-4 p-4 transition-all duration-200",
          "rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md",
          "dark:border-white/10 dark:hover:border-primary/40"
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-semibold text-foreground">
              Заявка №{displayNumber}
            </p>
            <p className="text-sm text-muted-foreground">
              {customerTypeLabel} · {customerDisplayName}
            </p>
            <p className="text-sm text-muted-foreground">
              Сроки обучения: {trainingDates}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatAdminDate(order.createdAt)} · {programsCount}{" "}
              поз. · {learnersCount} слуш.
              {firstProgramTitle ? ` · ${firstProgramTitle}` : ""}
            </p>
            {statusChangedAtFormatted && (
              <p className="text-xs text-muted-foreground/80">
                Статус изменён: {statusChangedAtFormatted}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
              statusClass
            )}
          >
            {statusLabel}
          </span>
          <span className="text-sm font-semibold text-primary">
            {formatPriceWithCurrency(order.totalAmount)}
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
      </Surface>
    </Link>
  );
});

function AdminOrdersListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Surface
          key={i}
          variant="floating"
          className="h-20 animate-pulse rounded-2xl border border-border/50"
        />
      ))}
    </div>
  );
}

const AdminOrdersPage = memo(function AdminOrdersPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filter = useMemo(
    () =>
      statusFilter === "all"
        ? { limit: ADMIN_ORDERS_LIMIT, offset: 0 }
        : { status: statusFilter, limit: ADMIN_ORDERS_LIMIT, offset: 0 },
    [statusFilter]
  );

  const { orders, loading, error } = useAdminOrders(filter);

  // Клиентский поиск по номеру заявки, имени заказчика и программам
  const filteredOrders = useMemo(() => {
    if (!q.trim()) return orders;
    const lq = q.toLowerCase();
    return orders.filter((order) => {
      const num = ((order as { number?: string | null }).number ?? order.id).toLowerCase();
      const customer = (order.customerDisplayName ?? "").toLowerCase();
      const programs = (order.lines ?? [])
        .map((l) => `${l.programTitle ?? ""} ${l.subProgramTitle ?? ""}`)
        .join(" ")
        .toLowerCase();
      return num.includes(lq) || customer.includes(lq) || programs.includes(lq);
    });
  }, [orders, q]);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <AdminPageHeader
        variant="default"
        title="Заявки"
        description="Просмотр и управление заявками на обучение"
      />

      <DashboardSection
        title="Список заявок"
        actions={
          <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
            {filteredOrders.length} / {orders.length}
          </span>
        }
      >
        <DataToolbar
          searchValue={q}
          onSearchValueChange={setQ}
          searchPlaceholder="Поиск по номеру, заказчику или программе…"
          rightSlot={
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}
            >
              <SelectTrigger className="h-9 w-[180px] rounded-xl bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />

        {error && (
          <ErrorState
            message={error.message}
            className="rounded-2xl border border-border/50"
          />
        )}
        {!error && loading && orders.length === 0 && (
          <AdminOrdersListSkeleton />
        )}
        {!error && !loading && filteredOrders.length === 0 && (
          <EmptyState
            title={q ? "Ничего не найдено" : "Заявок пока нет"}
            description={
              q
                ? "Попробуйте изменить запрос или сбросить фильтры."
                : "Заявки на обучение появятся здесь после создания."
            }
            icon={<Package className="h-8 w-8 text-muted-foreground" />}
          />
        )}
        {!error && filteredOrders.length > 0 && (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </DashboardSection>
    </div>
  );
});

export default AdminOrdersPage;
