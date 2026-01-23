"use client";

import { memo } from "react";
import { type Control } from "react-hook-form";
import { RequiredTextInputField } from "@/shared/ui/form-fields/required-text-input-field";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormTitleFieldProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormTitleField = memo(
  function ProgramFormTitleField({
    control,
  }: ProgramFormTitleFieldProps) {
    return (
      <RequiredTextInputField
        control={control}
        name="title"
        label={FORM_LABELS.title}
        placeholder={FORM_PLACEHOLDERS.title}
        requiredMessage={FORM_MESSAGES.titleRequired}
      />
    );
  }
);
