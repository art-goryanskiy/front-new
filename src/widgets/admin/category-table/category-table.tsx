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
  CategoryType,
  CategoryEntity,
} from "@/shared/api/generated/graphql";
import { useCategories } from "@/entities/category/api/use-categories";
import { memo, useCallback, useMemo } from "react";
import {
  useCategoryModalState,
  useSearchState,
} from "@/shared/store/ui-store";
import { useRouter } from "next/navigation";
import { CategoryTableActions } from "./category-table-actions";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import {
  TABLE_CLASSES,
  EMPTY_STATE_ICON,
} from "./constants/category-table-constants";
import { useCategoryTableFilter } from "./hooks/use-category-table-filter";
import { CategoryTableNameContent } from "./cells/category-table-name-content";
import { CategoryTableTypeContent } from "./cells/category-table-type-content";
import { CategoryTableProgramsCountContent } from "./cells/category-table-programs-count-content";
import { TableSkeleton } from "@/shared/ui/table-skeleton/table-skeleton";

interface CategoryTableProps {
  type: CategoryType;
  searchQuery?: string;
}

export const CategoryTable = memo(function CategoryTable({
  type,
  searchQuery = "",
}: CategoryTableProps) {
  const {
    categories: allCategories,
    loading,
    error,
  } = useCategories();
  const { openEditCategoryModal, openDeleteCategoryModal } =
    useCategoryModalState();
  const { searchQuery: storeSearchQuery } = useSearchState();
  const router = useRouter();

  const categories = useCategoryTableFilter({
    categories: allCategories,
    type,
    searchQuery,
    storeSearchQuery,
  });

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
      router.push(`/admin/category/${categoryId}`);
    },
    [router]
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

  const handleKeyDown = useCallback(
    (categoryId: string, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        router.push(`/admin/category/${categoryId}`);
      }
    },
    [router]
  );

  const tableId = useMemo(() => `category-table-${type}`, [type]);

  if (loading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        title="Категории не найдены"
        description="Создайте первую категорию, чтобы начать работу"
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  return (
    <Card className={`overflow-auto shadow-lg ${TABLE_CLASSES.wrapper}`}>
      <CardContent className="p-0">
        <Table
          id={tableId}
          aria-label="Таблица категорий"
          aria-describedby={`${tableId}-description`}
        >
          <TableHeader>
            <TableRow>
              <TableHead className={`min-w-0 w-[45%] ${TABLE_CLASSES.th}`}>
                КАТЕГОРИЯ
              </TableHead>
              <TableHead
                className={`hidden whitespace-nowrap lg:table-cell w-[25%] ${TABLE_CLASSES.th}`}
              >
                ТИП КАТЕГОРИИ
              </TableHead>
              <TableHead className={`text-center whitespace-nowrap ${TABLE_CLASSES.th}`}>
                ПРОГРАММЫ
              </TableHead>
              <TableHead className={`text-center whitespace-nowrap ${TABLE_CLASSES.th}`}>
                ДЕЙСТВИЯ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                className={`group cursor-pointer ${TABLE_CLASSES.tr}`}
                onClick={(e) => handleRowClick(category.id, e)}
                role="row"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(category.id, e)}
                aria-label={`Категория ${category.name}`}
                aria-describedby={`${tableId}-row-${category.id}`}
              >
                <TableCell className={`min-w-0 ${TABLE_CLASSES.td}`}>
                  <CategoryTableNameContent category={category} />
                </TableCell>

                <TableCell className={`hidden whitespace-nowrap lg:table-cell ${TABLE_CLASSES.td}`}>
                  <CategoryTableTypeContent category={category} />
                </TableCell>

                <TableCell className={`text-center whitespace-nowrap ${TABLE_CLASSES.td}`}>
                  <CategoryTableProgramsCountContent
                    category={category}
                  />
                </TableCell>

                <TableCell className={`text-center whitespace-nowrap ${TABLE_CLASSES.td}`}>
                  <CategoryTableActions
                    onEdit={() => handleEditClick(category)}
                    onDelete={() => handleDeleteClick(category)}
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
