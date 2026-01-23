import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/shared/api/generated/graphql";
import type { CategoryFormData } from "../types/category-form.types";

/**
 * Создает объект CreateCategoryInput из данных формы
 */
export function createCategoryInput(
  data: CategoryFormData,
  imageUrl?: string
): CreateCategoryInput {
  return {
    name: data.name.trim(),
    ...(data.description?.trim() && {
      description: data.description.trim(),
    }),
    ...(data.type && { type: data.type }),
    ...(imageUrl && { image: imageUrl }),
  };
}

/**
 * Создает объект UpdateCategoryInput из данных формы
 */
export function updateCategoryInput(
  data: CategoryFormData,
  imageUrl?: string
): UpdateCategoryInput {
  return {
    name: data.name.trim(),
    ...(data.description?.trim() && {
      description: data.description.trim(),
    }),
    ...(data.type && { type: data.type }),
    ...(imageUrl && { image: imageUrl }),
  };
}

/**
 * Получает значения по умолчанию для формы
 */
export function getDefaultValues(
  editingCategory?: {
    name?: string;
    description?: string | null;
    type?: string | null;
  } | null,
  categoryType?: string | null
): CategoryFormData {
  return {
    name: editingCategory?.name || "",
    description: editingCategory?.description || "",
    type: (editingCategory?.type || categoryType || undefined) as
      | CategoryFormData["type"]
      | undefined,
    image: null,
  };
}
