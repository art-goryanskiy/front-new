"use client";

import { memo, useCallback, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import {
  DELETE_CONFIRM_MODAL_TEXTS,
  DELETE_CONFIRM_MODAL_CLASSES,
} from "./constants/delete-confirm-modal-constants";
import type { DeleteConfirmModalProps } from "./types/delete-confirm-modal.types";

export const DeleteConfirmModal = memo(function DeleteConfirmModal({
  isOpen,
  onClose,
  title,
  itemName,
  onDelete,
  loading = false,
  error = null,
  entityType,
}: DeleteConfirmModalProps) {
  const handleDelete = useCallback(async () => {
    try {
      await onDelete();
      onClose();
    } catch (err) {
      console.error(`Ошибка при удалении ${entityType}:`, err);
    }
  }, [onDelete, onClose, entityType]);

  const errorMessage = useMemo(
    () => error?.message || `Ошибка при удалении ${entityType}`,
    [error?.message, entityType]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
            </ModalHeader>
            <ModalBody>
              {error && (
                <div
                  className={
                    DELETE_CONFIRM_MODAL_CLASSES.errorContainer
                  }
                >
                  <p
                    className={DELETE_CONFIRM_MODAL_CLASSES.errorText}
                  >
                    {errorMessage}
                  </p>
                </div>
              )}
              <p className={DELETE_CONFIRM_MODAL_CLASSES.mainText}>
                Вы уверены, что хотите удалить {entityType}{" "}
                <span
                  className={DELETE_CONFIRM_MODAL_CLASSES.itemName}
                >
                  &quot;{itemName}&quot;
                </span>
                ?
              </p>
              <p className={DELETE_CONFIRM_MODAL_CLASSES.warningText}>
                {DELETE_CONFIRM_MODAL_TEXTS.warning} {entityType}{" "}
                {DELETE_CONFIRM_MODAL_TEXTS.willBeDeleted}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                isDisabled={loading}
              >
                {DELETE_CONFIRM_MODAL_TEXTS.cancel}
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isLoading={loading}
              >
                {DELETE_CONFIRM_MODAL_TEXTS.delete}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
