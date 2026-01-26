"use client";

import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CategoryEntity } from "@/shared/api/generated/graphql";
import { getCategoryInitial } from "../utils/category-table-utils";

interface CategoryTableNameContentProps {
  category: CategoryEntity;
}

export const CategoryTableNameContent = memo(function CategoryTableNameContent({
  category,
}: CategoryTableNameContentProps) {
  const initial = getCategoryInitial(category.name);
  return (
    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 w-full">
      <Avatar className="h-9 w-9 shadow-md group-hover:scale-110 transition-transform shrink-0 hidden sm:flex">
        <AvatarImage src={category.image} alt={`Аватар категории ${category.name}`} />
        <AvatarFallback className="text-primary text-xs sm:text-sm font-bold">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden w-full">
        <p
          className="font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2"
          title={category.name}
        >
          {category.name}
        </p>
      </div>
    </div>
  );
});
