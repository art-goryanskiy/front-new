"use client";

import { memo } from "react";
import { Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SUBCATEGORY_CARD_CLASSES } from "../constants/subcategory-card-constants";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";

interface SubcategoryCardPriceProps {
  priceRange: { min: number; max: number; isRange: boolean } | null;
  canSeePrice: boolean;
  isAuthLoading?: boolean;
}

export const SubcategoryCardPrice = memo(
  function SubcategoryCardPrice({
    priceRange,
    canSeePrice,
    isAuthLoading = false,
  }: SubcategoryCardPriceProps) {
    if (isAuthLoading) {
      return (
        <div className={SUBCATEGORY_CARD_CLASSES.chip}>
          <Skeleton className="h-5 w-20" />
        </div>
      );
    }
    if (!canSeePrice) {
      return (
        <div className={SUBCATEGORY_CARD_CLASSES.chip}>
          <Lock className="h-3.5 w-3.5" />
          <span className={SUBCATEGORY_CARD_CLASSES.priceChip}>
            Цена по входу
          </span>
        </div>
      );
    }

    if (!priceRange) {
      return (
        <div className={SUBCATEGORY_CARD_CLASSES.chip}>
          <span className={SUBCATEGORY_CARD_CLASSES.priceChip}>
            Цена по запросу
          </span>
        </div>
      );
    }

    if (priceRange.isRange) {
      return (
        <div className={SUBCATEGORY_CARD_CLASSES.chip}>
          <span className={SUBCATEGORY_CARD_CLASSES.priceChip}>
            {formatPrice(priceRange.min)}–
            {formatPrice(priceRange.max)} ₽
          </span>
        </div>
      );
    }

    return (
      <div className={SUBCATEGORY_CARD_CLASSES.chip}>
        <span className={SUBCATEGORY_CARD_CLASSES.priceEmphasis}>
          от {formatPrice(priceRange.min)} ₽
        </span>
      </div>
    );
  }
);
