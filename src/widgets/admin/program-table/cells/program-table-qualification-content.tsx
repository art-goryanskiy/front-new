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
        className="block min-w-0 truncate text-sm text-foreground"
        title={program.awardedQualification ?? undefined}
        aria-label={ariaLabel}
      >
        {qualification}
      </span>
    );
  }
);
