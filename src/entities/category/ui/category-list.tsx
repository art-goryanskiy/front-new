"use client";

import { memo, useMemo } from "react";
import { useCategories } from "../api/use-categories";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Folder } from "lucide-react";
import type { CategoryEntity } from "@/shared/api/generated/graphql";

interface CategoryCardProps {
  category: CategoryEntity;
}

const CategoryCard = memo(function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-card border-border">
      <h3 className="text-lg font-semibold mb-2 text-foreground">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-gray-600 dark:text-foreground/80 text-sm mb-2">
          {category.description}
        </p>
      )}
      {category.type && (
        <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded">
          {category.type}
        </span>
      )}
    </div>
  );
});

export const CategoryList = memo(function CategoryList() {
  const { categories, loading, error } = useCategories();

  const emptyStateIcon = useMemo(
    () => (
      <Folder className="w-10 h-10 text-muted-foreground" />
    ),
    []
  );

  if (loading) {
    return <LoadingState message="Загрузка категорий..." />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        title="Категории не найдены"
        description="Создайте первую категорию, чтобы начать работу"
        icon={emptyStateIcon}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">
        Категории
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
});
