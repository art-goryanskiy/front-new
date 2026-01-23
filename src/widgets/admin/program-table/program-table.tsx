"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
} from "@heroui/react";
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
    <Card className="border-none shadow-lg">
      <CardBody className="p-0">
        <Table
          id={tableId}
          aria-label="Таблица программ"
          aria-describedby={`${tableId}-description`}
          classNames={TABLE_CLASSES}
          removeWrapper
        >
          <TableHeader>
            <TableColumn key="program">ПРОГРАММА</TableColumn>
            <TableColumn
              key="qualification"
              className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"} text-center`}
            >
              КВАЛИФИКАЦИЯ
            </TableColumn>
            <TableColumn
              key="rank"
              className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"} text-center`}
            >
              РАЗРЯД
            </TableColumn>
            <TableColumn
              key="pricing"
              className="hidden text-start md:table-cell"
            >
              ЧАСЫ - ЦЕНА
            </TableColumn>
            <TableColumn
              key="views"
              className="hidden text-center lg:table-cell"
            >
              ПРОСМОТРЫ
            </TableColumn>
            <TableColumn
              key="subPrograms"
              className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"} text-center`}
            >
              ПОДПРОГРАММЫ
            </TableColumn>
            <TableColumn
              key="actions"
              className="hidden text-center md:table-cell"
            >
              ДЕЙСТВИЯ
            </TableColumn>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow
                key={program.id}
                className="group"
                onClick={(e) => handleRowClick(program, e)}
                role="row"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(program, e)}
                aria-label={`Программа ${program.title}`}
                aria-describedby={`${tableId}-row-${program.id}`}
              >
                <TableCell key="program" className="min-w-0">
                  <ProgramTableTitleContent program={program} />
                </TableCell>

                <TableCell
                  key="qualification"
                  className={`${showAwardedQualification ? "hidden md:table-cell" : "hidden"}`}
                  aria-label={
                    showAwardedQualification ? undefined : "Скрыто"
                  }
                >
                  <ProgramTableQualificationContent
                    program={program}
                  />
                </TableCell>

                <TableCell
                  key="rank"
                  className={`${showAwardedRank ? "hidden md:table-cell" : "hidden"}`}
                  aria-label={showAwardedRank ? undefined : "Скрыто"}
                >
                  <ProgramTableRankContent program={program} />
                </TableCell>

                <TableCell
                  key="pricing"
                  className="hidden md:table-cell"
                >
                  <ProgramTablePricingContent program={program} />
                </TableCell>

                <TableCell
                  key="views"
                  className="hidden lg:table-cell"
                >
                  <ProgramTableViewsContent program={program} />
                </TableCell>

                <TableCell
                  key="subPrograms"
                  className={`${showSubPrograms ? "hidden lg:table-cell" : "hidden"}`}
                  aria-label={showSubPrograms ? undefined : "Скрыто"}
                >
                  <ProgramTableSubprogramsContent program={program} />
                </TableCell>

                <TableCell
                  key="actions"
                  className="hidden md:table-cell"
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
        </Table>
      </CardBody>
    </Card>
  );
});
