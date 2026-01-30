"use client";

import { memo } from "react";
import { Control } from "react-hook-form";
import { MarkdownField } from "@/shared/ui/form-fields/markdown-field";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormStudentCategoryFieldProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormStudentCategoryField = memo(
  function ProgramFormStudentCategoryField({
    control,
  }: ProgramFormStudentCategoryFieldProps) {
    return (
      <MarkdownField
        control={control}
        name="studentCategory"
        label={FORM_LABELS.studentCategory}
        placeholder={FORM_PLACEHOLDERS.studentCategory}
        minRows={4}
      />
    );
  }
);
