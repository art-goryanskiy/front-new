"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableQualificationContent = memo(
  function ProgramTableQualificationContent({
    program,
  }: ProgramTableCellContentProps) {
    const qualification = program.awardedQualification || "-";
    const ariaLabel = useMemo(
      () =>
        `Квалификация: ${program.awardedQualification || "не указана"}`,
      [program.awardedQualification]
    );

    return (
      <Badge
        variant="success"
        className="font-semibold"
        aria-label={ariaLabel}
      >
        {qualification}
      </Badge>
    );
  }
);
