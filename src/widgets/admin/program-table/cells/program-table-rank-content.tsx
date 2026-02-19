"use client";

import { memo, useMemo } from "react";
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
      <span
        className="whitespace-nowrap text-sm text-foreground"
        aria-label={ariaLabel}
      >
        {rankText}
      </span>
    );
  }
);
