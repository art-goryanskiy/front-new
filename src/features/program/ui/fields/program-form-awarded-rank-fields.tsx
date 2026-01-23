"use client";

import { memo, useMemo, useCallback } from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_CLASSES,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormAwardedRankFieldsProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormAwardedRankFields = memo(
  function ProgramFormAwardedRankFields({
    control,
  }: ProgramFormAwardedRankFieldsProps) {
    const classNames = useMemo(
      () => ({
        inputWrapper: "w-full",
        input: "w-full",
      }),
      []
    );

    const handleNumberChange = useCallback(
      (fieldOnChange: (value: number | undefined) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          fieldOnChange(value ? Number(value) : undefined);
        },
      []
    );

    return (
      <div className={FORM_CLASSES.rankFields}>
        <Controller
          name="awardedRankFrom"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              label={FORM_LABELS.awardedRankFrom}
              placeholder={FORM_PLACEHOLDERS.awardedRankFrom}
              value={field.value?.toString() || ""}
              onChange={handleNumberChange(field.onChange)}
              aria-label={FORM_LABELS.awardedRankFrom}
              className="w-full"
              classNames={classNames}
            />
          )}
        />
        <Controller
          name="awardedRankTo"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              label={FORM_LABELS.awardedRankTo}
              placeholder={FORM_PLACEHOLDERS.awardedRankTo}
              value={field.value?.toString() || ""}
              onChange={handleNumberChange(field.onChange)}
              aria-label={FORM_LABELS.awardedRankTo}
              className="w-full"
              classNames={classNames}
            />
          )}
        />
      </div>
    );
  }
);
