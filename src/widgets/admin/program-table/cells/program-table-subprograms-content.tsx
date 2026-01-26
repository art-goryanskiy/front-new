"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block cursor-help">
                  <Badge
                    variant="secondary"
                    className="font-semibold cursor-help"
                    aria-label={ariaLabel}
                  >
                    {subProgramsCount} шт.
                  </Badge>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">{tooltipContent}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="text-muted-foreground" aria-label={ariaLabel}>
            -
          </span>
        )}
      </div>
    );
  }
);
