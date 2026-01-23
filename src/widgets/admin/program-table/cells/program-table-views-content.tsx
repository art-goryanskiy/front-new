"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableViewsContent = memo(function ProgramTableViewsContent({
  program,
}: ProgramTableCellContentProps) {
  const ariaLabel = useMemo(
    () => `Просмотров: ${program.views}`,
    [program.views]
  );

  return (
    <div className="text-center">
      <Chip
        color="default"
        variant="flat"
        className="font-semibold"
        size="sm"
        aria-label={ariaLabel}
      >
        {program.views}
      </Chip>
    </div>
  );
});
