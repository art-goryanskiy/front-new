"use client";

import { memo, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserModalState } from "@/shared/store/ui-store";
import { UserForm } from "@/features/user/ui/user-form";
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
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
