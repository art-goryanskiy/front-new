"use client";

import { memo, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { useProgramModalState } from "@/shared/store/ui-store";
import { ProgramForm } from "@/features/program/ui/program-form";
import { useProgramCategoryType } from "./hooks/use-program-category-type";
import {
  PROGRAM_MODAL_TEXTS,
  PROGRAM_MODAL_CONFIG,
} from "./constants/program-modal-constants";

export const ProgramModal = memo(function ProgramModal() {
  const {
    isProgramModalOpen: isOpen,
    editingProgram,
    closeProgramModal: onClose,
  } = useProgramModalState();
  const { categoryId, categoryType } = useProgramCategoryType();

  const isEditMode = useMemo(
    () => !!editingProgram,
    [editingProgram]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={PROGRAM_MODAL_CONFIG.size}
      scrollBehavior={PROGRAM_MODAL_CONFIG.scrollBehavior}
      classNames={PROGRAM_MODAL_CONFIG.classNames}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader
              className={`flex flex-col gap-1 ${PROGRAM_MODAL_CONFIG.classNames.header}`}
            >
              <h2 className="text-xl font-bold text-default-900 dark:text-foreground">
                {isEditMode
                  ? PROGRAM_MODAL_TEXTS.edit
                  : PROGRAM_MODAL_TEXTS.create}
              </h2>
            </ModalHeader>
            <ModalBody
              className={PROGRAM_MODAL_CONFIG.classNames.body}
            >
              <ProgramForm
                editingProgram={editingProgram || undefined}
                categoryId={categoryId}
                categoryType={categoryType}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
