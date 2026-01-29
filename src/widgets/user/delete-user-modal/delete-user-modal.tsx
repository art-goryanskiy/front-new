"use client";

import { useDeleteUser } from "@/entities/user/api/use-delete-user";
import { useUserModalState } from "@/shared/store/modal-store";
import { DeleteConfirmModal } from "@/shared/ui/delete-confirm-modal/delete-confirm-modal";
import { memo, useCallback, useMemo } from "react";

export const DeleteUserModal = memo(function DeleteUserModal() {
  const {
    isDeleteUserModalOpen: isOpen,
    deletingUser,
    closeDeleteUserModal: onClose,
  } = useUserModalState();
  const { deleteUser, loading, error } = useDeleteUser();

  const handleDelete = useCallback(async () => {
    if (!deletingUser) return;
    await deleteUser(deletingUser.id);
  }, [deletingUser, deleteUser]);

  const userName = useMemo(() => {
    if (!deletingUser) return "";
    return deletingUser.firstName && deletingUser.lastName
      ? `${deletingUser.firstName} ${deletingUser.lastName}`
      : deletingUser.email;
  }, [deletingUser]);

  if (!deletingUser) return null;

  return (
    <DeleteConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить пользователя"
      itemName={userName}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      entityType="пользователя"
    />
  );
});
