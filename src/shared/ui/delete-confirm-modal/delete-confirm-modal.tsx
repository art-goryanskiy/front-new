"use client";

import { memo, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
    } catch {
      // Ошибка отображается через error в модалке
    }
  }, [onDelete, onClose, entityType]);

  const errorMessage = useMemo(
    () => error?.message || `Ошибка при удалении ${entityType}`,
    [error?.message, entityType]
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showClose={!loading}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Подтверждение удаления
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {error && (
            <div
              className={DELETE_CONFIRM_MODAL_CLASSES.errorContainer}
            >
              <p className={DELETE_CONFIRM_MODAL_CLASSES.errorText}>
                {errorMessage}
              </p>
            </div>
          )}
          <p className={DELETE_CONFIRM_MODAL_CLASSES.mainText}>
            Вы уверены, что хотите удалить {entityType}{" "}
            <span className={DELETE_CONFIRM_MODAL_CLASSES.itemName}>
              &quot;{itemName}&quot;
            </span>
            ?
          </p>
          <p className={DELETE_CONFIRM_MODAL_CLASSES.warningText}>
            {DELETE_CONFIRM_MODAL_TEXTS.warning} {entityType}{" "}
            {DELETE_CONFIRM_MODAL_TEXTS.willBeDeleted}
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            {DELETE_CONFIRM_MODAL_TEXTS.cancel}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="mr-2 h-4 w-4" size={16} />
                {DELETE_CONFIRM_MODAL_TEXTS.delete}
              </>
            ) : (
              DELETE_CONFIRM_MODAL_TEXTS.delete
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
