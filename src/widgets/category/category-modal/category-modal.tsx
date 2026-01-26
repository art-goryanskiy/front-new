"use client";

import { memo, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryModalState } from "@/shared/store/ui-store";
import { CategoryForm } from "@/features/category/ui/category-form";
import { CATEGORY_MODAL_TEXTS } from "./constants/category-modal-constants";

export const CategoryModal = memo(function CategoryModal() {
  const {
    isCategoryModalOpen: isOpen,
    editingCategory,
    closeCategoryModal: onClose,
  } = useCategoryModalState();

  const isEditMode = useMemo(
    () => !!editingCategory,
    [editingCategory]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode
              ? CATEGORY_MODAL_TEXTS.edit
              : CATEGORY_MODAL_TEXTS.create}
          </DialogTitle>
        </DialogHeader>
        <div className="px-1">
          <CategoryForm
            editingCategory={editingCategory || undefined}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
