"use client";

import { memo } from "react";
import { Avatar } from "@heroui/react";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { getCategoryInitial } from "../utils/category-table-utils";

interface CategoryTableNameContentProps {
  category: CategoryEntity;
}

export const CategoryTableNameContent = memo(function CategoryTableNameContent({
  category,
}: CategoryTableNameContentProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 w-full">
      <Avatar
        src={category.image || undefined}
        name={category.name}
        size="sm"
        className="shadow-md group-hover:scale-110 transition-transform shrink-0 hidden sm:flex"
        showFallback
        fallback={
          <span className="text-primary-700 text-xs sm:text-sm font-bold">
            {getCategoryInitial(category.name)}
          </span>
        }
        alt={`Аватар категории ${category.name}`}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden w-full">
        <p
          className="font-bold text-default-900 text-sm sm:text-base group-hover:text-primary-600 transition-colors line-clamp-2"
          title={category.name}
        >
          {category.name}
        </p>
      </div>
    </div>
  );
});
