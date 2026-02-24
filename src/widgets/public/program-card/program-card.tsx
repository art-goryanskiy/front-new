"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useMemo } from "react";
import { ArrowRight, BookOpen, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePriceVisibility } from "@/shared/store/auth-store";
import { useAddToCart } from "@/entities/cart/api/use-add-to-cart";
import { useMyCart } from "@/entities/cart/api/use-my-cart";
import { useRemoveFromCart } from "@/entities/cart/api/use-remove-from-cart";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { RatingStars } from "@/shared/ui/rating-stars/rating-stars";
import type { ProgramCardProps } from "./types/program-card.types";
import { useProgramCardPricing } from "./hooks/use-program-card-pricing";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/shared/ui/surface/surface";
import { useToastState } from "@/shared/store/toast-store";
import { useRouter } from "next/navigation";
import { saveReturnUrl } from "@/shared/lib/auth/utils/auth-redirect-utils";
import { AUTH_GUARD_ROUTES } from "@/shared/lib/auth/constants/auth-guard-constants";
import { isApolloUnauthenticated } from "@/shared/lib/graphql/error-to-user-message";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";

function getFirstPricingIndex(program: {
  pricing?: Array<{ price?: number | null }> | null;
}): number | null {
  if (!program.pricing?.length) return null;
  const idx = program.pricing.findIndex(
    (p) => typeof p?.price === "number" && p.price > 0
  );
  return idx >= 0 ? idx : null;
}

export const ProgramCard = memo(
  function ProgramCard({ program }: ProgramCardProps) {
    const router = useRouter();
    const { canSeePrice, isAuthLoading } = usePriceVisibility();
    const { minPrice, hoursRange } = useProgramCardPricing(program);
    const { addToCart, loading: addLoading } = useAddToCart();
    const { removeFromCart, loading: removeLoading } =
      useRemoveFromCart();
    const { items: cartItems } = useMyCart({ skip: !canSeePrice });

    const cartItem = useMemo(
      () => cartItems.find((item) => item.programId === program.id),
      [cartItems, program.id]
    );
    const isInCart = !!cartItem;
    const { showToast } = useToastState();

    const cardTitle = useMemo(() => {
      return program.shortTitle?.trim() || program.title;
    }, [program.shortTitle, program.title]);

    const priceText = useMemo(() => {
      if (!canSeePrice) return null;
      if (minPrice === null || minPrice <= 0)
        return "Цена по запросу";
      return `от ${formatPrice(minPrice)} ₽`;
    }, [canSeePrice, minPrice]);

    const firstPricingIndex = useMemo(
      () => getFirstPricingIndex(program),
      [program]
    );

    const canAddToCart =
      minPrice !== null && minPrice > 0 && firstPricingIndex !== null;

    const handleLearnPrice = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        saveReturnUrl(window.location.pathname);
        router.replace(AUTH_GUARD_ROUTES.login);
      },
      [router]
    );

    const handleToggleCart = useCallback(
      async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInCart && cartItem) {
          try {
            await removeFromCart({
              programId: program.id,
              pricingIndex: cartItem.pricingIndex,
            });
            showToast("success", "Удалено из корзины");
          } catch {
            showToast("error", "Не удалось удалить из корзины");
          }
          return;
        }
        if (!canAddToCart || firstPricingIndex === null) return;
        try {
          await addToCart({
            programId: program.id,
            pricingIndex: firstPricingIndex,
            quantity: 1,
          });
          showToast("success", "Добавлено в корзину");
        } catch (err) {
          if (isApolloUnauthenticated(err)) {
            saveReturnUrl(window.location.pathname);
            router.replace(AUTH_GUARD_ROUTES.login);
            return;
          }
          showToast("error", "Не удалось добавить в корзину");
        }
      },
      [
        addToCart,
        canAddToCart,
        cartItem,
        firstPricingIndex,
        isInCart,
        program.id,
        removeFromCart,
        router,
        showToast,
      ]
    );

    const isLoading = addLoading || removeLoading;

    return (
      <div className="flex h-full">
        <Link
          href={`/programs/${program.id}`}
          className="block h-full w-full"
        >
          <Surface
            variant="floating"
            className="group relative flex h-full w-full flex-col overflow-hidden transition-[border,transform,box-shadow] hover:-translate-y-px hover:border-border/80"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <BlurGlowBackground
                spots={[
                  {
                    position: "top-right-card",
                    color: "bg-primary/10",
                    size: "small",
                  },
                ]}
              />
            </div>

            {/* Program image */}
            {program.image ? (
              <div className="relative h-36 w-full shrink-0 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.shortTitle || program.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
              </div>
            ) : (
              <div className="flex h-20 w-full shrink-0 items-center justify-center bg-muted/20">
                <BookOpen className="h-7 w-7 text-muted-foreground/30" aria-hidden />
              </div>
            )}

            <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 p-4">
              <div className="flex items-start gap-3">
                <h3
                  className="line-clamp-2 min-w-0 flex-1 text-sm leading-snug font-semibold wrap-break-word hyphens-auto text-foreground"
                  title={program.title}
                >
                  {cardTitle}
                </h3>

                {canSeePrice && (canAddToCart || isInCart) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleCart}
                    disabled={isLoading}
                    className={cn(
                      "h-9 w-9 shrink-0 rounded-xl border backdrop-blur transition-colors",
                      isInCart
                        ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                        : "border-border/60 bg-background/60 text-muted-foreground hover:bg-muted/20 hover:text-foreground disabled:opacity-50"
                    )}
                    aria-label={
                      isInCart
                        ? "Удалить из корзины"
                        : "Добавить в корзину"
                    }
                  >
                    {isInCart ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ShoppingCart className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                {isAuthLoading ? (
                  <Skeleton className="h-5 w-24" />
                ) : canSeePrice ? (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-foreground">
                    {priceText}
                    {hoursRange && (
                      <span className="font-normal text-muted-foreground">
                        {hoursRange}
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleLearnPrice}
                    className="group/cta relative inline-flex min-h-5 items-center gap-1.5 rounded-full border border-border/50 bg-muted/10 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_12%,transparent)] focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
                    aria-label="Войти, чтобы увидеть стоимость"
                  >
                    <span>Узнать стоимость</span>
                    <ArrowRight className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                  </button>
                )}
                {program.viewsRating != null && (
                  <RatingStars
                    rating={program.viewsRating}
                    size="sm"
                    showValue
                  />
                )}
              </div>
            </div>
          </Surface>
        </Link>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.program.id === nextProps.program.id &&
    prevProps.program.title === nextProps.program.title &&
    prevProps.program.shortTitle === nextProps.program.shortTitle &&
    prevProps.program.pricing === nextProps.program.pricing &&
    prevProps.program.views === nextProps.program.views &&
    prevProps.program.viewsRating === nextProps.program.viewsRating &&
    prevProps.categoryType === nextProps.categoryType
);
