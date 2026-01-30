"use client";

import { memo, useCallback, useMemo } from "react";
import { Controller, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
                  className="h-20 w-20 shrink-0"
                  aria-label="Предпросмотр изображения"
                >
                  <AvatarImage src={imagePreview} alt="Preview" />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
              )}
              <div className={FORM_CLASSES.imageInput}>
                <input
                  {...field}
                  id="category-image-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(onChange, e)}
                  aria-label={FORM_MESSAGES.selectImage}
                />
                <Label
                  htmlFor="category-image-file"
                  className="block w-full cursor-pointer"
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="pointer-events-none w-full"
                    disabled={uploadingImage}
                  >
                    {buttonText}
                  </Button>
                </Label>
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
