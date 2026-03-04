"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableViewsContent = memo(
  function ProgramTableViewsContent({
    program,
  }: ProgramTableCellContentProps) {
    const ariaLabel = useMemo(
      () => `Просмотров: ${program.views}`,
      [program.views]
    );

    return (
      <div className="text-center">
        <Badge
          variant="outline"
          className="font-medium"
          aria-label={ariaLabel}
        >
          {program.views}
        </Badge>
      </div>
    );
  }
);
