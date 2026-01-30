"use client";

import { memo } from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <Controller
        name="studentCategory"
        control={control}
        render={({ field }) => (
          <div className="w-full space-y-2">
            <Label htmlFor="studentCategory">
              {FORM_LABELS.studentCategory}
            </Label>
            <Input
              {...field}
              id="studentCategory"
              placeholder={FORM_PLACEHOLDERS.studentCategory}
              aria-label={FORM_LABELS.studentCategory}
              className="w-full"
            />
          </div>
        )}
      />
    );
  }
);
