"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/features/user/ui/user-form";
import { useUserModalState } from "@/shared/store/modal-store";
import { memo, useMemo } from "react";
import { USER_MODAL_TEXTS } from "./constants/user-modal-constants";

export const UserModal = memo(function UserModal() {
  const {
    isUserModalOpen: isOpen,
    editingUser,
    closeUserModal: onClose,
  } = useUserModalState();

  const isEditMode = useMemo(() => !!editingUser, [editingUser]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode
              ? USER_MODAL_TEXTS.edit
              : USER_MODAL_TEXTS.create}
          </DialogTitle>
        </DialogHeader>
        <div className="px-1">
          <UserForm editingUser={editingUser || undefined} />
        </div>
      </DialogContent>
    </Dialog>
  );
});
