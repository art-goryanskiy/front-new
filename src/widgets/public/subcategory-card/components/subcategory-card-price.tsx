"use client";

import { memo } from "react";
import { Lock } from "lucide-react";
import { SUBCATEGORY_CARD_CLASSES } from "../constants/subcategory-card-constants";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";

interface SubcategoryCardPriceProps {
  priceRange: { min: number; max: number; isRange: boolean } | null;
  canSeePrice: boolean;
}

export const SubcategoryCardPrice = memo(
  function SubcategoryCardPrice({
    priceRange,
    canSeePrice,
  }: SubcategoryCardPriceProps) {
    if (!canSeePrice) {
      return (
        <div className={SUBCATEGORY_CARD_CLASSES.lockedPrice}>
          <Lock className="h-3.5 w-3.5" />
          <span className="text-xs">Войдите для просмотра цены</span>
        </div>
      );
    }

    if (!priceRange) {
      return (
        <span className="text-xs text-muted-foreground">
          Цена по запросу
        </span>
      );
    }

    if (priceRange.isRange) {
      return (
        <div className={SUBCATEGORY_CARD_CLASSES.priceSection}>
          <span className={SUBCATEGORY_CARD_CLASSES.priceFrom}>
            от
          </span>
          <span className={SUBCATEGORY_CARD_CLASSES.priceRange}>
            {formatPrice(priceRange.min)}₽ -{" "}
            {formatPrice(priceRange.max)}₽
          </span>
        </div>
      );
    }

    return (
      <div className={SUBCATEGORY_CARD_CLASSES.priceSection}>
        <span className={SUBCATEGORY_CARD_CLASSES.priceFrom}>от</span>
        <span className={SUBCATEGORY_CARD_CLASSES.price}>
          {formatPrice(priceRange.min)}₽
        </span>
      </div>
    );
  }
);
