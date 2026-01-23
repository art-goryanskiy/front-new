"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableQualificationContent = memo(
  function ProgramTableQualificationContent({
    program,
  }: ProgramTableCellContentProps) {
    const qualification = program.awardedQualification || "-";
    const ariaLabel = useMemo(
      () => `Квалификация: ${program.awardedQualification || "не указана"}`,
      [program.awardedQualification]
    );

    return (
      <Chip
        color="success"
        variant="flat"
        size="sm"
        className="font-semibold"
        aria-label={ariaLabel}
      >
        {qualification}
      </Chip>
    );
  }
);
