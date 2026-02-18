"use client";

import { memo, useState } from "react";
import { InputMask, format } from "@react-input/mask";
import { Controller } from "react-hook-form";
import { FormField } from "@/shared/ui/form-field/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
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
import { stripPhone } from "../utils/phone-utils";

const PHONE_MASK_OPTIONS = {
  mask: "+7 (___) ___-__-__",
  replacement: { _: /\d/ } as const,
};

interface ProfileBasicInfoSectionProps<T extends ProfileFormData> {
  control: Control<T>;
  mode?: "view" | "edit";
  values?: ProfileFormData;
}

export const ProfileBasicInfoSection = memo(
  function ProfileBasicInfoSection<
    T extends ProfileFormData = ProfileFormData,
  >({
    control,
    mode = "edit",
    values,
  }: ProfileBasicInfoSectionProps<T>) {
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    if (mode === "view") {
      const firstName = formatProfileValue(values?.firstName);
      const lastName = formatProfileValue(values?.lastName);
      const middleName = formatProfileValue(values?.middleName);
      const phone = formatProfileValue(values?.phone);
      const dateOfBirth = formatProfileDate(values?.dateOfBirth);
      const citizenship = formatProfileValue(values?.citizenship);

      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Основная информация
          </h3>
          <div className={PROFILE_FORM_CLASSES.fieldGrid}>
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.firstName}
              value={firstName}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.lastName}
              value={lastName}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.middleName}
              value={middleName}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.phone}
              value={phone}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.dateOfBirth}
              value={dateOfBirth}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.citizenship}
              value={citizenship}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Основная информация
        </h3>
        <div className={PROFILE_FORM_CLASSES.fieldGrid}>
          <FormField
            control={control}
            name={fieldName("firstName")}
            label={PROFILE_FORM_LABELS.firstName}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("lastName")}
            label={PROFILE_FORM_LABELS.lastName}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("middleName")}
            label={PROFILE_FORM_LABELS.middleName}
            type="text"
          />
          <Controller
            control={control}
            name={fieldName("phone")}
            render={({ field, fieldState }) => {
              const rawValue =
                typeof field.value === "string" && field.value
                  ? field.value.includes("(")
                    ? field.value
                    : format(
                        stripPhone(field.value),
                        PHONE_MASK_OPTIONS
                      )
                  : "";
              const hasPhoneValue =
                stripPhone(String(rawValue)).length >= 10;
              const floated = hasPhoneValue || isPhoneFocused;
              return (
                <div className="w-full space-y-2">
                  <div className="group relative pt-2">
                    <Label
                      htmlFor="phone"
                      className={cn(
                        "absolute left-3 z-10 rounded-md bg-background/80 px-1 font-medium backdrop-blur-sm transition-all duration-200",
                        floated
                          ? "top-2 -translate-y-1/2 text-[11px]"
                          : "top-1/2 -translate-y-1/2 text-sm",
                        fieldState.invalid
                          ? "text-destructive"
                          : "text-muted-foreground group-focus-within:text-foreground"
                      )}
                    >
                      {PROFILE_FORM_LABELS.phone}
                    </Label>
                    <InputMask
                      component={Input}
                      mask={PHONE_MASK_OPTIONS.mask}
                      replacement={PHONE_MASK_OPTIONS.replacement}
                      showMask
                      ref={field.ref}
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder=" "
                      lang="ru"
                      aria-label={PROFILE_FORM_LABELS.phone}
                      aria-invalid={fieldState.invalid}
                      className="h-12 min-h-11 rounded-xl border-border/60 bg-background/60 px-4 text-base transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-sm"
                      value={rawValue}
                      onChange={field.onChange}
                      onBlur={() => {
                        field.onBlur();
                        setIsPhoneFocused(false);
                      }}
                      onFocus={() => {
                        setIsPhoneFocused(true);
                      }}
                    />
                  </div>
                  {fieldState.error?.message && (
                    <p className="text-sm text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
          <FormField
            control={control}
            name={fieldName("dateOfBirth")}
            label={PROFILE_FORM_LABELS.dateOfBirth}
            type="date"
          />
          <FormField
            control={control}
            name={fieldName("citizenship")}
            label={PROFILE_FORM_LABELS.citizenship}
            type="text"
          />
        </div>
      </div>
    );
  }
);
