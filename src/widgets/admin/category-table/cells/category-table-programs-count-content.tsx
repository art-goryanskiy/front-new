"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
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
      <Chip
        color="primary"
        variant="flat"
        className="font-bold text-sm sm:text-base"
        size="sm"
        aria-label={ariaLabel}
      >
        {count}
      </Chip>
    );
  }
);
