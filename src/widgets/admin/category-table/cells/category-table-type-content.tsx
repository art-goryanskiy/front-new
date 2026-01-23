"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import {
  getCategoryTypeName,
  getCategoryTypeColor,
} from "@/shared/lib/helpers/category-helpers";

interface CategoryTableTypeContentProps {
  category: CategoryEntity;
}

export const CategoryTableTypeContent = memo(function CategoryTableTypeContent({
  category,
}: CategoryTableTypeContentProps) {
  const typeName = useMemo(
    () => getCategoryTypeName(category.type),
    [category.type]
  );

  const typeColor = useMemo(
    () => getCategoryTypeColor(category.type),
    [category.type]
  );

  const ariaLabel = useMemo(() => `Тип: ${typeName}`, [typeName]);

  return (
    <Chip
      color={typeColor}
      variant="flat"
      size="sm"
      className="font-semibold"
      aria-label={ariaLabel}
    >
      {typeName}
    </Chip>
  );
});
