"use client";

import { memo, useCallback } from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_CLASSES,
  RANK_MIN,
  RANK_MAX,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

function clampRank(value: number): number {
  const n = Math.round(value);
  if (Number.isNaN(n)) return RANK_MIN;
  return Math.min(RANK_MAX, Math.max(RANK_MIN, n));
}

interface ProgramFormAwardedRankFieldsProps {
  control: Control<ProgramFormData>;
  setValue: UseFormSetValue<ProgramFormData>;
}

export const ProgramFormAwardedRankFields = memo(
  function ProgramFormAwardedRankFields({
    control,
    setValue,
  }: ProgramFormAwardedRankFieldsProps) {
    const handleRankFromChange = useCallback(
      (fieldOnChange: (value: number | undefined) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          if (raw === "") {
            fieldOnChange(undefined);
            return;
          }
          const num = Number(raw);
          const clamped = clampRank(num);
          fieldOnChange(clamped);
          if (clamped === RANK_MIN) {
            setValue("awardedRankTo", RANK_MIN);
          }
        },
      [setValue]
    );

    const handleRankToChange = useCallback(
      (fieldOnChange: (value: number | undefined) => void) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          if (raw === "") {
            fieldOnChange(undefined);
            return;
          }
          const num = Number(raw);
          fieldOnChange(clampRank(num));
        },
      []
    );

    return (
      <div className={FORM_CLASSES.rankFields}>
        <Controller
          name="awardedRankFrom"
          control={control}
          render={({ field }) => (
            <div className="w-full space-y-2">
              <Label htmlFor="awardedRankFrom">
                {FORM_LABELS.awardedRankFrom}
              </Label>
              <Input
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                id="awardedRankFrom"
                type="number"
                min={RANK_MIN}
                max={RANK_MAX}
                step={1}
                placeholder={FORM_PLACEHOLDERS.awardedRankFrom}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ""
                }
                onChange={handleRankFromChange(field.onChange)}
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
            <div className="w-full space-y-2">
              <Label htmlFor="awardedRankTo">
                {FORM_LABELS.awardedRankTo}
              </Label>
              <Input
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                id="awardedRankTo"
                type="number"
                min={RANK_MIN}
                max={RANK_MAX}
                step={1}
                placeholder={FORM_PLACEHOLDERS.awardedRankTo}
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : ""
                }
                onChange={handleRankToChange(field.onChange)}
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
