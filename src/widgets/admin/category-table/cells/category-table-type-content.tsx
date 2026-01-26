"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import {
  getCategoryTypeName,
  getCategoryTypeColor,
} from "@/shared/lib/helpers/category-helpers";

interface CategoryTableTypeContentProps {
  category: CategoryEntity;
}

const COLOR_TO_VARIANT: Record<
  "primary" | "success" | "warning" | "default",
  "default" | "secondary" | "success" | "warning"
> = {
  primary: "default",
  success: "success",
  warning: "warning",
  default: "secondary",
};

export const CategoryTableTypeContent = memo(function CategoryTableTypeContent({
  category,
}: CategoryTableTypeContentProps) {
  const typeName = useMemo(
    () => getCategoryTypeName(category.type),
    [category.type]
  );

  const variant = useMemo(
    () => COLOR_TO_VARIANT[getCategoryTypeColor(category.type)],
    [category.type]
  );

  const ariaLabel = useMemo(() => `Тип: ${typeName}`, [typeName]);

  return (
    <Badge variant={variant} className="font-semibold" aria-label={ariaLabel}>
      {typeName}
    </Badge>
  );
});
