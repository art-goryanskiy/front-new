"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
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
              <Chip
                key={`${p.hours}-${p.price}-${idx}`}
                color="primary"
                variant="flat"
                size="sm"
                className="font-semibold"
                aria-label={formatPricingAriaLabel(p.hours, p.price!)}
              >
                {p.hours}ч - {formatPrice(p.price!)}₽
              </Chip>
            ))
          ) : (
            <span className="text-default-400 text-sm" aria-label="Нет данных">
              -
            </span>
          )}
        </div>
      </div>
    );
  }
);
