import type { CategoryType } from "@/shared/api/generated/graphql";
import type { CategoryEntity, ProgramEntity } from "@/shared/api/generated/graphql";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";

/**
 * Строит мапу id категории → название для быстрого поиска родительских категорий.
 */
export function buildCategoriesMap(
  categories: Array<{ id: string; name: string }>
): Map<string, string> {
  const map = new Map<string, string>();
  categories.forEach((cat) => map.set(cat.id, cat.name));
  return map;
}

/**
 * Возвращает отображаемое имя родительской категории для категории
 * (по parent id из мапы или по type из лейблов).
 */
export function getParentCategoryName(
  category: { parent?: string | null; type?: CategoryType | null },
  categoriesMap: Map<string, string>
): string | undefined {
  if (category.parent) return categoriesMap.get(category.parent);
  if (category.type) return CATEGORY_TYPE_LABELS[category.type];
  return undefined;
}

/**
 * Возвращает отображаемое имя родительской категории для программы
 * (категория программы → её parent или type).
 */
export function getParentCategoryNameForProgram(
  program: ProgramEntity,
  allCategories: CategoryEntity[],
  categoriesMap: Map<string, string>
): string | undefined {
  const programCategory = allCategories.find((c) => c.id === program.category);
  if (!programCategory) return undefined;
  return getParentCategoryName(programCategory, categoriesMap);
}
