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
import { useCategories } from "@/entities/category/api/use-categories";
import { cn } from "@/lib/utils";
import type {
  CategoryEntity,
  CategoryType,
} from "@/shared/api/generated/graphql";
import { useCategoryModalState } from "@/shared/store/modal-store";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Surface } from "@/shared/ui/surface/surface";
import { TableSkeleton } from "@/shared/ui/table-skeleton/table-skeleton";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo } from "react";

import { CategoryTableActions } from "./category-table-actions";
import { CategoryTableNameContent } from "./cells/category-table-name-content";
import { CategoryTableProgramsCountContent } from "./cells/category-table-programs-count-content";
import { CategoryTableTypeContent } from "./cells/category-table-type-content";
import {
  EMPTY_STATE_ICON,
  TABLE_CLASSES,
} from "./constants/category-table-constants";
import {
  filterCategoriesBySearch,
  filterCategoriesByType,
} from "./utils/category-table-utils";

type ProgramsFilter = "all" | "withPrograms" | "empty";

interface CategoryTableProps {
  type: CategoryType;
  searchQuery?: string;
  programsFilter?: ProgramsFilter;
  onCountsChange?: (c: { shown: number; total: number }) => void;
}

export const CategoryTable = memo(function CategoryTable({
  type,
  searchQuery = "",
  programsFilter = "all",
  onCountsChange,
}: CategoryTableProps) {
  const {
    categories: allCategories,
    loading,
    error,
  } = useCategories();
  const { openEditCategoryModal, openDeleteCategoryModal } =
    useCategoryModalState();
  const router = useRouter();

  const normalizedQuery = useMemo(
    () => searchQuery.trim(),
    [searchQuery]
  );

  const filtered = useMemo(() => {
    let res = filterCategoriesByType(allCategories, type);

    if (normalizedQuery) {
      res = filterCategoriesBySearch(res, normalizedQuery);
    }

    if (programsFilter !== "all") {
      res = res.filter((c) => {
        const count = c.programsCount ?? 0;
        if (programsFilter === "withPrograms") return count > 0;
        return count === 0;
      });
    }

    return res;
  }, [allCategories, type, normalizedQuery, programsFilter]);

  useEffect(() => {
    onCountsChange?.({
      shown: filtered.length,
      total: filterCategoriesByType(allCategories, type).length,
    });
  }, [onCountsChange, filtered.length, allCategories, type]);

  const handleNavigate = useCallback(
    (categoryId: string) => {
      router.push(`/admin/category/${categoryId}`);
    },
    [router]
  );

  const handleRowClick = useCallback(
    (categoryId: string, e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("svg")
      ) {
        return;
      }
      handleNavigate(categoryId);
    },
    [handleNavigate]
  );

  const handleKeyDown = useCallback(
    (categoryId: string, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNavigate(categoryId);
      }
    },
    [handleNavigate]
  );

  const handleEditClick = useCallback(
    (category: CategoryEntity) => {
      openEditCategoryModal(category);
    },
    [openEditCategoryModal]
  );

  const handleDeleteClick = useCallback(
    (category: CategoryEntity) => {
      openDeleteCategoryModal(category);
    },
    [openDeleteCategoryModal]
  );

  const tableId = useMemo(() => `category-table-${type}`, [type]);

  if (loading) return <TableSkeleton rows={5} columns={4} />;

  if (error) return <ErrorState message={error.message} />;

  const totalInType = filterCategoriesByType(
    allCategories,
    type
  ).length;

  if (totalInType === 0) {
    return (
      <EmptyState
        title="Категории не найдены"
        description="Создайте первую категорию, чтобы начать работу"
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="Ничего не найдено"
        description={`По запросу “${searchQuery}” нет результатов`}
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  return (
    <>
      {/* MOBILE (<md): cards */}
      <div className={TABLE_CLASSES.cardsWrap}>
        {filtered.map((category) => {
          const programsCount = category.programsCount ?? 0;

          return (
            <Surface
              key={category.id}
              className={cn(
                TABLE_CLASSES.card,
                "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleNavigate(category.id)}
              onKeyDown={(e) => handleKeyDown(category.id, e)}
              aria-label={`Открыть категорию ${category.name}`}
            >
              <div className={TABLE_CLASSES.cardHeader}>
                <div className={TABLE_CLASSES.cardMain}>
                  <div
                    className={TABLE_CLASSES.cardTitle}
                    title={category.name}
                  >
                    {category.name}
                  </div>
                  <div
                    className={TABLE_CLASSES.cardSub}
                    title={category.slug}
                  >
                    {category.slug}
                  </div>

                  {category.description && (
                    <div
                      className={TABLE_CLASSES.cardDesc}
                      title={category.description}
                    >
                      {category.description}
                    </div>
                  )}

                  <div className={TABLE_CLASSES.cardMeta}>
                    <CategoryTableTypeContent category={category} />
                    <span className={TABLE_CLASSES.cardMetaPill}>
                      Программы: {programsCount}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <CategoryTableActions
                    onEdit={() => handleEditClick(category)}
                    onDelete={() => handleDeleteClick(category)}
                  />
                </div>
              </div>
            </Surface>
          );
        })}
      </div>

      {/* DESKTOP (md+): premium table */}
      <div className="hidden md:block">
        <Surface variant="floating" className={TABLE_CLASSES.wrapper}>
          <Table id={tableId} aria-label="Таблица категорий">
            <TableHeader className={TABLE_CLASSES.thead}>
              <TableRow>
                <TableHead
                  className={`w-[45%] min-w-0 ${TABLE_CLASSES.th}`}
                >
                  КАТЕГОРИЯ
                </TableHead>
                <TableHead
                  className={`hidden w-[25%] whitespace-nowrap lg:table-cell ${TABLE_CLASSES.th}`}
                >
                  ТИП
                </TableHead>
                <TableHead
                  className={`w-[15%] text-center whitespace-nowrap ${TABLE_CLASSES.th}`}
                >
                  ПРОГРАММЫ
                </TableHead>
                <TableHead
                  className={`w-[15%] text-center whitespace-nowrap ${TABLE_CLASSES.th}`}
                >
                  ДЕЙСТВИЯ
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr:nth-child(even)]:bg-muted/10">
              {filtered.map((category) => (
                <TableRow
                  key={category.id}
                  className={`group cursor-pointer ${TABLE_CLASSES.tr}`}
                  onClick={(e) => handleRowClick(category.id, e)}
                  role="row"
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(category.id, e)}
                  aria-label={`Категория ${category.name}`}
                >
                  <TableCell
                    className={`min-w-0 ${TABLE_CLASSES.td}`}
                  >
                    <CategoryTableNameContent category={category} />
                  </TableCell>

                  <TableCell
                    className={`hidden whitespace-nowrap lg:table-cell ${TABLE_CLASSES.td}`}
                  >
                    <CategoryTableTypeContent category={category} />
                  </TableCell>

                  <TableCell
                    className={`text-center whitespace-nowrap ${TABLE_CLASSES.td}`}
                  >
                    <CategoryTableProgramsCountContent
                      category={category}
                    />
                  </TableCell>

                  <TableCell
                    className={`text-center whitespace-nowrap ${TABLE_CLASSES.td}`}
                  >
                    <CategoryTableActions
                      onEdit={() => handleEditClick(category)}
                      onDelete={() => handleDeleteClick(category)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableCaption className={TABLE_CLASSES.caption}>
              Показано {filtered.length} из {totalInType}
              {searchQuery.trim()
                ? ` • фильтр: “${searchQuery}”`
                : ""}
              {programsFilter !== "all"
                ? ` • программы: ${programsFilter}`
                : ""}
            </TableCaption>
          </Table>
        </Surface>
      </div>
    </>
  );
});
