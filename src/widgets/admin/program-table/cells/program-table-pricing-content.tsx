"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
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
    const validPricing = useMemo(
      () => filterValidPricing(program.pricing),
      [program.pricing]
    );

    return (
      <div className="text-start">
        <div className="flex flex-wrap gap-1">
          {validPricing.length > 0 ? (
            validPricing.map((p, idx) => (
              <Badge
                key={`${p.hours}-${p.price}-${idx}`}
                variant="default"
                className="font-semibold"
                aria-label={formatPricingAriaLabel(p.hours, p.price!)}
              >
                {p.hours}ч - {formatPrice(p.price!)}₽
              </Badge>
            ))
          ) : (
            <span
              className="text-sm text-muted-foreground"
              aria-label="Нет данных"
            >
              -
            </span>
          )}
        </div>
      </div>
    );
  }
);
