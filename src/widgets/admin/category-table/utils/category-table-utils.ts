import type { CategoryEntity } from "@/shared/api/generated/graphql";

/**
 * Фильтрует категории по типу
 */
export function filterCategoriesByType(
  categories: CategoryEntity[],
  type: string
): CategoryEntity[] {
  return categories.filter((category) => category.type === type);
}

/**
 * Фильтрует категории по поисковому запросу
 */
export function filterCategoriesBySearch(
  categories: CategoryEntity[],
  searchQuery: string
): CategoryEntity[] {
  if (!searchQuery.trim()) {
    return categories;
  }

  const query = searchQuery.toLowerCase();

  return categories.filter(
    (category) =>
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query) ||
      category.description?.toLowerCase().includes(query)
  );
}

/**
 * Получает первую букву названия категории для аватара
 */
export function getCategoryInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

/**
 * Форматирует aria-label для количества программ
 */
export function formatProgramsCountAriaLabel(
  count: number | null | undefined
): string {
  return `Количество программ: ${count ?? 0}`;
}
