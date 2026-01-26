"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ProgramFilterInput,
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import { usePrograms } from "@/entities/program/api/use-programs";
import { useProgramModalState } from "@/shared/store/ui-store";
import { memo, useCallback, useMemo } from "react";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import {
  TABLE_CLASSES,
  EMPTY_STATE_ICON,
} from "./constants/program-table-constants";
import { useProgramTableConfig } from "./hooks/use-program-table-config";
import { ProgramTableTitleContent } from "./cells/program-table-title-content";
import { ProgramTableQualificationContent } from "./cells/program-table-qualification-content";
import { ProgramTableRankContent } from "./cells/program-table-rank-content";
import { ProgramTablePricingContent } from "./cells/program-table-pricing-content";
import { ProgramTableViewsContent } from "./cells/program-table-views-content";
import { ProgramTableSubprogramsContent } from "./cells/program-table-subprograms-content";
import { TableSkeleton } from "@/shared/ui/table-skeleton/table-skeleton";

interface ProgramTableProps {
  categoryId: string;
  categoryType?: CategoryType | null;
}

export const ProgramTable = memo(function ProgramTable({
  categoryId,
  categoryType,
}: ProgramTableProps) {
  const filter: ProgramFilterInput = useMemo(
    () => ({
      category: categoryId,
    }),
    [categoryId]
  );
  const { programs, loading, error } = usePrograms(filter);

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

  const handleEditClick = useCallback(
    (program: ProgramEntity) => {
      openEditProgramModal(program, categoryType);
    },
    [openEditProgramModal, categoryType]
  );

  const handleDeleteClick = useCallback(
    (program: ProgramEntity) => {
      openDeleteProgramModal(program);
    },
    [openDeleteProgramModal]
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

  const tableId = useMemo(
    () => `program-table-${categoryId}`,
    [categoryId]
  );

  if (loading) {
    return <TableSkeleton rows={5} columns={7} />;
  }

  if (error) {
    return (
      <ErrorState
        message={
          error.message || "Произошла ошибка при загрузке программ"
        }
      />
    );
  }

  if (programs.length === 0) {
    return (
      <EmptyState
        title="Программы не найдены"
        description="Создайте первую программу для этой категории"
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  return (
    <Card className={`shadow-lg ${TABLE_CLASSES.wrapper}`}>
      <CardContent className="p-0">
        <Table
          id={tableId}
          aria-label="Таблица программ"
          aria-describedby={`${tableId}-description`}
        >
          <TableHeader>
            <TableRow>
              <TableHead className={`min-w-0 ${TABLE_CLASSES.th}`}>ПРОГРАММА</TableHead>
              <TableHead
                className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} text-center ${TABLE_CLASSES.th}`}
              >
                КВАЛИФИКАЦИЯ
              </TableHead>
              <TableHead
                className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} text-center ${TABLE_CLASSES.th}`}
              >
                РАЗРЯД
              </TableHead>
              <TableHead className={`hidden text-start md:table-cell ${TABLE_CLASSES.th}`}>
                ЧАСЫ - ЦЕНА
              </TableHead>
              <TableHead className={`hidden text-center lg:table-cell ${TABLE_CLASSES.th}`}>
                ПРОСМОТРЫ
              </TableHead>
              <TableHead
                className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} text-center ${TABLE_CLASSES.th}`}
              >
                ПОДПРОГРАММЫ
              </TableHead>
              <TableHead className={`hidden text-center md:table-cell ${TABLE_CLASSES.th}`}>
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
                aria-describedby={`${tableId}-row-${program.id}`}
              >
                <TableCell className={`min-w-0 ${TABLE_CLASSES.td}`}>
                  <ProgramTableTitleContent program={program} />
                </TableCell>

                <TableCell
                  className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} ${TABLE_CLASSES.td}`}
                  aria-label={
                    showAwardedQualification ? undefined : "Скрыто"
                  }
                >
                  <ProgramTableQualificationContent
                    program={program}
                  />
                </TableCell>

                <TableCell
                  className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} ${TABLE_CLASSES.td}`}
                  aria-label={showAwardedRank ? undefined : "Скрыто"}
                >
                  <ProgramTableRankContent program={program} />
                </TableCell>

                <TableCell className={`hidden md:table-cell ${TABLE_CLASSES.td}`}>
                  <ProgramTablePricingContent program={program} />
                </TableCell>

                <TableCell className={`hidden lg:table-cell ${TABLE_CLASSES.td}`}>
                  <ProgramTableViewsContent program={program} />
                </TableCell>

                <TableCell
                  className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} ${TABLE_CLASSES.td}`}
                  aria-label={showSubPrograms ? undefined : "Скрыто"}
                >
                  <ProgramTableSubprogramsContent program={program} />
                </TableCell>

                <TableCell className={`hidden md:table-cell ${TABLE_CLASSES.td}`}>
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
        </Table>
      </CardContent>
    </Card>
  );
});
