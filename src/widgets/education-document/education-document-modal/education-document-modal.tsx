"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EducationDocumentForm } from "@/features/education-document/ui/education-document-form";
import { useEducationDocumentModalState } from "@/shared/store/modal-store";
import { UnsavedChangesModal } from "@/shared/ui/unsaved-changes-modal/unsaved-changes-modal";
import { X } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { EDUCATION_DOCUMENT_MODAL_TEXTS } from "./constants/education-document-modal-constants";

export const EducationDocumentModal = memo(
  function EducationDocumentModal() {
    const {
      isEducationDocumentModalOpen: isOpen,
      editingEducationDocument,
      closeEducationDocumentModal: onClose,
    } = useEducationDocumentModalState();

    const isEditMode = useMemo(
      () => !!editingEducationDocument,
      [editingEducationDocument]
    );

    const [isDirty, setIsDirty] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const formKey = useMemo(
      () =>
        `${isOpen ? "open" : "closed"}-${editingEducationDocument?.id ?? "create"}`,
      [isOpen, editingEducationDocument?.id]
    );

    const handleRequestClose = useCallback(() => {
      if (isBusy) return;
      if (isDirty) {
        setConfirmOpen(true);
        return;
      }
      onClose();
    }, [isBusy, isDirty, onClose]);

    const handleDiscard = useCallback(() => {
      setConfirmOpen(false);
      setIsDirty(false);
      onClose();
    }, [onClose]);

    return (
      <>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => !open && handleRequestClose()}
        >
          <DialogContent
            showClose={false}
            className="top-1/2 left-1/2 max-h-[90dvh] w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden border-border/60 bg-background p-0 shadow-2xl sm:rounded-2xl"
            onEscapeKeyDown={(e) => {
              if (isBusy) {
                e.preventDefault();
                return;
              }
              if (isDirty) {
                e.preventDefault();
                setConfirmOpen(true);
              }
            }}
            onInteractOutside={(e) => {
              if (isBusy) e.preventDefault();
              if (isDirty) {
                e.preventDefault();
                setConfirmOpen(true);
              }
            }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="bg-[radial-gradient(circle_at_20%_10%,var(--color-primary),transparent_55%)]/[10] absolute -top-20 -left-24 h-[420px] w-[520px] rounded-full blur-2xl" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
            </div>

            <DialogHeader className="sticky top-0 z-10 border-b border-border/60 bg-background/70 px-6 py-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <DialogTitle className="text-xl font-bold">
                    {isEditMode
                      ? EDUCATION_DOCUMENT_MODAL_TEXTS.edit
                      : EDUCATION_DOCUMENT_MODAL_TEXTS.create}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditMode
                      ? "Измените название и изображение документа."
                      : "Создайте новый документ об образовании."}
                  </DialogDescription>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0 rounded-xl border border-border/60 bg-background/60 shadow-sm backdrop-blur hover:bg-muted/20"
                  onClick={handleRequestClose}
                  disabled={isBusy}
                  aria-label="Закрыть"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="relative z-10 max-h-[calc(90dvh-6.5rem)] overflow-x-hidden overflow-y-auto px-6 py-6">
              <EducationDocumentForm
                key={formKey}
                editingDocument={
                  editingEducationDocument ?? undefined
                }
                onDirtyChange={setIsDirty}
                onBusyChange={setIsBusy}
              />
            </div>
          </DialogContent>
        </Dialog>

        <UnsavedChangesModal
          isOpen={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onDiscard={handleDiscard}
        />
      </>
    );
  }
);
