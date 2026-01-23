import { useMemo } from "react";
import type {
  CategoryEntity,
  CategoryType,
} from "@/shared/api/generated/graphql";
import {
  filterCategoriesByType,
  filterCategoriesBySearch,
} from "../utils/category-table-utils";

interface UseCategoryTableFilterProps {
  categories: CategoryEntity[];
  type: CategoryType;
  searchQuery?: string;
  storeSearchQuery?: string;
}

/**
 * Хук для фильтрации категорий по типу и поисковому запросу
 */
export function useCategoryTableFilter({
  categories,
  type,
  searchQuery = "",
  storeSearchQuery = "",
}: UseCategoryTableFilterProps) {
  const activeSearchQuery = searchQuery || storeSearchQuery;

  return useMemo(() => {
    let filtered = filterCategoriesByType(categories, type);

    if (activeSearchQuery) {
      filtered = filterCategoriesBySearch(filtered, activeSearchQuery);
    }

    return filtered;
  }, [categories, type, activeSearchQuery]);
}
