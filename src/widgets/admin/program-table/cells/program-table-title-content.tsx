"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
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
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 items-center gap-2">
            <p className="text-base font-bold break-words whitespace-normal text-foreground">
              {program.title}
            </p>
            {isPopular && (
              <Badge variant="secondary" className="shrink-0" aria-label="Популярная программа">
                🔥
              </Badge>
            )}
          </div>
          {program.description && (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {program.description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
