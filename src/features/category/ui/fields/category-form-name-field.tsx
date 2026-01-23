"use client";

import { memo } from "react";
import { type Control } from "react-hook-form";
import { RequiredTextInputField } from "@/shared/ui/form-fields/required-text-input-field";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
} from "../constants/category-form-constants";
import type { CategoryFormData } from "../types/category-form.types";

interface CategoryFormNameFieldProps {
  control: Control<CategoryFormData>;
}

export const CategoryFormNameField = memo(
  function CategoryFormNameField({
    control,
  }: CategoryFormNameFieldProps) {
    return (
      <RequiredTextInputField
        control={control}
        name="name"
        label={FORM_LABELS.name}
        placeholder={FORM_PLACEHOLDERS.name}
        requiredMessage={FORM_MESSAGES.nameRequired}
      />
    );
  }
);
