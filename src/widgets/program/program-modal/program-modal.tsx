"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProgramForm } from "@/features/program/ui/program-form";
import { useProgramModalState } from "@/shared/store/modal-store";
import { memo, useMemo } from "react";
import { PROGRAM_MODAL_TEXTS } from "./constants/program-modal-constants";
import { useProgramCategoryType } from "./hooks/use-program-category-type";

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode
              ? PROGRAM_MODAL_TEXTS.edit
              : PROGRAM_MODAL_TEXTS.create}
          </DialogTitle>
        </DialogHeader>
        <div className="px-1">
          <ProgramForm
            editingProgram={editingProgram || undefined}
            categoryId={categoryId}
            categoryType={categoryType}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
