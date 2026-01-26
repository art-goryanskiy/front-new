"use client";

import { memo, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProgramModalState } from "@/shared/store/ui-store";
import { ProgramForm } from "@/features/program/ui/program-form";
import { useProgramCategoryType } from "./hooks/use-program-category-type";
import { PROGRAM_MODAL_TEXTS } from "./constants/program-modal-constants";

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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
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
