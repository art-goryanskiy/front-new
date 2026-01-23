"use client";

import { memo } from "react";
import { Lock, Star } from "lucide-react";
import { PROGRAM_CARD_CLASSES } from "../constants/program-card-constants";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";

interface ProgramCardFooterProps {
  minPrice: number | null;
  views: number | null;
  canSeePrice: boolean;
}

export const ProgramCardFooter = memo(function ProgramCardFooter({
  minPrice,
  views,
  canSeePrice,
}: ProgramCardFooterProps) {
  return (
    <div className={PROGRAM_CARD_CLASSES.footer}>
      <div className={PROGRAM_CARD_CLASSES.priceSection}>
        {canSeePrice ? (
          minPrice !== null && minPrice > 0 ? (
            <>
              <span className={PROGRAM_CARD_CLASSES.priceFrom}>
                от
              </span>
              <span className={PROGRAM_CARD_CLASSES.price}>
                {formatPrice(minPrice)}₽
              </span>
            </>
          ) : (
            <span className="text-xs text-default-400 dark:text-foreground/90">
              Цена по запросу
            </span>
          )
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-default-500 dark:text-foreground/90">
            <Lock className="h-3.5 w-3.5" />
            <span>Войдите для просмотра цены</span>
          </div>
        )}
      </div>
      {views !== null && views > 0 ? (
        <div className={PROGRAM_CARD_CLASSES.views}>
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span>{views}</span>
        </div>
      ) : (
        <div className={PROGRAM_CARD_CLASSES.views + " invisible"}>
          <Star className="h-3.5 w-3.5" />
          <span>0</span>
        </div>
      )}
    </div>
  );
});
