"use client";

import { memo, useCallback } from "react";
import { useProgramModalState } from "@/shared/store/ui-store";
import { useDeleteProgram } from "@/entities/program/api/use-delete-program";
import { DeleteConfirmModal } from "@/shared/ui/delete-confirm-modal/delete-confirm-modal";

export const DeleteProgramModal = memo(function DeleteProgramModal() {
  const {
    isDeleteProgramModalOpen: isOpen,
    deletingProgram,
    closeDeleteProgramModal: onClose,
  } = useProgramModalState();
  const { deleteProgram, loading, error } = useDeleteProgram();

  const handleDelete = useCallback(async () => {
    if (!deletingProgram) return;
    await deleteProgram(deletingProgram.id);
  }, [deletingProgram, deleteProgram]);

  if (!deletingProgram) return null;

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить программу"
      itemName={deletingProgram.title}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      entityType="программу"
    />
  );
});
