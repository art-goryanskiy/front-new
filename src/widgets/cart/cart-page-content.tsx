"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";
import { useMyCart } from "@/entities/cart/api/use-my-cart";
import { useUpdateCartItem } from "@/entities/cart/api/use-update-cart-item";
import { useRemoveFromCart } from "@/entities/cart/api/use-remove-from-cart";
import { useAddToCart } from "@/entities/cart/api/use-add-to-cart";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { ShoppingCart, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { saveReturnUrl } from "@/shared/lib/auth/utils/auth-redirect-utils";
import { AUTH_GUARD_ROUTES } from "@/shared/lib/auth/constants/auth-guard-constants";
import { useToastState } from "@/shared/store/toast-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function handleCartError(
  err: unknown,
  router: ReturnType<typeof useRouter>
): boolean {
  const e = err as {
    networkError?: { statusCode?: number };
    graphQLErrors?: Array<{ extensions?: { code?: string } }>;
  };
  const is401 =
    e?.networkError?.statusCode === 401 ||
    e?.graphQLErrors?.some(
      (g) => g?.extensions?.code === "UNAUTHENTICATED"
    );
  if (is401) {
    saveReturnUrl(window.location.pathname);
    router.replace(AUTH_GUARD_ROUTES.login);
    return true;
  }
  return false;
}

