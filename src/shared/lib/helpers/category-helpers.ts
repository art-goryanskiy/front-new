import type { CategoryType } from "@/shared/api/generated/graphql";
import {
  CATEGORY_TYPE_LABELS,
  CATEGORY_TYPE_COLORS,
} from "@/shared/constants/categories";

export function getCategoryTypeName(
  type: CategoryType | null | undefined
): string {
  if (!type) return "Не указан";
  return CATEGORY_TYPE_LABELS[type] || "Не указан";
}

export function getCategoryTypeColor(
  type: CategoryType | null | undefined
): "primary" | "success" | "warning" | "default" {
  if (!type) return "default";
  return CATEGORY_TYPE_COLORS[type] || "default";
}
