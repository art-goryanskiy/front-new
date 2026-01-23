"use client";

import { memo, useCallback, useMemo } from "react";
import { Controller, Control } from "react-hook-form";
import { Button, Avatar } from "@heroui/react";
import {
  FORM_MESSAGES,
  FORM_CLASSES,
} from "../constants/category-form-constants";
import type { CategoryFormData } from "../types/category-form.types";

interface CategoryFormImageFieldProps {
  control: Control<CategoryFormData>;
  imagePreview: string | null;
  uploadingImage: boolean;
  onImageFileChange: (file: File | null) => void;
}

export const CategoryFormImageField = memo(
  function CategoryFormImageField({
    control,
    imagePreview,
    uploadingImage,
    onImageFileChange,
  }: CategoryFormImageFieldProps) {
    const handleFileChange = useCallback(
      (
        fieldOnChange: (file: File | null) => void,
        e: React.ChangeEvent<HTMLInputElement>
      ) => {
        const file = e.target.files?.[0] || null;
        fieldOnChange(file);
        onImageFileChange(file);
      },
      [onImageFileChange]
    );

    const buttonText = useMemo(
      () =>
        imagePreview
          ? FORM_MESSAGES.changeImage
          : FORM_MESSAGES.selectImage,
      [imagePreview]
    );

    return (
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <div className={FORM_CLASSES.imageContainer}>
            <div className={FORM_CLASSES.imagePreview}>
              {imagePreview && (
                <Avatar
                  src={imagePreview}
                  alt="Preview"
                  size="lg"
                  className="h-20 w-20 shrink-0"
                  aria-label="Предпросмотр изображения"
                />
              )}
              <div className={FORM_CLASSES.imageInput}>
                <label className="block w-full">
                  <input
                    {...field}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(onChange, e)}
                    aria-label={FORM_MESSAGES.selectImage}
                  />
                  <Button
                    as="span"
                    variant="bordered"
                    className="w-full"
                    isDisabled={uploadingImage}
                  >
                    {buttonText}
                  </Button>
                </label>
                {value && (
                  <p
                    className={FORM_CLASSES.imageFileName}
                    aria-label="Имя файла"
                  >
                    {value.name}
                  </p>
                )}
              </div>
            </div>
            {uploadingImage && (
              <p
                className={FORM_CLASSES.uploadingText}
                role="status"
                aria-live="polite"
              >
                {FORM_MESSAGES.uploadingImage}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);
