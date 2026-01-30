"use client";

import { memo } from "react";
import { type Control } from "react-hook-form";
import { MarkdownField } from "@/shared/ui/form-fields/markdown-field";
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
      <MarkdownField
        control={control}
        name="description"
        label={FORM_LABELS.description}
        placeholder={FORM_PLACEHOLDERS.description}
        minRows={6}
      />
    );
  }
);
