"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { useAdminOrders } from "@/entities/order/api/use-admin-orders";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Surface } from "@/shared/ui/surface/surface";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
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

function formatShortDate(date: string | unknown): string {
  if (!date) return "";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return String(date);
  }
}

function formatTrainingDates(
  start: string | unknown,
  end: string | unknown
): string {
  const s = formatShortDate(start).trim();
  const e = formatShortDate(end).trim();
  if (s && e) return `${s} – ${e}`;
  if (s) return s;
  if (e) return e;
  return "—";
}

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
  const trainingDates = formatTrainingDates(
    order.trainingStartDate,
    order.trainingEndDate
  );
  const statusChangedAtFormatted = order.statusChangedAt
    ? formatOrderDate(order.statusChangedAt)
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
              {formatOrderDate(order.createdAt)} · {programsCount}{" "}
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
  const [statusFilter, setStatusFilter] = useState<
    OrderStatus | "all"
  >("all");

  const filter = useMemo(
    () =>
      statusFilter === "all"
        ? undefined
        : { status: statusFilter, limit: 100, offset: 0 },
    [statusFilter]
  );

  const { orders, loading, error } = useAdminOrders(filter);

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
          <Select
            value={statusFilter}
            onValueChange={(v) =>
              setStatusFilter(v as OrderStatus | "all")
            }
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
      >
        {error && (
          <ErrorState
            message={error.message}
            className="rounded-2xl border border-border/50"
          />
        )}
        {!error && loading && orders.length === 0 && (
          <AdminOrdersListSkeleton />
        )}
        {!error && !loading && orders.length === 0 && (
          <Surface
            variant="floating"
            className="rounded-2xl border border-border/50 p-8 text-center text-muted-foreground"
          >
            Заявок не найдено
          </Surface>
        )}
        {!error && orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </DashboardSection>
    </div>
  );
});

export default AdminOrdersPage;
