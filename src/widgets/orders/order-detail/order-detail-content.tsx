"use client";

import { memo } from "react";
import Link from "next/link";
import { useOrder } from "@/entities/order/api/use-order";
import { Surface } from "@/shared/ui/surface/surface";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { ORDER_STATUS_LABELS, ORDER_CUSTOMER_TYPE_LABELS } from "@/shared/constants/orders";
import type { OrderFieldsFragment } from "@/shared/api/generated/graphql";
import { ArrowLeft, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export const OrderDetailContent = memo(function OrderDetailContent({
  orderId,
}: {
  orderId: string;
}) {
  const router = useRouter();
  const { order, loading, error } = useOrder(orderId);

  if (loading && !order) {
    return <LoadingState message="Загрузка заказа…" />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!order) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Заказ не найден.</p>
        <Button
          variant="link"
          className="mt-2"
          onClick={() => router.push("/orders")}
        >
          К списку заказов
        </Button>
      </Surface>
    );
  }

  const statusLabel =
    ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] ??
    order.status;
  const customerTypeLabel =
    ORDER_CUSTOMER_TYPE_LABELS[order.customerType] ?? order.customerType;

  return (
    <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground">
            Заказ №{order.id}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatOrderDate(order.createdAt)}
          </p>
          <span className="inline-block rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-sm font-semibold text-muted-foreground">
            {statusLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {order.status === "PAYMENT_PENDING" && (
            <Button asChild>
              <Link href={`/orders/${order.id}/pay`}>Оплатить</Link>
            </Button>
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
            Позиции заказа
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
          <Link href="/orders">К списку заказов</Link>
        </Button>
      </div>
    </div>
  );
});
