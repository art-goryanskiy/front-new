"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
import { formatRank } from "../utils/program-table-utils";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableRankContent = memo(function ProgramTableRankContent({
  program,
}: ProgramTableCellContentProps) {
  const rankText = useMemo(
    () => formatRank(program.awardedRankFrom, program.awardedRankTo),
    [program.awardedRankFrom, program.awardedRankTo]
  );

  const ariaLabel = useMemo(
    () => `Ранг: ${rankText === "-" ? "не указан" : rankText}`,
    [rankText]
  );

  return (
    <Chip
      color="warning"
      variant="flat"
      size="sm"
      className="font-semibold"
      aria-label={ariaLabel}
    >
      {rankText}
    </Chip>
  );
});
