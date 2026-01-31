"use client";

import { useDeleteEducationDocument } from "@/entities/education-document/api/use-delete-education-document";
import { useEducationDocumentModalState } from "@/shared/store/modal-store";
import { DeleteConfirmModal } from "@/shared/ui/delete-confirm-modal/delete-confirm-modal";
import { useCallback } from "react";

export function DeleteEducationDocumentModal() {
  const {
    isDeleteEducationDocumentModalOpen: isOpen,
    deletingEducationDocument,
    closeDeleteEducationDocumentModal: onClose,
  } = useEducationDocumentModalState();
  const { deleteEducationDocument, loading, error } =
    useDeleteEducationDocument();

  const handleDelete = useCallback(async () => {
    if (!deletingEducationDocument) return;
    await deleteEducationDocument(deletingEducationDocument.id);
  }, [deletingEducationDocument, deleteEducationDocument]);

  if (!deletingEducationDocument) return null;

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить документ"
      itemName={deletingEducationDocument.name}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      entityType="документ"
    />
  );
}
