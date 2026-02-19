"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { memo } from "react";
import { getCategoryInitial } from "../utils/category-table-utils";

interface CategoryTableNameContentProps {
  category: CategoryEntity;
}

export const CategoryTableNameContent = memo(
  function CategoryTableNameContent({
    category,
  }: CategoryTableNameContentProps) {
    const initial = getCategoryInitial(category.name);
    return (
      <div className="flex max-w-[320px] min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
        <Avatar className="hidden h-8 w-8 shrink-0 sm:flex">
          <AvatarImage
            src={category.image ?? undefined}
            alt={`Аватар категории ${category.name}`}
          />
          <AvatarFallback className="text-xs font-semibold text-primary">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base"
            title={category.name}
          >
            {category.name}
          </p>
        </div>
      </div>
    );
  }
);
