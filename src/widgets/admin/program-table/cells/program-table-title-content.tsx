"use client";

import { memo, useMemo } from "react";
import { POPULAR_VIEWS_THRESHOLD } from "../constants/program-table-constants";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableTitleContent = memo(
  function ProgramTableTitleContent({
    program,
  }: ProgramTableCellContentProps) {
    const isPopular = useMemo(
      () => (program.views || 0) > POPULAR_VIEWS_THRESHOLD,
      [program.views]
    );

    return (
      <div className="flex max-w-[320px] min-w-0 items-start gap-2">
        <div className="min-w-0 flex-1">
          <p
            className="line-clamp-2 text-sm font-semibold text-foreground"
            title={program.title}
          >
            {program.title}
          </p>
          {program.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {program.description}
            </p>
          )}
          {isPopular && (
            <span
              className="mt-1 inline-block text-[10px] text-muted-foreground"
              aria-label="Популярная программа"
            >
              Популярная
            </span>
          )}
        </div>
      </div>
    );
  }
);
