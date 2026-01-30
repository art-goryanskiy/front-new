"use client";

import Link from "next/link";
import { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCanSeePrice } from "@/shared/store/auth-store";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import type { ProgramCardProps } from "./types/program-card.types";
import { useProgramCardPricing } from "./hooks/use-program-card-pricing";
import { Surface } from "@/shared/ui/surface/surface";
import { useToastState } from "@/shared/store/toast-store";

export const ProgramCard = memo(
  function ProgramCard({ program }: ProgramCardProps) {
    const canSeePrice = useCanSeePrice();
    const { minPrice } = useProgramCardPricing(program);
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

    const handleAddToCart = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        showToast(
          "info",
          "Корзина в разработке. Пока откройте программу и нажмите «Записаться»."
        );
      },
      [showToast]
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex h-full"
      >
        <Link
          href={`/programs/${program.id}`}
          className="block h-full w-full"
        >
          <Surface
            variant="floating"
            className="group relative h-full w-full overflow-hidden p-4 transition-[border,transform,box-shadow] hover:-translate-y-0.5 hover:border-border/80"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-[260px] w-[360px] rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
            </div>

            <div className="relative z-10 flex h-full min-h-[88px] flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <h3
                  className="line-clamp-2 min-w-0 flex-1 text-sm leading-snug font-semibold break-words hyphens-auto text-foreground"
                  title={program.title}
                >
                  {cardTitle}
                </h3>

                {canSeePrice && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleAddToCart}
                    className="h-9 w-9 shrink-0 rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm backdrop-blur hover:bg-muted/20 hover:text-foreground"
                    aria-label="Добавить в корзину"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {canSeePrice ? (
                <div className="text-sm font-semibold text-foreground">
                  {priceText}
                </div>
              ) : (
                <div className="h-5" />
              )}
            </div>
          </Surface>
        </Link>
      </motion.div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.program.id === nextProps.program.id &&
    prevProps.program.title === nextProps.program.title &&
    prevProps.program.shortTitle === nextProps.program.shortTitle &&
    prevProps.program.pricing === nextProps.program.pricing &&
    prevProps.program.views === nextProps.program.views &&
    prevProps.categoryType === nextProps.categoryType
);
