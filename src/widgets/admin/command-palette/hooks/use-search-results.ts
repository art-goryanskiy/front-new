"use client";

import { useMemo, useCallback } from "react";
import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import {
  buildCategoriesMap,
  getParentCategoryName,
  getParentCategoryNameForProgram,
} from "@/shared/lib/helpers/search-results-helpers";
import type { SearchResult } from "../types/command-palette.types";
import { useRouter } from "next/navigation";

/**
 * Хук для получения результатов поиска по категориям и программам
 */
export function useSearchResults(query: string, entities?: string[]) {
  const router = useRouter();
  const shouldSearchCategories =
    !entities || entities.includes("categories");
  const shouldSearchPrograms =
    !entities || entities.includes("programs");

  // Debounce поискового запроса для оптимизации запросов
  const debouncedQuery = useDebounce(query, 300);

  const { categories, loading: categoriesLoading } = useCategories(
    shouldSearchCategories && debouncedQuery.length > 0
      ? { search: debouncedQuery, limit: 5 }
      : undefined
  );

  const { programs, loading: programsLoading } = usePrograms(
    shouldSearchPrograms && debouncedQuery.length > 0
      ? { search: debouncedQuery, limit: 5 }
      : undefined
  );

  // Загружаем все категории только при наличии запроса (для мапы родительских имён)
  const hasQuery = debouncedQuery.length > 0;
  const { categories: allCategories } = useCategories(undefined, {
    skip: !hasQuery,
  });

  const categoriesMap = useMemo(
    () => buildCategoriesMap(allCategories),
    [allCategories]
  );

  const searchResults: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = [];

    if (shouldSearchCategories && categories.length > 0) {
      categories.forEach((category) => {
        const parentCategoryName = getParentCategoryName(
          category,
          categoriesMap
        );
        results.push({
          id: `category-${category.id}`,
          type: "category",
          label: category.name,
          path: `/admin/category/${category.id}`,
          icon: "folder",
          description: category.description || undefined,
          parentCategoryName,
          entity: category,
        });
      });
    }

    if (shouldSearchPrograms && programs.length > 0) {
      programs.forEach((program) => {
        const parentCategoryName = getParentCategoryNameForProgram(
          program,
          allCategories,
          categoriesMap
        );
        results.push({
          id: `program-${program.id}`,
          type: "program",
          label: program.title,
          path: `/admin/category/${program.category}`,
          icon: "book",
          description: program.description || undefined,
          parentCategoryName,
          entity: program,
        });
      });
    }

    return results;
  }, [
    categories,
    programs,
    shouldSearchCategories,
    shouldSearchPrograms,
    categoriesMap,
    allCategories,
  ]);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      router.push(result.path);
    },
    [router]
  );

  return {
    results: searchResults,
    loading: categoriesLoading || programsLoading,
    handleSelect,
  };
}
