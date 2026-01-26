"use client";

import { memo, useMemo } from "react";
import { Controller, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
  CATEGORY_TYPE_OPTIONS,
} from "../constants/category-form-constants";
import type { CategoryFormData } from "../types/category-form.types";

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

    return (
      <Controller
        name="type"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="type">{FORM_LABELS.type} *</Label>
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={isEditMode}
            >
              <SelectTrigger id="type" aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={FORM_PLACEHOLDERS.type} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error?.message && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);
