"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { formatRank } from "../utils/program-table-utils";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableRankContent = memo(
  function ProgramTableRankContent({
    program,
  }: ProgramTableCellContentProps) {
    const rankText = useMemo(
      () =>
        formatRank(program.awardedRankFrom, program.awardedRankTo),
      [program.awardedRankFrom, program.awardedRankTo]
    );

    const ariaLabel = useMemo(
      () => `Ранг: ${rankText === "-" ? "не указан" : rankText}`,
      [rankText]
    );

    return (
      <Badge
        variant="warning"
        className="font-semibold"
        aria-label={ariaLabel}
      >
        {rankText}
      </Badge>
    );
  }
);
