"use client";

import { memo, useMemo } from "react";
import { Chip, Tooltip } from "@heroui/react";
import type { ProgramTableCellContentProps } from "../types/program-table.types";

export const ProgramTableSubprogramsContent = memo(
  function ProgramTableSubprogramsContent({
    program,
  }: ProgramTableCellContentProps) {
    const hasSubPrograms = useMemo(
      () => program.subPrograms && program.subPrograms.length > 0,
      [program.subPrograms]
    );

    const subProgramsCount = useMemo(
      () => program.subPrograms?.length || 0,
      [program.subPrograms?.length]
    );

    const ariaLabel = useMemo(
      () =>
        hasSubPrograms ? `${subProgramsCount} подпрограмм` : "Нет подпрограмм",
      [hasSubPrograms, subProgramsCount]
    );

    const tooltipContent = useMemo(
      () => (
        <div className="max-w-xs">
          <p className="font-semibold mb-2">Подпрограммы:</p>
          <ul className="list-disc list-inside space-y-1">
            {program.subPrograms?.map((sub, index) => (
              <li key={`${sub.title}-${index}`} className="text-sm">
                {sub.title}
              </li>
            ))}
          </ul>
        </div>
      ),
      [program.subPrograms]
    );

    return (
      <div className="text-center">
        {hasSubPrograms ? (
          <Tooltip
            content={tooltipContent}
            placement="left"
            classNames={{
              content: "bg-default-900 text-white",
            }}
          >
            <Chip
              color="secondary"
              variant="flat"
              className="cursor-help font-semibold"
              size="sm"
              aria-label={ariaLabel}
            >
              {subProgramsCount} шт.
            </Chip>
          </Tooltip>
        ) : (
          <span className="text-default-400" aria-label={ariaLabel}>
            -
          </span>
        )}
      </div>
    );
  }
);
