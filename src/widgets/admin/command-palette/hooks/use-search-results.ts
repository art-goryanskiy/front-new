"use client";

import { useMemo, useCallback } from "react";
import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import type { CategoryType } from "@/shared/api/generated/graphql";
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

  // Загружаем все категории для поиска родительских
  const { categories: allCategories } = useCategories();

  // Создаем мапу категорий по ID для быстрого поиска родительских
  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    allCategories.forEach((cat) => {
      map.set(cat.id, cat.name);
    });
    return map;
  }, [allCategories]);

  const searchResults: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = [];

    if (shouldSearchCategories && categories.length > 0) {
      categories.forEach((category) => {
        // Определяем родительскую категорию:
        // 1. Если у категории есть parent, находим родительскую категорию по ID
        // 2. Если у категории есть type, используем название типа как родительскую категорию
        let parentCategoryName: string | undefined;

        if (category.parent) {
          // Если есть parent, ищем родительскую категорию по ID
          parentCategoryName = categoriesMap.get(category.parent);
        } else if (category.type) {
          // Если нет parent, но есть type, используем название типа
          parentCategoryName =
            CATEGORY_TYPE_LABELS[category.type as CategoryType];
        }

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
        // Находим категорию программы для отображения родительской категории
        const programCategory = allCategories.find(
          (cat) => cat.id === program.category
        );

        let parentCategoryName: string | undefined;
        if (programCategory) {
          if (programCategory.parent) {
            // Если у категории программы есть parent, находим родительскую категорию по ID
            parentCategoryName = categoriesMap.get(
              programCategory.parent
            );
          } else if (programCategory.type) {
            // Если нет parent, но есть type, используем название типа
            parentCategoryName =
              CATEGORY_TYPE_LABELS[
                programCategory.type as CategoryType
              ];
          }
        }

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
