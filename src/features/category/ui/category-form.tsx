"use client";

import { memo, useEffect, useRef, useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button, Form } from "@heroui/react";
import { useCategoryModalState } from "@/shared/store/ui-store";
import { useCreateCategory } from "@/entities/category/api/use-create-category";
import { useUpdateCategory } from "@/entities/category/api/use-update-category";
import { useCategoryImage } from "./hooks/use-category-image";
import {
  getDefaultValues,
  createCategoryInput,
  updateCategoryInput,
} from "./utils/category-form-utils";
import {
  FORM_CLASSES,
  FORM_MESSAGES,
} from "./constants/category-form-constants";
import type {
  CategoryFormData,
  CategoryFormProps,
} from "./types/category-form.types";
import { CategoryFormNameField } from "./fields/category-form-name-field";
import { CategoryFormDescriptionField } from "./fields/category-form-description-field";
import { CategoryFormTypeField } from "./fields/category-form-type-field";
import { CategoryFormImageField } from "./fields/category-form-image-field";

export const CategoryForm = memo(function CategoryForm({
  editingCategory,
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

  const loading = creating || updating;
  const error = createError || updateError;

  const {
    imagePreview,
    uploadingImage,
    handleImageFile,
    uploadImageFile,
    resetImageState,
    setImagePreview,
  } = useCategoryImage({
    initialImage: editingCategory?.image || null,
    editingCategoryImage: editingCategory?.image || null,
  });

  const defaultValues = useMemo(
    () => getDefaultValues(editingCategory, categoryType),
    [editingCategory, categoryType]
  );

  const { control, handleSubmit, reset, setValue } =
    useForm<CategoryFormData>({
      defaultValues,
    });

  const imageFile = useWatch({
    control,
    name: "image",
  });

  const editingCategoryIdRef = useRef<string | null>(null);
  const previousCategoryTypeRef =
    useRef<typeof categoryType>(categoryType);

  // Объединенный эффект для редактирования категории и установки типа
  useEffect(() => {
    // Обработка редактирования категории
    if (
      editingCategory &&
      editingCategory.id !== editingCategoryIdRef.current
    ) {
      editingCategoryIdRef.current = editingCategory.id;
      reset({
        name: editingCategory.name,
        description: editingCategory.description || "",
        type: editingCategory.type || undefined,
        image: null,
      });
      setImagePreview(editingCategory.image || null);
    } else if (
      !editingCategory &&
      editingCategoryIdRef.current !== null
    ) {
      editingCategoryIdRef.current = null;
    }

    // Установка типа категории при создании
    if (
      categoryType &&
      !editingCategory &&
      previousCategoryTypeRef.current !== categoryType
    ) {
      setValue("type", categoryType as CategoryFormData["type"]);
      previousCategoryTypeRef.current = categoryType;
    }

    // Сброс ref при завершении загрузки
    if (!loading && !editingCategory) {
      editingCategoryIdRef.current = null;
    }
  }, [
    editingCategory,
    editingCategory?.id,
    categoryType,
    loading,
    reset,
    setValue,
    setImagePreview,
  ]);

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
          closeModal();
        } else {
          const input = createCategoryInput(data, imageUrl);
          await createCategory(input);
          closeModal();
        }

        reset();
        resetImageState();
      } catch (err) {
        console.error(
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} категории:`,
          err
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
    ]
  );

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior="native"
      className={FORM_CLASSES.form}
    >
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
          variant="light"
          onPress={closeModal}
          isDisabled={loading || uploadingImage}
          className="min-w-24"
        >
          {FORM_MESSAGES.cancel}
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={loading || uploadingImage}
          className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
        >
          {isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create}
        </Button>
      </div>
    </Form>
  );
});
