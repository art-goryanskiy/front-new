import type { CategoryType } from "@/shared/api/generated/graphql";

/** Категория с id и опциональным type (для фильтрации) */
type CategoryWithType = { id: string; type?: CategoryType | null };

/** Программа с полем category (id категории) */
type ProgramWithCategory = { category: string };

/**
 * Возвращает массив id категорий заданного типа.
 */
export function getCategoryIdsByType<T extends CategoryWithType>(
  categories: T[],
  type: CategoryType
): string[] {
  return categories
    .filter((cat) => cat.type === type)
    .map((cat) => cat.id);
}

/**
 * Фильтрует программы по списку id категорий.
 */
export function filterProgramsByCategoryIds<
  T extends ProgramWithCategory,
>(programs: T[], categoryIds: string[]): T[] {
  if (!categoryIds.length) return [];
  return programs.filter((program) =>
    categoryIds.includes(program.category)
  );
}

/**
 * Фильтрует программы по типу категории (сначала получает id категорий этого типа, затем фильтрует).
 */
export function filterProgramsByCategoryType<
  T extends ProgramWithCategory,
  C extends CategoryWithType,
>(programs: T[], categories: C[], categoryType: CategoryType): T[] {
  const ids = getCategoryIdsByType(categories, categoryType);
  return filterProgramsByCategoryIds(programs, ids);
}
