"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateCategory } from "@/entities/category/api/use-create-category";
import { useUpdateCategory } from "@/entities/category/api/use-update-category";
import { useCategoryModalState } from "@/shared/store/modal-store";
import { useToastState } from "@/shared/store/toast-store";
import { FormErrorSummary } from "@/shared/ui/form-error-summary/form-error-summary";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FORM_CLASSES,
  FORM_LABELS,
  FORM_MESSAGES,
} from "./constants/category-form-constants";
import { CategoryFormDescriptionField } from "./fields/category-form-description-field";
import { CategoryFormImageField } from "./fields/category-form-image-field";
import { CategoryFormNameField } from "./fields/category-form-name-field";
import { CategoryFormTypeField } from "./fields/category-form-type-field";
import { useCategoryImage } from "./hooks/use-category-image";
import type {
  CategoryFormData,
  CategoryFormProps,
} from "./types/category-form.types";
import {
  createCategoryInput,
  getDefaultValues,
  updateCategoryInput,
} from "./utils/category-form-utils";

export const CategoryForm = memo(function CategoryForm({
  editingCategory,
  onDirtyChange,
  onBusyChange,
}: CategoryFormProps) {
  const isEditMode = !!editingCategory;
  const {
    createCategory,
    loading: creating,
    error: createError,
  } = useCreateCategory();
  const {
    updateCategory,
    loading: updating,
    error: updateError,
  } = useUpdateCategory();

  const { closeCategoryModal: closeModal, categoryType } =
    useCategoryModalState();
  const { showToast } = useToastState();

  const loading = creating || updating;
  const error = createError || updateError;

  const {
    imagePreview,
    uploadingImage,
    handleImageFile,
    uploadImageFile,
    resetImageState,
  } = useCategoryImage({
    initialImage: editingCategory?.image || null,
    editingCategoryImage: editingCategory?.image || null,
  });

  const busy = loading || uploadingImage;

  const defaultValues = useMemo(
    () => getDefaultValues(editingCategory, categoryType),
    [editingCategory, categoryType]
  );

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<CategoryFormData>({
      defaultValues,
    });

  const imageFile = useWatch({
    control,
    name: "image",
  });

  // Note: the modal remounts the form via `key`, so defaultValues are enough.
  // Keep type in sync for create-mode when the modal's categoryType changes.
  useEffect(() => {
    if (categoryType && !editingCategory) {
      setValue("type", categoryType as CategoryFormData["type"]);
    }
  }, [categoryType, editingCategory, setValue]);

  useEffect(() => {
    onDirtyChange?.(formState.isDirty);
  }, [formState.isDirty, onDirtyChange]);

  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);

  // Обработка изменения файла изображения
  useEffect(() => {
    handleImageFile(imageFile ?? null);
  }, [imageFile, handleImageFile]);

  const onSubmit = useCallback(
    async (data: CategoryFormData) => {
      try {
        const imageUrl = await uploadImageFile(data.image ?? null);

        if (isEditMode && editingCategory) {
          const input = updateCategoryInput(data, imageUrl);
          await updateCategory(editingCategory.id, input);
          showToast("success", "Категория обновлена");
          closeModal();
        } else {
          const input = createCategoryInput(data, imageUrl);
          await createCategory(input);
          showToast("success", "Категория создана");
          closeModal();
        }

        reset();
        resetImageState();
        onDirtyChange?.(false);
      } catch (err) {
        console.error(
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} категории:`,
          err
        );
        showToast(
          "error",
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} категории`
        );
      }
    },
    [
      isEditMode,
      editingCategory,
      uploadImageFile,
      updateCategory,
      createCategory,
      closeModal,
      reset,
      resetImageState,
      showToast,
      onDirtyChange,
    ]
  );

  const onInvalid = useCallback(() => {
    // Scroll to summary if visible
    const el = document.getElementById("form-error-summary");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={FORM_CLASSES.form}
    >
      <div id="form-error-summary">
        <FormErrorSummary<CategoryFormData>
          errors={formState.errors}
          labels={{
            name: FORM_LABELS.name,
            type: FORM_LABELS.type,
          }}
        />
      </div>

      {error && (
        <div className={FORM_CLASSES.errorContainer}>
          <p className={FORM_CLASSES.errorText}>
            {error.message ||
              `Ошибка при ${isEditMode ? "обновлении" : "создании"} категории`}
          </p>
        </div>
      )}

      {/* Основная информация */}
      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>
          Основная информация
        </h3>
        <CategoryFormNameField control={control} />
        <CategoryFormDescriptionField control={control} />
        <CategoryFormTypeField
          control={control}
          isEditMode={isEditMode}
        />
      </div>

      {/* Изображение */}
      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>Изображение</h3>
        <CategoryFormImageField
          control={control}
          imagePreview={imagePreview}
          uploadingImage={uploadingImage}
          onImageFileChange={handleImageFile}
        />
      </div>

      {/* Действия */}
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
