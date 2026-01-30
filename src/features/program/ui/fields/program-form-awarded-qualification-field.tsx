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

interface ProgramFormAwardedQualificationFieldProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormAwardedQualificationField = memo(
  function ProgramFormAwardedQualificationField({
    control,
  }: ProgramFormAwardedQualificationFieldProps) {
    return (
      <Controller
        name="awardedQualification"
        control={control}
        render={({ field }) => (
          <div className="w-full space-y-2">
            <Label htmlFor="awardedQualification">
              {FORM_LABELS.awardedQualification}
            </Label>
            <Input
              {...field}
              id="awardedQualification"
              placeholder={FORM_PLACEHOLDERS.awardedQualification}
              aria-label={FORM_LABELS.awardedQualification}
              className="w-full"
            />
          </div>
        )}
      />
    );
  }
);
