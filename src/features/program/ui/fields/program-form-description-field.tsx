"use client";

import { memo } from "react";
import { type Control } from "react-hook-form";
import { TextareaField } from "@/shared/ui/form-fields/textarea-field";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormDescriptionFieldProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormDescriptionField = memo(
  function ProgramFormDescriptionField({
    control,
  }: ProgramFormDescriptionFieldProps) {
    return (
      <TextareaField
        control={control}
        name="description"
        label={FORM_LABELS.description}
        placeholder={FORM_PLACEHOLDERS.description}
        minRows={3}
      />
    );
  }
);
