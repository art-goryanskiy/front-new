"use client";

import { useRef, memo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { CategoryType, ProgramEntity } from "@/shared/api/generated/graphql";
import { useProgramModalState } from "@/shared/store/modal-store";
import { Surface } from "@/shared/ui/surface/surface";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import { cn } from "@/lib/utils";
import { TABLE_CLASSES } from "./constants/program-table-constants";
import { useProgramTableConfig } from "./hooks/use-program-table-config";
import { ProgramTablePricingContent } from "./cells/program-table-pricing-content";
import { ProgramTableQualificationContent } from "./cells/program-table-qualification-content";
import { ProgramTableRankContent } from "./cells/program-table-rank-content";
import { ProgramTableSubprogramsContent } from "./cells/program-table-subprograms-content";
import { ProgramTableTitleContent } from "./cells/program-table-title-content";
import { ProgramTableViewsContent } from "./cells/program-table-views-content";

const ROW_HEIGHT = 56;

export const VirtualizedProgramTable = memo(function VirtualizedProgramTable({
  programs,
  categoryType,
  caption,
}: {
  programs: ProgramEntity[];
  categoryType?: CategoryType | null;
  caption?: string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const { openEditProgramModal, openDeleteProgramModal } = useProgramModalState();
  const {
    showAwardedQualification,
    showAwardedRank,
    showSubPrograms,
  } = useProgramTableConfig(categoryType);

  const virtualizer = useVirtualizer({
    count: programs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  const handleRowClick = useCallback(
    (program: ProgramEntity, e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("svg")
      ) {
        return;
      }
      openEditProgramModal(program, categoryType);
    },
    [openEditProgramModal, categoryType]
  );

  const handleKeyDown = useCallback(
    (program: ProgramEntity, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEditProgramModal(program, categoryType);
      }
    },
    [openEditProgramModal, categoryType]
  );

  const handleEditClick = useCallback(
    (program: ProgramEntity) =>
      openEditProgramModal(program, categoryType),
    [openEditProgramModal, categoryType]
  );

  const handleDeleteClick = useCallback(
    (program: ProgramEntity) => openDeleteProgramModal(program),
    [openDeleteProgramModal]
  );

  return (
    <Surface variant="floating" className={TABLE_CLASSES.wrapper}>
      <div
        ref={parentRef}
        className="max-h-[60vh] overflow-auto"
        aria-label="Таблица программ (виртуализированный список)"
      >
        <div role="table" aria-label="Таблица программ" className="min-w-full">
          <div
            role="rowgroup"
            className={cn("sticky top-0 z-10 grid grid-cols-7 bg-background/75 backdrop-blur-xl supports-backdrop-filter:bg-background/55", TABLE_CLASSES.thead)}
          >
            <div role="columnheader" className={`min-w-0 px-4 py-3 ${TABLE_CLASSES.th}`}>
              ПРОГРАММА
            </div>
            <div role="columnheader" className={`${showAwardedQualification ? "hidden md:block text-center" : "hidden"} px-4 py-3 ${TABLE_CLASSES.th}`}>
              КВАЛИФИКАЦИЯ
            </div>
            <div role="columnheader" className={`${showAwardedRank ? "hidden md:block text-center" : "hidden"} px-4 py-3 ${TABLE_CLASSES.th}`}>
              РАЗРЯД
            </div>
            <div role="columnheader" className={`hidden md:block text-start px-4 py-3 ${TABLE_CLASSES.th}`}>
              ЧАСЫ - ЦЕНА
            </div>
            <div role="columnheader" className={`hidden lg:block text-center px-4 py-3 ${TABLE_CLASSES.th}`}>
              ПРОСМОТРЫ
            </div>
            <div role="columnheader" className={`${showSubPrograms ? "hidden lg:block text-center" : "hidden"} px-4 py-3 ${TABLE_CLASSES.th}`}>
              ПОДПРОГРАММЫ
            </div>
            <div role="columnheader" className={`hidden md:block text-center px-4 py-3 ${TABLE_CLASSES.th}`}>
              ДЕЙСТВИЯ
            </div>
          </div>
          <div
            role="rowgroup"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
              width: "100%",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const program = programs[virtualRow.index];
              return (
                <div
                  key={program.id}
                  role="row"
                  tabIndex={0}
                  className={cn(
                    "group grid grid-cols-7 cursor-pointer w-full border-b border-border/40",
                    TABLE_CLASSES.tr,
                    virtualRow.index % 2 === 1 && "bg-muted/10"
                  )}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={(e) => handleRowClick(program, e)}
                  onKeyDown={(e) => handleKeyDown(program, e)}
                  aria-label={`Программа ${program.title}`}
                >
                  <div className={`min-w-0 px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <ProgramTableTitleContent program={program} />
                  </div>
                  <div className={`${showAwardedQualification ? "hidden md:flex md:items-center md:justify-center" : "hidden"} px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <ProgramTableQualificationContent program={program} />
                  </div>
                  <div className={`${showAwardedRank ? "hidden md:flex md:items-center md:justify-center" : "hidden"} px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <ProgramTableRankContent program={program} />
                  </div>
                  <div className={`hidden md:block px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <ProgramTablePricingContent program={program} />
                  </div>
                  <div className={`hidden lg:flex lg:items-center lg:justify-center px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <ProgramTableViewsContent program={program} />
                  </div>
                  <div className={`${showSubPrograms ? "hidden lg:flex lg:items-center lg:justify-center" : "hidden"} px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <ProgramTableSubprogramsContent program={program} />
                  </div>
                  <div className={`hidden md:flex md:items-center md:justify-center px-4 py-3 ${TABLE_CLASSES.td}`}>
                    <TableActions
                      onEdit={() => handleEditClick(program)}
                      onDelete={() => handleDeleteClick(program)}
                      editLabel="Редактировать программу"
                      deleteLabel="Удалить программу"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {caption && (
        <div className={TABLE_CLASSES.caption} role="caption">
          {caption}
        </div>
      )}
    </Surface>
  );
});
