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
      <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
        <Avatar className="hidden h-9 w-9 shrink-0 shadow-md transition-transform group-hover:scale-110 sm:flex">
          <AvatarImage
            src={category.image}
            alt={`Аватар категории ${category.name}`}
          />
          <AvatarFallback className="text-xs font-bold text-primary sm:text-sm">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full min-w-0 flex-1 flex-col overflow-hidden">
          <p
            className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base"
            title={category.name}
          >
            {category.name}
          </p>
        </div>
      </div>
    );
  }
);
