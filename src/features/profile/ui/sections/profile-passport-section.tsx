"use client";

import { memo } from "react";
import { Controller } from "react-hook-form";
import { FormField } from "@/shared/ui/form-field/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PROFILE_FORM_LABELS,
  PROFILE_FORM_CLASSES,
} from "../constants/profile-form-constants";
import type { ProfileFormData } from "../types/profile-form.types";
import type { Control, FieldPath } from "react-hook-form";
import { ProfileFieldPreview } from "../components/profile-field-preview";
import {
  formatProfileDate,
  formatProfileValue,
} from "../utils/profile-preview-utils";
import {
  formatPassportDepartmentCode,
  formatPassportNumber,
  formatPassportSeries,
} from "../utils/passport-utils";
import {
  formatSnils,
  isSnilsLengthValid,
  isSnilsValid,
} from "../utils/snils-utils";
import { cn } from "@/lib/utils";

interface ProfilePassportSectionProps<T extends ProfileFormData> {
  control: Control<T>;
  mode?: "view" | "edit";
  values?: ProfileFormData;
}

export const ProfilePassportSection = memo(
  function ProfilePassportSection<
    T extends ProfileFormData = ProfileFormData,
  >({
    control,
    mode = "edit",
    values,
  }: ProfilePassportSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    if (mode === "view") {
      const snils = formatProfileValue(values?.snils);
      const passportSeries = formatProfileValue(
        values?.passportSeries
      );
      const passportNumber = formatProfileValue(
        values?.passportNumber
      );
      const passportIssuedBy = formatProfileValue(
        values?.passportIssuedBy
      );
      const passportIssuedAt = formatProfileDate(
        values?.passportIssuedAt
      );
      const passportDepartmentCode = formatProfileValue(
        values?.passportDepartmentCode
      );

      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Личные данные
          </h3>
          <div className={PROFILE_FORM_CLASSES.fieldGrid}>
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.snils}
              value={snils}
            />
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <ProfileFieldPreview
                label={PROFILE_FORM_LABELS.passportSeries}
                value={passportSeries}
              />
              <ProfileFieldPreview
                label={PROFILE_FORM_LABELS.passportNumber}
                value={passportNumber}
              />
            </div>
            <ProfileFieldPreview
              className="md:col-span-2"
              label={PROFILE_FORM_LABELS.passportIssuedBy}
              value={passportIssuedBy}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.passportIssuedAt}
              value={passportIssuedAt}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.passportDepartmentCode}
              value={passportDepartmentCode}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Личные данные
        </h3>
        <div className={PROFILE_FORM_CLASSES.fieldGrid}>
          <Controller
            control={control}
            name={fieldName("snils")}
            rules={{
              validate: (v: unknown) => {
                if (!v || typeof v !== "string") return true;
                if (!isSnilsLengthValid(v)) return "СНИЛС должен содержать 11 цифр";
                if (!isSnilsValid(v)) return "Неверная контрольная сумма СНИЛС";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <div className="space-y-2 w-full">
                <div className="group relative pt-2">
                  <Label
                    htmlFor="snils"
                    className={cn(
                      "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                      fieldState.invalid
                        ? "text-destructive"
                        : "text-muted-foreground group-focus-within:text-foreground"
                    )}
                  >
                    {PROFILE_FORM_LABELS.snils}
                  </Label>
                  <Input
                    {...field}
                    id="snils"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder=" "
                    lang="ru"
                    aria-invalid={fieldState.invalid}
                    aria-label={PROFILE_FORM_LABELS.snils}
                    className="peer bg-background/60"
                    value={typeof field.value === "string" ? field.value : ""}
                    onChange={(e) => {
                      const formatted = formatSnils(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </div>
                {fieldState.error?.message && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <Controller
              control={control}
              name={fieldName("passportSeries")}
              render={({ field }) => (
                <div className="space-y-2 w-full">
                  <div className="group relative pt-2">
                    <Label
                      htmlFor="passportSeries"
                      className="absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors text-muted-foreground group-focus-within:text-foreground"
                    >
                      {PROFILE_FORM_LABELS.passportSeries}
                    </Label>
                    <Input
                      {...field}
                      id="passportSeries"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder=" "
                      lang="ru"
                      aria-label={PROFILE_FORM_LABELS.passportSeries}
                      className="peer bg-background/60"
                      value={
                        typeof field.value === "string" ? field.value : ""
                      }
                      onChange={(e) => {
                        field.onChange(
                          formatPassportSeries(e.target.value)
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            />
            <Controller
              control={control}
              name={fieldName("passportNumber")}
              render={({ field }) => (
                <div className="space-y-2 w-full">
                  <div className="group relative pt-2">
                    <Label
                      htmlFor="passportNumber"
                      className="absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors text-muted-foreground group-focus-within:text-foreground"
                    >
                      {PROFILE_FORM_LABELS.passportNumber}
                    </Label>
                    <Input
                      {...field}
                      id="passportNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder=" "
                      lang="ru"
                      aria-label={PROFILE_FORM_LABELS.passportNumber}
                      className="peer bg-background/60"
                      value={
                        typeof field.value === "string" ? field.value : ""
                      }
                      onChange={(e) => {
                        field.onChange(
                          formatPassportNumber(e.target.value)
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            />
          </div>
          <FormField
            control={control}
            name={fieldName("passportIssuedBy")}
            label={PROFILE_FORM_LABELS.passportIssuedBy}
            type="text"
            className="md:col-span-2"
          />
          <FormField
            control={control}
            name={fieldName("passportIssuedAt")}
            label={PROFILE_FORM_LABELS.passportIssuedAt}
            type="date"
          />
          <Controller
            control={control}
            name={fieldName("passportDepartmentCode")}
            render={({ field }) => (
              <div className="space-y-2 w-full">
                <div className="group relative pt-2">
                  <Label
                    htmlFor="passportDepartmentCode"
                    className="absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors text-muted-foreground group-focus-within:text-foreground"
                  >
                    {PROFILE_FORM_LABELS.passportDepartmentCode}
                  </Label>
                  <Input
                    {...field}
                    id="passportDepartmentCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder=" "
                    lang="ru"
                    aria-label={PROFILE_FORM_LABELS.passportDepartmentCode}
                    className="peer bg-background/60"
                    value={
                      typeof field.value === "string" ? field.value : ""
                    }
                    onChange={(e) => {
                      field.onChange(
                        formatPassportDepartmentCode(e.target.value)
                      );
                    }}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
);
