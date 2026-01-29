"use client";

import { useDeleteCategory } from "@/entities/category/api/use-delete-category";
import { useCategoryModalState } from "@/shared/store/modal-store";
import { DeleteConfirmModal } from "@/shared/ui/delete-confirm-modal/delete-confirm-modal";
import { useCallback } from "react";

export function DeleteCategoryModal() {
  const {
    isDeleteCategoryModalOpen: isOpen,
    deletingCategory,
    closeDeleteCategoryModal: onClose,
  } = useCategoryModalState();
  const { deleteCategory, loading, error } = useDeleteCategory();

  const handleDelete = useCallback(async () => {
    if (!deletingCategory) return;
    await deleteCategory(deletingCategory.id);
  }, [deletingCategory, deleteCategory]);

  if (!deletingCategory) return null;

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить категорию"
      itemName={deletingCategory.name}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      entityType="категорию"
    />
  );
}
