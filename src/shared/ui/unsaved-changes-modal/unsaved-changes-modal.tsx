"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <DialogContent
        showClose={false}
        className="max-w-md overflow-hidden border-border/60 bg-background p-0 shadow-2xl sm:rounded-2xl"
      >
        {/* shader-lite background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-[radial-gradient(circle_at_20%_10%,var(--color-primary),transparent_55%)]/[8] absolute -top-20 -left-24 h-[320px] w-[420px] rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/70" />
        </div>

        <DialogHeader className="relative z-10 border-b border-border/60 bg-background/70 px-6 py-5 backdrop-blur-xl">
          <DialogTitle className="text-lg font-semibold">
            Несохранённые изменения
          </DialogTitle>
          <DialogDescription>
            Закрытие формы приведёт к потере введённых данных.
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10 px-6 py-5 text-sm text-muted-foreground">
          <p>Сохранить не получится автоматически. Что делаем?</p>
        </div>

        <DialogFooter className="relative z-10 gap-2 border-t border-border/60 bg-background/80 px-6 py-4 backdrop-blur-xl sm:gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Продолжить
          </Button>
          <Button variant="destructive" onClick={onDiscard}>
            Сбросить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
