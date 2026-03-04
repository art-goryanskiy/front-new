"use client";

import { useRef, memo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
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

export const VirtualizedProgramTable = memo(
  function VirtualizedProgramTable({
    programs,
    categoryType,
    selectedProgramIds,
    onSelectProgram,
    onSelectAllPrograms,
    caption,
  }: {
    programs: ProgramEntity[];
    categoryType?: CategoryType | null;
    selectedProgramIds?: Set<string>;
    onSelectProgram?: (id: string, selected: boolean) => void;
    onSelectAllPrograms?: (ids: string[], selected: boolean) => void;
    caption?: string;
  }) {
    const parentRef = useRef<HTMLDivElement>(null);
    const { openEditProgramModal, openDeleteProgramModal } =
      useProgramModalState();
    const {
      showAwardedQualification,
      showAwardedRank,
      showSubPrograms,
    } = useProgramTableConfig(categoryType);
    const bulkEnabled = !!selectedProgramIds && !!onSelectProgram;
    const allSelected =
      bulkEnabled &&
      programs.length > 0 &&
      programs.every((program) => selectedProgramIds.has(program.id));
    const someSelected =
      bulkEnabled &&
      programs.some((program) =>
        selectedProgramIds.has(program.id)
      ) &&
      !allSelected;
    const gridClass = bulkEnabled ? "grid-cols-8" : "grid-cols-7";

    // TanStack Virtual returns non-memoizable functions; React Compiler skips this component
    // eslint-disable-next-line react-hooks/incompatible-library
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
          <div
            role="table"
            aria-label="Таблица программ"
            className="min-w-full"
          >
            <div
              role="rowgroup"
              className={cn(
                "sticky top-0 z-10 grid",
                gridClass,
                TABLE_CLASSES.thead
              )}
            >
              {bulkEnabled ? (
                <div
                  role="columnheader"
                  className={`flex items-center justify-center ${TABLE_CLASSES.th}`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-primary"
                    checked={allSelected}
                    ref={(node) => {
                      if (node) node.indeterminate = !!someSelected;
                    }}
                    onChange={(e) =>
                      onSelectAllPrograms?.(
                        programs.map((program) => program.id),
                        e.target.checked
                      )
                    }
                    aria-label="Выбрать все программы на странице"
                  />
                </div>
              ) : null}
              <div
                role="columnheader"
                className={`min-w-0 ${TABLE_CLASSES.th}`}
              >
                ПРОГРАММА
              </div>
              <div
                role="columnheader"
                className={`${showAwardedQualification ? "hidden text-center md:block" : "hidden"} ${TABLE_CLASSES.th}`}
              >
                КВАЛИФИКАЦИЯ
              </div>
              <div
                role="columnheader"
                className={`${showAwardedRank ? "hidden text-center md:block" : "hidden"} ${TABLE_CLASSES.th}`}
              >
                РАЗРЯД
              </div>
              <div
                role="columnheader"
                className={`hidden text-start md:block ${TABLE_CLASSES.th}`}
              >
                ЧАСЫ - ЦЕНА
              </div>
              <div
                role="columnheader"
                className={`hidden text-center lg:block ${TABLE_CLASSES.th}`}
              >
                ПРОСМОТРЫ
              </div>
              <div
                role="columnheader"
                className={`${showSubPrograms ? "hidden text-center lg:block" : "hidden"} ${TABLE_CLASSES.th}`}
              >
                ПОДПРОГРАММЫ
              </div>
              <div
                role="columnheader"
                className={`hidden text-center md:block ${TABLE_CLASSES.th}`}
              >
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
                      "group grid w-full cursor-pointer border-b border-border/50",
                      gridClass,
                      TABLE_CLASSES.tr
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
                    {bulkEnabled ? (
                      <div
                        className={`flex items-center justify-center ${TABLE_CLASSES.td}`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer accent-primary"
                          checked={selectedProgramIds.has(program.id)}
                          onChange={(e) =>
                            onSelectProgram(
                              program.id,
                              e.target.checked
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Выбрать программу ${program.title}`}
                        />
                      </div>
                    ) : null}
                    <div
                      className={`min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableTitleContent program={program} />
                    </div>
                    <div
                      className={`${showAwardedQualification ? "hidden md:flex md:items-center md:justify-center" : "hidden"} min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableQualificationContent
                        program={program}
                      />
                    </div>
                    <div
                      className={`${showAwardedRank ? "hidden md:flex md:items-center md:justify-center" : "hidden"} min-w-0 overflow-hidden ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableRankContent program={program} />
                    </div>
                    <div
                      className={`hidden min-w-0 overflow-hidden md:block ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTablePricingContent program={program} />
                    </div>
                    <div
                      className={`hidden lg:flex lg:items-center lg:justify-center ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableViewsContent program={program} />
                    </div>
                    <div
                      className={`${showSubPrograms ? "hidden lg:flex lg:items-center lg:justify-center" : "hidden"} ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableSubprogramsContent
                        program={program}
                      />
                    </div>
                    <div
                      className={`hidden md:flex md:items-center md:justify-center ${TABLE_CLASSES.td}`}
                    >
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
  }
);
