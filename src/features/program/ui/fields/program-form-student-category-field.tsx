"use client";

import { memo, useMemo } from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@heroui/react";
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
    const classNames = useMemo(
      () => ({
        inputWrapper: "w-full",
        input: "w-full",
      }),
      []
    );

    return (
      <Controller
        name="studentCategory"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={FORM_LABELS.studentCategory}
            placeholder={FORM_PLACEHOLDERS.studentCategory}
            aria-label={FORM_LABELS.studentCategory}
            className="w-full"
            classNames={classNames}
          />
        )}
      />
    );
  }
);
