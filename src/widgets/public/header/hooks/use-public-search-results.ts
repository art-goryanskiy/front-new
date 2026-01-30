"use client";

import { useMemo } from "react";
import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import type { CategoryType } from "@/shared/api/generated/graphql";

export interface PublicSearchResult {
  id: string;
  type: "category" | "program";
  label: string;
  path: string;
  icon: "folder" | "book";
  description?: string;
  parentCategoryName?: string;
}

/**
 * Хук для получения результатов поиска по категориям и программам (публичные пути)
 */
export function usePublicSearchResults(query: string) {
  // Debounce поискового запроса для оптимизации запросов
  const debouncedQuery = useDebounce(query, 300);

  // Загружаем найденные категории
  const { categories, loading: categoriesLoading } = useCategories(
    debouncedQuery.length > 0
      ? { search: debouncedQuery, limit: 5 }
      : undefined
  );

  // Загружаем все категории для поиска родительских (всегда загружаем, без фильтра)
  const { categories: allCategories } = useCategories();

  const { programs, loading: programsLoading } = usePrograms(
    debouncedQuery.length > 0
      ? { search: debouncedQuery, limit: 5 }
      : undefined
  );

  // Создаем мапу категорий по ID для быстрого поиска родительских
  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    allCategories.forEach((cat) => {
      map.set(cat.id, cat.name);
    });
    return map;
  }, [allCategories]);

  const searchResults: PublicSearchResult[] = useMemo(() => {
    const results: PublicSearchResult[] = [];

    if (categories.length > 0) {
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
          path: `/categories/${category.id}`,
          icon: "folder",
          description: category.description || undefined,
          parentCategoryName,
        });
      });
    }

    if (programs.length > 0) {
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
          path: `/programs/${program.id}`,
          icon: "book",
          description: program.description || undefined,
          parentCategoryName,
        });
      });
    }

    return results;
  }, [categories, programs, categoriesMap, allCategories]);

  return {
    results: searchResults,
    loading: categoriesLoading || programsLoading,
  };
}
