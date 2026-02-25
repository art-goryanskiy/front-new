"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { useMyOrders } from "@/entities/order/api/use-my-orders";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { OrdersListSkeleton } from "./orders-list-skeleton";
import { Surface } from "@/shared/ui/surface/surface";
import {
  formatPriceWithCurrency,
  formatOrderDate,
} from "@/shared/lib/helpers/format-helpers";
import {
  formatProgramsCount,
  formatLearnersCount,
} from "@/shared/lib/helpers/plural";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_BADGE_CLASSES,
} from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import { Package, ChevronRight, CreditCard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUS_FILTER_OPTIONS: {
  value: string | undefined;
  label: string;
}[] = [
  { value: undefined, label: "Все" },
  {
    value: "AWAITING_PAYMENT",
    label:
      ORDER_STATUS_LABELS["AWAITING_PAYMENT"] ?? "Ожидает оплаты",
  },
  { value: "PAID", label: ORDER_STATUS_LABELS["PAID"] ?? "Оплачен" },
  {
    value: "IN_PROGRESS",
    label: ORDER_STATUS_LABELS["IN_PROGRESS"] ?? "В работе",
  },
  {
    value: "COMPLETED",
    label: ORDER_STATUS_LABELS["COMPLETED"] ?? "Завершён",
  },
  {
    value: "CANCELLED",
    label: ORDER_STATUS_LABELS["CANCELLED"] ?? "Отменён",
  },
];

function orderSummary(order: OrderFieldsFragment): {
  programsCount: number;
  learnersCount: number;
  firstProgramTitle: string | null;
} {
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
  return {
    programsCount,
    learnersCount,
    firstProgramTitle: firstProgramTitle ?? null,
  };
}

const OrderCard = memo(function OrderCard({
  order,
}: {
  order: OrderFieldsFragment;
}) {
  const statusLabel =
    ORDER_STATUS_LABELS[order.status] ?? order.status;
  const statusClass =
    ORDER_STATUS_BADGE_CLASSES[order.status] ??
    "border-border/60 bg-muted/20 text-muted-foreground";
  const isAwaitingPayment = order.status === "AWAITING_PAYMENT";
  const { programsCount, learnersCount, firstProgramTitle } =
    orderSummary(order);
  const summaryLine = [
    formatProgramsCount(programsCount),
    formatLearnersCount(learnersCount),
  ].join(" · ");

  return (
    <Link
      href={`/orders/${order.id}`}
      className={cn(
        "group block rounded-xl border border-border/60 bg-background/60 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5",
        isAwaitingPayment && "ring-1 ring-amber-500/20"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              № {order.number ?? order.id}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                statusClass
              )}
            >
              {statusLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatOrderDate(order.createdAt)}
          </p>
          <p className="text-xs text-muted-foreground">
            {summaryLine}
          </p>
          {firstProgramTitle && (
            <p
              className="line-clamp-1 text-sm text-foreground/90"
              title={firstProgramTitle}
            >
              {firstProgramTitle}
            </p>
          )}
          <p className="text-base font-semibold text-foreground">
            {formatPriceWithCurrency(order.totalAmount)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {isAwaitingPayment && (
            <CreditCard className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          )}
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
});

function OrdersEmptyContent({ hasFilter }: { hasFilter: boolean }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          Заявок пока нет
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          {hasFilter
            ? "В этой категории заявок не найдено."
            : "Оформленные заявки появятся здесь."}
        </p>
      </div>
      {!hasFilter && (
        <Button asChild variant="outline">
          <Link href="/qualification-upgrade">Выбрать программу</Link>
        </Button>
      )}
    </div>
  );
}

export const OrdersList = memo(function OrdersList() {
  const [statusFilter, setStatusFilter] = useState<
    string | undefined
  >(undefined);
  const { orders, previousOrders, loading, error } = useMyOrders({
    filter: { limit: 20, status: statusFilter },
  });

  // Скелетон только при самой первой загрузке страницы — никогда при смене фильтра.
  // При смене фильтра показываем stale данные с opacity пока летит запрос.
  const hasAnyLoadedData =
    orders.length > 0 || previousOrders.length > 0;
  const isFirstLoad = loading && !hasAnyLoadedData;
  const isRefetching = loading && hasAnyLoadedData;
  const displayOrders =
    loading && orders.length === 0 ? previousOrders : orders;

  if (isFirstLoad) {
    return <OrdersListSkeleton />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <Surface
      variant="floating"
      className="relative overflow-hidden p-6"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative z-10 space-y-6">
        <Tabs
          value={statusFilter ?? "all"}
          onValueChange={(v) =>
            setStatusFilter(v === "all" ? undefined : v)
          }
          className="w-full"
        >
          <div className="relative">
            <div className="overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <TabsList
                className={cn(
                  "inline-flex h-10 w-max min-w-full gap-1 rounded-2xl p-1",
                  "border border-border/40 bg-muted/50"
                )}
              >
                <TabsTrigger value="all" className="rounded-xl px-4">
                  Все
                </TabsTrigger>
                {STATUS_FILTER_OPTIONS.filter((o) => o.value).map(
                  (opt) => (
                    <TabsTrigger
                      key={opt.value}
                      value={opt.value!}
                      className="rounded-xl px-4 whitespace-nowrap"
                    >
                      {opt.label}
                    </TabsTrigger>
                  )
                )}
              </TabsList>
            </div>
            <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l from-background/60 to-transparent" />
          </div>
        </Tabs>

        <div
          className={cn(
            "transition-opacity duration-200",
            isRefetching && "pointer-events-none opacity-50"
          )}
        >
          {displayOrders.length === 0 ? (
            <OrdersEmptyContent hasFilter={!!statusFilter} />
          ) : (
            <div className="space-y-3">
              {displayOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Surface>
  );
});
