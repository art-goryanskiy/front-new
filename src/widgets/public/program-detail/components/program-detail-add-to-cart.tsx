"use client";

import { memo, useCallback, useMemo, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProgramDetailAddToCartProps {
  programId: string;
  programPricing: ProgramPricing[];
  /** Не показывать заголовок и не дублировать список тарифов — блок идёт сразу под «Стоимость» */
  compact?: boolean;
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
    compact = false,
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

    const effectiveSelectedIndex = useMemo(() => {
      if (pricingsWithPrice.length === 0) return 0;
      const valid = pricingsWithPrice.some(
        (p) => p.index === selectedIndex
      );
      return valid ? selectedIndex : pricingsWithPrice[0].index;
    }, [pricingsWithPrice, selectedIndex]);

    const handleAddToCart = useCallback(async () => {
      const item = pricingsWithPrice.find(
        (p) => p.index === effectiveSelectedIndex
      );
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
      effectiveSelectedIndex,
      showToast,
    ]);

    if (pricingsWithPrice.length === 0) return null;

    return (
      <div
        className={
          compact
            ? "space-y-3 border-t border-border/60 pt-2"
            : "space-y-4"
        }
      >
        {!compact && (
          <h3 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
            Добавить в корзину
          </h3>
        )}

        {pricingsWithPrice.length > 1 && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">
              Тариф
            </label>
            <Select
              value={String(effectiveSelectedIndex)}
              onValueChange={(v) => setSelectedIndex(Number(v))}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pricingsWithPrice.map(({ pricing, index }) => (
                  <SelectItem key={index} value={String(index)}>
                    {pricing.hours} ч — {formatPrice(pricing.price)} ₽
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-1.5">
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
              if (!isNaN(v))
                setQuantity(Math.max(1, Math.min(100, v)));
            }}
            className="h-10 w-full rounded-lg border border-border/60 bg-background px-3 text-sm"
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
