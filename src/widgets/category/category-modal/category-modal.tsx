"use client";

import { memo, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { useCategoryModalState } from "@/shared/store/ui-store";
import { CategoryForm } from "@/features/category/ui/category-form";
import {
  CATEGORY_MODAL_TEXTS,
  CATEGORY_MODAL_CONFIG,
} from "./constants/category-modal-constants";

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={CATEGORY_MODAL_CONFIG.size}
      scrollBehavior={CATEGORY_MODAL_CONFIG.scrollBehavior}
      classNames={CATEGORY_MODAL_CONFIG.classNames}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader
              className={`flex flex-col gap-1 ${CATEGORY_MODAL_CONFIG.classNames.header}`}
            >
              <h2 className="text-xl font-bold text-default-900 dark:text-foreground">
                {isEditMode
                  ? CATEGORY_MODAL_TEXTS.edit
                  : CATEGORY_MODAL_TEXTS.create}
              </h2>
            </ModalHeader>
            <ModalBody
              className={CATEGORY_MODAL_CONFIG.classNames.body}
            >
              <CategoryForm
                editingCategory={editingCategory || undefined}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
