"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { formatProgramsCountAriaLabel } from "../utils/category-table-utils";

interface CategoryTableProgramsCountContentProps {
  category: CategoryEntity;
}

export const CategoryTableProgramsCountContent = memo(
  function CategoryTableProgramsCountContent({
    category,
  }: CategoryTableProgramsCountContentProps) {
    const count = category.programsCount ?? 0;
    const ariaLabel = useMemo(
      () => formatProgramsCountAriaLabel(category.programsCount),
      [category.programsCount]
    );

    return (
      <Badge variant="default" className="font-bold text-sm sm:text-base" aria-label={ariaLabel}>
        {count}
      </Badge>
    );
  }
);
