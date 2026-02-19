"use client";

import { memo, useMemo } from "react";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableQualificationContent = memo(
  function ProgramTableQualificationContent({
    program,
  }: ProgramTableCellContentProps) {
    const qualification = program.awardedQualification || "—";
    const ariaLabel = useMemo(
      () =>
        `Квалификация: ${program.awardedQualification || "не указана"}`,
      [program.awardedQualification]
    );

    return (
      <span
        className="max-w-[180px] truncate text-sm text-foreground"
        title={program.awardedQualification ?? undefined}
        aria-label={ariaLabel}
      >
        {qualification}
      </span>
    );
  }
);
