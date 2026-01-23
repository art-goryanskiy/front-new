"use client";

import { memo, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { useUserModalState } from "@/shared/store/ui-store";
import { UserForm } from "@/features/user/ui/user-form";
import {
  USER_MODAL_TEXTS,
  USER_MODAL_CONFIG,
} from "./constants/user-modal-constants";

export const UserModal = memo(function UserModal() {
  const {
    isUserModalOpen: isOpen,
    editingUser,
    closeUserModal: onClose,
  } = useUserModalState();

  const isEditMode = useMemo(() => !!editingUser, [editingUser]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={USER_MODAL_CONFIG.size}
      scrollBehavior={USER_MODAL_CONFIG.scrollBehavior}
      classNames={USER_MODAL_CONFIG.classNames}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader
              className={`flex flex-col gap-1 ${USER_MODAL_CONFIG.classNames.header}`}
            >
              <h2 className="text-xl font-bold text-default-900 dark:text-foreground">
                {isEditMode
                  ? USER_MODAL_TEXTS.edit
                  : USER_MODAL_TEXTS.create}
              </h2>
            </ModalHeader>
            <ModalBody className={USER_MODAL_CONFIG.classNames.body}>
              <UserForm editingUser={editingUser || undefined} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
