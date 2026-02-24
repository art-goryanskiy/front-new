"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Checkout] Error boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Surface
        variant="floating"
        className="mx-auto w-full max-w-md p-6 text-center"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Ошибка при оформлении заказа
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Что-то пошло не так. Ваш заказ не был оформлен — попробуйте
          ещё раз или вернитесь в корзину.
        </p>
        {process.env.NODE_ENV === "development" && error?.message && (
          <p className="mt-2 rounded bg-muted px-3 py-2 text-left font-mono text-xs text-muted-foreground">
            {error.message}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => reset()} variant="default">
            Попробовать снова
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">Вернуться в корзину</Link>
          </Button>
        </div>
      </Surface>
    </div>
  );
}
