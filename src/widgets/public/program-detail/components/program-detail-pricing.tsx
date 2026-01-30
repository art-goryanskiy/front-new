import { memo } from "react";
import type { ProgramPricing } from "@/shared/api/generated/graphql";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailPricingProps {
  pricingList: ProgramPricing[];
}

export const ProgramDetailPricing = memo(
  function ProgramDetailPricing({
    pricingList,
  }: ProgramDetailPricingProps) {
    if (pricingList.length === 0) return null;

    return (
      <div>
        <h3 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
          Стоимость
        </h3>
        <div className={PROGRAM_DETAIL_CLASSES.pricingList}>
          {pricingList.map((pricing, index) => (
            <div
              key={index}
              className={PROGRAM_DETAIL_CLASSES.pricingItem}
            >
              <div>
                <div className="font-semibold text-foreground">
                  {pricing.hours} часов
                </div>
              </div>
              <div className="text-lg font-bold text-primary">
                {formatPrice(pricing.price!)}₽
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
