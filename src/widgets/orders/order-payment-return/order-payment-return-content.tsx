"use client";

import { memo, useEffect } from "react";
import Link from "next/link";
import { useOrder } from "@/entities/order/api/use-order";
import { useOrderPaymentSync } from "@/entities/order/api/use-order-payment-sync";
import { Surface } from "@/shared/ui/surface/surface";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export const OrderPaymentReturnContent = memo(function OrderPaymentReturnContent({
  orderId,
  variant,
}: {
  orderId: string;
  variant: "success" | "fail";
}) {
  const { sync, loading: syncLoading } = useOrderPaymentSync(orderId);
  const { order, loading: orderLoading, refetch: refetchOrder } = useOrder(orderId);

  useEffect(() => {
    if (sync && sync.updated && orderId) {
      refetchOrder();
    }
  }, [sync?.updated, orderId, refetchOrder]);

  if (syncLoading && !sync) {
    return <LoadingState message="Синхронизация статуса оплаты…" />;
  }

  if (orderLoading && !order) {
    return <LoadingState message="Загрузка заказа…" />;
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <ErrorState message="Заказ не найден." />
        <Button asChild variant="outline">
          <Link href="/orders">К списку заказов</Link>
        </Button>
      </div>
    );
  }

  const isSuccess = variant === "success";

  return (
    <div className="mx-auto w-full max-w-lg">
      <Surface
        variant="floating"
        className={cn(
          "relative overflow-hidden p-8 text-center",
          "ring-1 transition-shadow",
          isSuccess
            ? "ring-emerald-500/20 bg-emerald-500/5 shadow-lg shadow-emerald-500/5"
            : "ring-amber-500/20 bg-amber-500/5 shadow-lg shadow-amber-500/5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl",
            isSuccess ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
          )}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
          ) : (
            <XCircle className="h-9 w-9" strokeWidth={2} />
          )}
        </div>
        <h1
          className={cn(
            "mt-6 text-2xl font-bold tracking-tight",
            isSuccess ? "text-emerald-800 dark:text-emerald-200" : "text-amber-800 dark:text-amber-200"
          )}
        >
          {isSuccess ? "Оплата прошла успешно" : "Оплата не выполнена"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSuccess
            ? "Заказ получен и принят в обработку. Детали заказа обновлены."
            : "Платёж не был завершён или произошла ошибка. Вы можете попробовать оплатить снова."}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Заказ №{order.id}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="min-w-[180px] font-medium">
            <Link href={`/orders/${orderId}`}>К заказу</Link>
          </Button>
          {!isSuccess && (
            <Button asChild variant="outline" size="lg" className="min-w-[180px] gap-2 font-medium">
              <Link href={`/orders/${orderId}/pay`}>
                <CreditCard className="h-4 w-4" />
                Оплатить снова
              </Link>
            </Button>
          )}
        </div>
      </Surface>
      <div className="mt-6 text-center">
        <Button variant="link" asChild>
          <Link href="/orders">К списку заказов</Link>
        </Button>
      </div>
    </div>
  );
});
