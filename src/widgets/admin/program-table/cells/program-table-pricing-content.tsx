"use client";

import { memo, useMemo } from "react";
import {
  filterValidPricing,
  formatPrice,
  formatPricingAriaLabel,
} from "../utils/program-table-utils";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTablePricingContent = memo(
  function ProgramTablePricingContent({
    program,
  }: ProgramTableCellContentProps) {
    const display = useMemo(() => {
      const valid = filterValidPricing(program.pricing);
      if (valid.length === 0) return null;
      const hours = valid.map((p) => p.hours);
      const prices = valid.map((p) => p.price!).filter((x) => x > 0);
      const minH = Math.min(...hours);
      const maxH = Math.max(...hours);
      const minP = prices.length ? Math.min(...prices) : 0;
      const maxP = prices.length ? Math.max(...prices) : 0;
      const hoursStr =
        minH === maxH ? `${minH} ч` : `${minH}–${maxH} ч`;
      const priceStr =
        minP === maxP || maxP === 0
          ? minP > 0
            ? formatPrice(minP) + " ₽"
            : null
          : `от ${formatPrice(minP)} ₽`;
      const label =
        valid.length === 1
          ? formatPricingAriaLabel(valid[0].hours, valid[0].price!)
          : `${hoursStr}, ${priceStr ?? ""}`;
      return { hoursStr, priceStr, label };
    }, [program.pricing]);

    if (!display) {
      return (
        <span
          className="text-sm text-muted-foreground"
          aria-label="Нет данных"
        >
          -
        </span>
      );
    }

    return (
      <div
        className="text-start text-sm whitespace-nowrap text-foreground"
        aria-label={display.label}
      >
        {display.hoursStr}
        {display.priceStr && (
          <span className="text-muted-foreground">
            {" · "}
            {display.priceStr}
          </span>
        )}
      </div>
    );
  }
);
