"use client";

import { memo } from "react";
import Link from "next/link";
import { useMyOrders } from "@/entities/order/api/use-my-orders";
import { Surface } from "@/shared/ui/surface/surface";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { ORDER_STATUS_LABELS } from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import { Package, ChevronRight } from "lucide-react";

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
  const statusLabel =
    ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] ??
    order.status;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="block rounded-xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="text-muted-foreground">№</span>
            <span className="truncate">{order.id}</span>
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
  const { orders, loading, error } = useMyOrders({ filter: { limit: 50 } });

  if (loading && orders.length === 0) {
    return <LoadingState message="Загрузка заказов…" />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="Заказов пока нет"
        description="Оформленные заказы появятся здесь."
        icon={<Package className="h-10 w-10 text-muted-foreground" />}
      />
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
});
