"use client";

import { memo, useMemo, useCallback } from "react";
import { Controller, Control } from "react-hook-form";
import { Select, SelectItem } from "@heroui/react";
import type { Selection } from "@heroui/react";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
  CATEGORY_TYPE_OPTIONS,
} from "../constants/category-form-constants";
import type { CategoryFormData } from "../types/category-form.types";
import type { CategoryType } from "@/shared/api/generated/graphql";

interface CategoryFormTypeFieldProps {
  control: Control<CategoryFormData>;
  isEditMode: boolean;
}

export const CategoryFormTypeField = memo(
  function CategoryFormTypeField({
    control,
    isEditMode,
  }: CategoryFormTypeFieldProps) {
    const rules = useMemo(
      () => ({ required: FORM_MESSAGES.typeRequired }),
      []
    );

    const handleSelectionChange = useCallback(
      (fieldOnChange: (value: CategoryType | undefined) => void) =>
        (keys: Selection) => {
          const selected = Array.from(keys)[0] as
            | CategoryType
            | undefined;
          fieldOnChange(selected);
        },
      []
    );

    const classNames = useMemo(
      () => ({
        trigger: "w-full",
        value: "w-full",
      }),
      []
    );

    return (
      <Controller
        name="type"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Select
            label={FORM_LABELS.type}
            placeholder={FORM_PLACEHOLDERS.type}
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={handleSelectionChange(field.onChange)}
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            isDisabled={isEditMode}
            aria-label={FORM_LABELS.type}
            className="w-full"
            classNames={classNames}
          >
            {CATEGORY_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />
    );
  }
);
