"use client";

import { memo, useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { ProgramPricing } from "@/shared/api/generated/graphql";
import { useAddToCart } from "@/entities/cart/api/use-add-to-cart";
import { useToastState } from "@/shared/store/toast-store";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";
import { useRouter } from "next/navigation";
import { saveReturnUrl } from "@/shared/lib/auth/utils/auth-redirect-utils";
import { AUTH_GUARD_ROUTES } from "@/shared/lib/auth/constants/auth-guard-constants";
import { cn } from "@/lib/utils";

interface ProgramDetailAddToCartProps {
  programId: string;
  programPricing: ProgramPricing[];
}

function isPricingWithPrice(
  p: ProgramPricing
): p is ProgramPricing & { price: number } {
  return typeof p.price === "number" && p.price > 0;
}

export const ProgramDetailAddToCart = memo(
  function ProgramDetailAddToCart({
    programId,
    programPricing,
  }: ProgramDetailAddToCartProps) {
    const router = useRouter();
    const { addToCart, loading } = useAddToCart();
    const { showToast } = useToastState();

    const pricingsWithPrice = programPricing
      .map((p, index) => ({ pricing: p, index }))
      .filter(({ pricing }) => isPricingWithPrice(pricing));

    const [selectedIndex, setSelectedIndex] = useState(
      pricingsWithPrice[0]?.index ?? 0
    );
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
      if (pricingsWithPrice.length > 0 && !pricingsWithPrice.some((p) => p.index === selectedIndex)) {
        setSelectedIndex(pricingsWithPrice[0].index);
      }
    }, [pricingsWithPrice, selectedIndex]);

    const selectedPricing = pricingsWithPrice.find(
      (p) => p.index === selectedIndex
    );

    const handleAddToCart = useCallback(async () => {
      const item = pricingsWithPrice.find((p) => p.index === selectedIndex);
      if (!item) return;

      try {
        await addToCart({
          programId,
          pricingIndex: item.index,
          quantity,
        });
        showToast("success", "Добавлено в корзину");
      } catch (err) {
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
          return;
        }
        showToast("error", "Не удалось добавить в корзину");
      }
    }, [
      addToCart,
      programId,
      pricingsWithPrice,
      quantity,
      router,
      selectedIndex,
      showToast,
    ]);

    if (pricingsWithPrice.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
          Добавить в корзину
        </h3>

        {pricingsWithPrice.length > 1 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">
              Тариф
            </div>
            <div className="flex flex-col gap-2">
              {pricingsWithPrice.map(({ pricing, index }) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-3 text-left transition-colors",
                    selectedIndex === index
                      ? "border-primary bg-primary/10"
                      : "border-border/60 hover:border-border/80"
                  )}
                >
                  <span className="text-sm font-medium">
                    {pricing.hours} часов
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {formatPrice(pricing.price)} ₽
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {pricingsWithPrice.length === 1 && selectedPricing && (
          <div className="rounded-xl border border-border/60 bg-muted/10 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedPricing.pricing.hours} часов
              </span>
              <span className="font-semibold text-primary">
                {formatPrice(selectedPricing.pricing.price)} ₽
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="cart-quantity"
            className="text-xs font-semibold text-muted-foreground"
          >
            Количество мест
          </label>
          <input
            id="cart-quantity"
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setQuantity(Math.max(1, Math.min(100, v)));
            }}
            className="h-10 rounded-lg border border-border/60 bg-background px-3 text-sm"
          />
        </div>

        <Button
          size="lg"
          className={cn(PROGRAM_DETAIL_CLASSES.cta, "w-full")}
          onClick={handleAddToCart}
          disabled={loading}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {loading ? "Добавление…" : "В корзину"}
        </Button>
      </div>
    );
  }
);
