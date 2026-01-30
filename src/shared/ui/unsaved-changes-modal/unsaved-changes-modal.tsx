"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { memo } from "react";

export interface UnsavedChangesModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDiscard: () => void;
}

export const UnsavedChangesModal = memo(function UnsavedChangesModal({
  isOpen,
  onCancel,
  onDiscard,
}: UnsavedChangesModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onCancel()}
    >
      <DialogContent className="max-w-md" showClose={false}>
        <DialogHeader>
          <DialogTitle>Есть несохранённые изменения</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2 text-sm text-muted-foreground">
          <p>Если закрыть форму сейчас — изменения будут потеряны.</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Продолжить редактирование
          </Button>
          <Button variant="destructive" onClick={onDiscard}>
            Сбросить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
