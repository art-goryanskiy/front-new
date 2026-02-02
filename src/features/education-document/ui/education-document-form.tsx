"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateEducationDocument } from "@/entities/education-document/api/use-create-education-document";
import { useUpdateEducationDocument } from "@/entities/education-document/api/use-update-education-document";
import { useEducationDocumentModalState } from "@/shared/store/modal-store";
import { useToastState } from "@/shared/store/toast-store";
import { FormErrorSummary } from "@/shared/ui/form-error-summary/form-error-summary";
import { RequiredTextInputField } from "@/shared/ui/form-fields/required-text-input-field";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FORM_CLASSES,
  FORM_LABELS,
  FORM_MESSAGES,
  FORM_PLACEHOLDERS,
} from "./constants/education-document-form-constants";
import { EducationDocumentFormImageField } from "./fields/education-document-form-image-field";
import { useEducationDocumentImage } from "./hooks/use-education-document-image";
import type {
  EducationDocumentFormData,
  EducationDocumentFormProps,
} from "./types/education-document-form.types";
import {
  createEducationDocumentInput,
  getDefaultValues,
  updateEducationDocumentInput,
} from "./utils/education-document-form-utils";

export const EducationDocumentForm = memo(function EducationDocumentForm({
  editingDocument,
  onDirtyChange,
  onBusyChange,
}: EducationDocumentFormProps) {
  const isEditMode = !!editingDocument;
  const { createEducationDocument, loading: creating, error: createError } =
    useCreateEducationDocument();
  const { updateEducationDocument, loading: updating, error: updateError } =
    useUpdateEducationDocument();

  const { closeEducationDocumentModal: closeModal } =
    useEducationDocumentModalState();
  const { showToast } = useToastState();

  const loading = creating || updating;
  const error = createError || updateError;

  const {
    imagePreview,
    uploadingImage,
    handleImageFile,
    uploadImageFile,
    resetImageState,
  } = useEducationDocumentImage({
    initialImage: editingDocument?.image || null,
    editingImage: editingDocument?.image || null,
  });

  const busy = loading || uploadingImage;

  const defaultValues = useMemo(
    () => getDefaultValues(editingDocument),
    [editingDocument]
  );

  const { control, handleSubmit, reset, formState } =
    useForm<EducationDocumentFormData>({
      defaultValues,
    });

  const imageFile = useWatch({ control, name: "image" });

  useEffect(() => {
    onDirtyChange?.(formState.isDirty);
  }, [formState.isDirty, onDirtyChange]);

  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);

  useEffect(() => {
    handleImageFile(imageFile ?? null);
  }, [imageFile, handleImageFile]);

  const onSubmit = useCallback(
    async (data: EducationDocumentFormData) => {
      try {
        const imageUrl = await uploadImageFile(data.image ?? null);

        if (isEditMode && editingDocument) {
          const input = updateEducationDocumentInput(data, imageUrl);
          await updateEducationDocument(editingDocument.id, input);
          showToast("success", "Документ обновлён");
          closeModal();
        } else {
          const input = createEducationDocumentInput(data, imageUrl);
          await createEducationDocument(input);
          showToast("success", "Документ создан");
          closeModal();
        }

        reset();
        resetImageState();
        onDirtyChange?.(false);
      } catch {
        showToast(
          "error",
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} документа`
        );
      }
    },
    [
      isEditMode,
      editingDocument,
      uploadImageFile,
      updateEducationDocument,
      createEducationDocument,
      closeModal,
      reset,
      resetImageState,
      showToast,
      onDirtyChange,
    ]
  );

  const onInvalid = useCallback(() => {
    const el = document.getElementById("form-error-summary");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={FORM_CLASSES.form}
    >
      <div id="form-error-summary">
        <FormErrorSummary<EducationDocumentFormData>
          errors={formState.errors}
          labels={{ name: FORM_LABELS.name }}
        />
      </div>

      {error && (
        <div className={FORM_CLASSES.errorContainer}>
          <p className={FORM_CLASSES.errorText}>
            {error.message ||
              `Ошибка при ${isEditMode ? "обновлении" : "создании"} документа`}
          </p>
        </div>
      )}

      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>Основная информация</h3>
        <RequiredTextInputField
          control={control}
          name="name"
          label={FORM_LABELS.name}
          placeholder={FORM_PLACEHOLDERS.name}
          requiredMessage={FORM_MESSAGES.nameRequired}
        />
      </div>

      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>Изображение</h3>
        <EducationDocumentFormImageField
          control={control}
          imagePreview={imagePreview}
          uploadingImage={uploadingImage}
          onImageFileChange={handleImageFile}
        />
      </div>

      <div className={FORM_CLASSES.actions}>
        <Button
          type="button"
          variant="ghost"
          onClick={closeModal}
          disabled={loading || uploadingImage}
          className="min-w-24"
        >
          {FORM_MESSAGES.cancel}
        </Button>
        <Button
          type="submit"
          disabled={loading || uploadingImage}
          className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
        >
          {loading || uploadingImage ? (
            <>
              <Spinner className="mr-2 h-4 w-4" size={16} />
              {isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create}
            </>
          ) : isEditMode ? (
            FORM_MESSAGES.save
          ) : (
            FORM_MESSAGES.create
          )}
        </Button>
      </div>
    </form>
  );
});
