"use client";

import { memo, useCallback } from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
            <div className="space-y-2 w-full">
              <Label htmlFor="awardedRankFrom">{FORM_LABELS.awardedRankFrom}</Label>
              <Input
                {...field}
                id="awardedRankFrom"
                type="number"
                placeholder={FORM_PLACEHOLDERS.awardedRankFrom}
                value={field.value?.toString() || ""}
                onChange={handleNumberChange(field.onChange)}
                aria-label={FORM_LABELS.awardedRankFrom}
                className="w-full"
              />
            </div>
          )}
        />
        <Controller
          name="awardedRankTo"
          control={control}
          render={({ field }) => (
            <div className="space-y-2 w-full">
              <Label htmlFor="awardedRankTo">{FORM_LABELS.awardedRankTo}</Label>
              <Input
                {...field}
                id="awardedRankTo"
                type="number"
                placeholder={FORM_PLACEHOLDERS.awardedRankTo}
                value={field.value?.toString() || ""}
                onChange={handleNumberChange(field.onChange)}
                aria-label={FORM_LABELS.awardedRankTo}
                className="w-full"
              />
            </div>
          )}
        />
      </div>
    );
  }
);
