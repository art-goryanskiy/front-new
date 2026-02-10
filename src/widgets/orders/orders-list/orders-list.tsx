"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { useMyOrders } from "@/entities/order/api/use-my-orders";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { ORDER_STATUS_LABELS } from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import { Package, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const STATUS_FILTER_OPTIONS: { value: string | undefined; label: string }[] = [
  { value: undefined, label: "Все" },
  { value: "AWAITING_PAYMENT", label: ORDER_STATUS_LABELS["AWAITING_PAYMENT"] ?? "Ожидает оплаты" },
  { value: "PAID", label: ORDER_STATUS_LABELS["PAID"] ?? "Оплачен" },
  { value: "COMPLETED", label: ORDER_STATUS_LABELS["COMPLETED"] ?? "Завершён" },
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

const OrderCard = memo(function OrderCard({
  order,
}: {
  order: OrderFieldsFragment;
}) {
  const statusLabel = ORDER_STATUS_LABELS[order.status] ?? order.status;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="block rounded-xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="text-muted-foreground">№</span>
            <span className="truncate">{order.number ?? order.id}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatOrderDate(order.createdAt)}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {formatPriceWithCurrency(order.totalAmount)}
          </p>
          <span className="mt-2 inline-block rounded-full border border-border/60 bg-muted/20 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {statusLabel}
          </span>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
      </div>
    </Link>
  );
});

export const OrdersList = memo(function OrdersList() {
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const { orders, loading, error } = useMyOrders({
    filter: { limit: 20, status: statusFilter },
  });

  if (loading && orders.length === 0) {
    return <LoadingState message="Загрузка заказов…" />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="space-y-6">
      <Tabs
        value={statusFilter ?? "all"}
        onValueChange={(v) => setStatusFilter(v === "all" ? undefined : v)}
        className="w-full"
      >
        <TabsList
          className={cn(
            "inline-flex h-10 w-full flex-wrap justify-start gap-1 rounded-2xl p-1 sm:w-auto",
            "bg-muted/50 border border-border/40"
          )}
        >
          <TabsTrigger value="all" className="rounded-xl px-4">
            Все
          </TabsTrigger>
          {STATUS_FILTER_OPTIONS.filter((o) => o.value).map((opt) => (
            <TabsTrigger key={opt.value} value={opt.value!} className="rounded-xl px-4">
              {opt.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {orders.length === 0 ? (
        <EmptyState
          title="Заказов пока нет"
          description={
            statusFilter
              ? "В этой категории заказов не найдено."
              : "Оформленные заказы появятся здесь."
          }
          icon={<Package className="h-10 w-10 text-muted-foreground" />}
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
});