export const CartPageContent = memo(function CartPageContent() {
  const router = useRouter();
  const [loadingPricingChangeKey, setLoadingPricingChangeKey] = useState<
    string | null
  >(null);

  const { items, totalAmount, loading, error } = useMyCart();
  const { updateCartItem, loading: updating } = useUpdateCartItem();
  const { removeFromCart, loading: removing } = useRemoveFromCart();
  const { addToCart } = useAddToCart();
  const { showToast } = useToastState();

  const handlePricingChange = useCallback(
    async (
      cartItemKey: string,
      item: {
        programId: string;
        pricingIndex: number;
        quantity: number;
        subProgramIndex?: number | null;
      },
      newPricingIndex: number
    ) => {
      if (newPricingIndex === item.pricingIndex) return;
      setLoadingPricingChangeKey(cartItemKey);
      try {
        await removeFromCart({
          programId: item.programId,
          pricingIndex: item.pricingIndex,
          ...(item.subProgramIndex != null && {
            subProgramIndex: item.subProgramIndex,
          }),
        });
        await addToCart({
          programId: item.programId,
          pricingIndex: newPricingIndex,
          quantity: item.quantity,
          ...(item.subProgramIndex != null && {
            subProgramIndex: item.subProgramIndex,
          }),
        });
        showToast("success", "Тариф изменён");
      } catch (err) {
        if (handleCartError(err, router)) return;
        showToast("error", "Не удалось изменить тариф");
      } finally {
        setLoadingPricingChangeKey(null);
      }
    },
    [addToCart, removeFromCart, router, showToast]
  );

  const handleQuantityChange = useCallback(
    async (
      programId: string,
      pricingIndex: number,
      newQuantity: number,
      subProgramIndex?: number | null
    ) => {
      try {
        await updateCartItem({
          programId,
          pricingIndex,
          quantity: newQuantity,
          ...(subProgramIndex != null && { subProgramIndex }),
        });
      } catch (err) {
        if (handleCartError(err, router)) return;
        showToast("error", "Не удалось изменить количество");
      }
    },
    [router, showToast, updateCartItem]
  );

  const handleRemove = useCallback(
    async (
      programId: string,
      pricingIndex: number,
      subProgramIndex?: number | null
    ) => {
      try {
        await removeFromCart({
          programId,
          pricingIndex,
          ...(subProgramIndex != null && { subProgramIndex }),
        });
        showToast("success", "Удалено из корзины");
      } catch (err) {
        if (handleCartError(err, router)) return;
        showToast("error", "Не удалось удалить");
      }
    },
    [removeFromCart, router, showToast]
  );

  if (loading && items.length === 0) {
    return (
      <Surface
        variant="floating"
        className="flex min-h-[320px] items-center justify-center"
      >
        <div className="text-sm text-muted-foreground">
          Загрузка корзины…
        </div>
      </Surface>
    );
  }

  if (error && items.length === 0) {
    return (
      <Surface
        variant="floating"
        className="flex min-h-[320px] flex-col items-center justify-center gap-4"
      >
        <p className="text-sm text-muted-foreground">
          Не удалось загрузить корзину
        </p>
        <Button asChild variant="outline">
          <Link href="/">На главную</Link>
        </Button>
      </Surface>
    );
  }

  if (items.length === 0 && loadingPricingChangeKey) {
    return (
      <Surface
        variant="floating"
        className="flex min-h-[320px] items-center justify-center"
      >
        <div className="text-sm text-muted-foreground">
          Изменение тарифа…
        </div>
      </Surface>
    );
  }

  if (items.length === 0) {
    return (
      <Surface
        variant="floating"
        className="flex min-h-[320px] flex-col items-center justify-center gap-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            Корзина пуста
          </h2>
          <p className="text-sm text-muted-foreground">
            Добавьте программы со страниц программ, чтобы оформить запись.
          </p>
        </div>
        <Button asChild>
          <Link href="/qualification-upgrade">Выбрать программу</Link>
        </Button>
      </Surface>
    );
  }

  return (
    <div className="space-y-6">
      <Surface
        variant="floating"
        className="relative overflow-hidden p-6"
      >
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 space-y-4">
          {items.map((item) => {
            const pricing = item.program?.pricing?.[item.pricingIndex];
            const program = item.program;
            if (!program) return null;

            const price = pricing?.price ?? 0;
            const hours = pricing?.hours ?? 0;

            const cartItemKey = `${item.programId}-${item.pricingIndex}-${item.subProgramIndex ?? "p"}`;

            return (
              <div
                key={cartItemKey}
                className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/60 p-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <Link
                  href={`/programs/${program.id}`}
                  className="flex min-w-0 flex-1 gap-3 sm:gap-4"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={item.displayTitle}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {item.displayTitle}
                    </h3>
                    {program.pricing && program.pricing.length > 1 ? (
                      <Select
                        value={String(item.pricingIndex)}
                        onValueChange={(v) =>
                          handlePricingChange(
                            cartItemKey,
                            {
                              programId: item.programId,
                              pricingIndex: item.pricingIndex,
                              quantity: item.quantity,
                              subProgramIndex: item.subProgramIndex,
                            },
                            Number(v)
                          )
                        }
                        disabled={loadingPricingChangeKey === cartItemKey}
                      >
                        <SelectTrigger className="mt-1.5 h-9 w-full max-w-[220px] text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {program.pricing.map((p, idx) => (
                            <SelectItem
                              key={idx}
                              value={String(idx)}
                            >
                              {p.hours} ч — {formatPrice(p.price ?? 0)} ₽
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {hours} часов
                        {price > 0 && ` · ${formatPrice(price)} ₽`}
                      </p>
                    )}
                  </div>
                </Link>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          item.programId,
                          item.pricingIndex,
                          Math.max(1, item.quantity - 1),
                          item.subProgramIndex
                        )
                      }
                      disabled={updating || item.quantity <= 1}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          item.programId,
                          item.pricingIndex,
                          Math.min(100, item.quantity + 1),
                          item.subProgramIndex
                        )
                      }
                      disabled={updating || item.quantity >= 100}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-primary">
                      {formatPrice(item.lineAmount)} ₽
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() =>
                        handleRemove(
                          item.programId,
                          item.pricingIndex,
                          item.subProgramIndex
                        )
                      }
                      disabled={removing}
                      aria-label="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Surface>

      <Surface
        variant="floating"
        className={cn(
          "sticky bottom-4 flex flex-col gap-4 rounded-2xl border border-border/60 p-6",
          "sm:flex-row sm:items-center sm:justify-between"
        )}
      >
        <div className="text-lg font-semibold text-foreground">
          Итого: {formatPrice(totalAmount)} ₽
        </div>
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/checkout">Оформить заявку</Link>
        </Button>
      </Surface>
    </div>
  );
});
