"use client";

import { lazy, Suspense, memo, useCallback } from "react";
import { useCategoryModalState } from "@/shared/store/ui-store";
import { CategoryTable } from "@/widgets/admin/category-table/category-table";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import type { CategoryPageProps } from "./types/category-page.types";

const CategoryModal = lazy(() =>
  import("@/widgets/category/category-modal/category-modal").then(
    (mod) => ({
      default: mod.CategoryModal,
    })
  )
);

const DeleteCategoryModal = lazy(() =>
  import("@/widgets/category/delete-category-modal/delete-category-modal").then(
    (mod) => ({ default: mod.DeleteCategoryModal })
  )
);

export const CategoryPage = memo(function CategoryPage({
  type,
  title,
  description,
}: CategoryPageProps) {
  const { openCreateCategoryModal } = useCategoryModalState();

  const handleCreateCategory = useCallback(() => {
    openCreateCategoryModal(type);
  }, [openCreateCategoryModal, type]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={title}
        description={description}
        variant="default"
        actionButton={{
          label: "+ Создать категорию",
          mobileLabel: "+ Создать",
          onPress: handleCreateCategory,
        }}
      />

      <CategoryTable type={type} />
      <Suspense fallback={null}>
        <CategoryModal />
        <DeleteCategoryModal />
      </Suspense>
    </div>
  );
});
