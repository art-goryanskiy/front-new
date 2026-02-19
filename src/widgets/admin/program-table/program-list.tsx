"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { pluralPrograms } from "@/shared/lib/helpers/plural";
import { useProgramModalState } from "@/shared/store/modal-store";
import { Surface } from "@/shared/ui/surface/surface";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import { memo, useCallback, useMemo } from "react";

import { TABLE_CLASSES } from "./constants/program-table-constants";
import { useProgramTableConfig } from "./hooks/use-program-table-config";

import { ProgramTablePricingContent } from "./cells/program-table-pricing-content";
import { ProgramTableQualificationContent } from "./cells/program-table-qualification-content";
import { ProgramTableRankContent } from "./cells/program-table-rank-content";
import { ProgramTableSubprogramsContent } from "./cells/program-table-subprograms-content";
import { ProgramTableTitleContent } from "./cells/program-table-title-content";
import { ProgramTableViewsContent } from "./cells/program-table-views-content";
import { VirtualizedProgramTable } from "./virtualized-program-table";

const VIRTUALIZE_THRESHOLD = 40;

export const ProgramList = memo(function ProgramList({
  programs,
  categoryType,
  caption,
}: {
  programs: ProgramEntity[];
  categoryType?: CategoryType | null;
  caption?: string;
}) {
  const { openEditProgramModal, openDeleteProgramModal } =
    useProgramModalState();

  const {
    showAwardedQualification,
    showAwardedRank,
    showSubPrograms,
  } = useProgramTableConfig(categoryType);

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

  const tableId = useMemo(() => `program-list`, []);

  return (
    <>
      {/* MOBILE (<md): cards */}
      <div className={TABLE_CLASSES.cardsWrap}>
        {programs.map((program) => (
          <Surface
            key={program.id}
            className={cn(
              TABLE_CLASSES.card,
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            )}
            role="button"
            tabIndex={0}
            onClick={() =>
              openEditProgramModal(program, categoryType)
            }
            onKeyDown={(e) => handleKeyDown(program, e)}
            aria-label={`Открыть программу ${program.title}`}
          >
            <div className={TABLE_CLASSES.cardHeader}>
              <div className={TABLE_CLASSES.cardMain}>
                <ProgramTableTitleContent program={program} />

                <div className={TABLE_CLASSES.cardMeta}>
                  <ProgramTableViewsContent program={program} />
                  <ProgramTablePricingContent program={program} />

                  {showAwardedQualification && (
                    <ProgramTableQualificationContent
                      program={program}
                    />
                  )}

                  {showAwardedRank && (
                    <ProgramTableRankContent program={program} />
                  )}

                  {showSubPrograms && (
                    <ProgramTableSubprogramsContent
                      program={program}
                    />
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <TableActions
                  onEdit={() => handleEditClick(program)}
                  onDelete={() => handleDeleteClick(program)}
                  editLabel="Редактировать программу"
                  deleteLabel="Удалить программу"
                />
              </div>
            </div>
          </Surface>
        ))}
      </div>

      {/* DESKTOP (md+): table or virtualized table for large lists */}
      <div className="hidden md:block">
        {programs.length > VIRTUALIZE_THRESHOLD ? (
          <VirtualizedProgramTable
            programs={programs}
            categoryType={categoryType}
            caption={
              caption ??
              `Показано ${programs.length} ${pluralPrograms(programs.length)}`
            }
          />
        ) : (
          <Surface
            variant="floating"
            className={TABLE_CLASSES.wrapper}
          >
            <Table
              id={tableId}
              aria-label="Таблица программ"
              className="table-fixed"
            >
              <TableHeader className={TABLE_CLASSES.thead}>
                <TableRow>
                  <TableHead
                    className={`w-[min(320px,38%)] min-w-0 ${TABLE_CLASSES.th}`}
                  >
                    ПРОГРАММА
                  </TableHead>

                  <TableHead
                    className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} w-[14%] min-w-0 text-center ${TABLE_CLASSES.th}`}
                  >
                    КВАЛИФИКАЦИЯ
                  </TableHead>

                  <TableHead
                    className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} w-[8%] min-w-0 text-center ${TABLE_CLASSES.th}`}
                  >
                    РАЗРЯД
                  </TableHead>

                  <TableHead
                    className={`hidden w-[18%] min-w-0 text-start md:table-cell ${TABLE_CLASSES.th}`}
                  >
                    ЧАСЫ - ЦЕНА
                  </TableHead>

                  <TableHead
                    className={`hidden w-[10%] min-w-0 text-center lg:table-cell ${TABLE_CLASSES.th}`}
                  >
                    ПРОСМОТРЫ
                  </TableHead>

                  <TableHead
                    className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} w-[12%] min-w-0 text-center ${TABLE_CLASSES.th}`}
                  >
                    ПОДПРОГРАММЫ
                  </TableHead>

                  <TableHead
                    className={`hidden w-[10%] min-w-0 text-center md:table-cell ${TABLE_CLASSES.th}`}
                  >
                    ДЕЙСТВИЯ
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {programs.map((program) => (
                  <TableRow
                    key={program.id}
                    className={`group cursor-pointer ${TABLE_CLASSES.tr}`}
                    onClick={(e) => handleRowClick(program, e)}
                    role="row"
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(program, e)}
                    aria-label={`Программа ${program.title}`}
                  >
                    <TableCell
                      className={`min-w-0 ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableTitleContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableQualificationContent
                        program={program}
                      />
                    </TableCell>

                    <TableCell
                      className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableRankContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`hidden md:table-cell ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTablePricingContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`hidden lg:table-cell ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableViewsContent program={program} />
                    </TableCell>

                    <TableCell
                      className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} ${TABLE_CLASSES.td}`}
                    >
                      <ProgramTableSubprogramsContent
                        program={program}
                      />
                    </TableCell>

                    <TableCell
                      className={`hidden md:table-cell ${TABLE_CLASSES.td}`}
                    >
                      <TableActions
                        onEdit={() => handleEditClick(program)}
                        onDelete={() => handleDeleteClick(program)}
                        editLabel="Редактировать программу"
                        deleteLabel="Удалить программу"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableCaption className={TABLE_CLASSES.caption}>
                {caption ??
                  `Показано ${programs.length} ${pluralPrograms(programs.length)}`}
              </TableCaption>
            </Table>
          </Surface>
        )}
      </div>
    </>
  );
});
