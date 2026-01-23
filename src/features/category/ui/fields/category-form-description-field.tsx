"use client";

import { memo } from "react";
import { type Control } from "react-hook-form";
import { TextareaField } from "@/shared/ui/form-fields/textarea-field";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
} from "../constants/category-form-constants";
import type { CategoryFormData } from "../types/category-form.types";

interface CategoryFormDescriptionFieldProps {
  control: Control<CategoryFormData>;
}

export const CategoryFormDescriptionField = memo(
  function CategoryFormDescriptionField({
    control,
  }: CategoryFormDescriptionFieldProps) {
    return (
      <TextareaField
        control={control}
        name="description"
        label={FORM_LABELS.description}
        placeholder={FORM_PLACEHOLDERS.description}
        description={FORM_MESSAGES.descriptionOptional}
        minRows={3}
      />
    );
  }
);
