"use client";

import { memo, useMemo } from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@heroui/react";
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
    const classNames = useMemo(
      () => ({
        inputWrapper: "w-full",
        input: "w-full",
      }),
      []
    );

    return (
      <Controller
        name="awardedQualification"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={FORM_LABELS.awardedQualification}
            placeholder={FORM_PLACEHOLDERS.awardedQualification}
            aria-label={FORM_LABELS.awardedQualification}
            className="w-full"
            classNames={classNames}
          />
        )}
      />
    );
  }
);
