"use client";

import { memo } from "react";
import { InputMask } from "@react-input/mask";
import { Controller } from "react-hook-form";
import { FormField } from "@/shared/ui/form-field/form-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PROFILE_FORM_LABELS,
  PROFILE_FORM_PLACEHOLDERS,
  PROFILE_FORM_CLASSES,
} from "../constants/profile-form-constants";
import type { ProfileFormData } from "../types/profile-form.types";
import type { Control, FieldPath } from "react-hook-form";
import { ProfileFieldPreview } from "../components/profile-field-preview";
import {
  formatProfileDate,
  formatProfileValue,
} from "../utils/profile-preview-utils";
import { cn } from "@/lib/utils";

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
            placeholder={PROFILE_FORM_PLACEHOLDERS.firstName}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("lastName")}
            label={PROFILE_FORM_LABELS.lastName}
            placeholder={PROFILE_FORM_PLACEHOLDERS.lastName}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("middleName")}
            label={PROFILE_FORM_LABELS.middleName}
            placeholder={PROFILE_FORM_PLACEHOLDERS.middleName}
            type="text"
          />
          <Controller
            control={control}
            name={fieldName("phone")}
            render={({ field }) => (
              <div className="space-y-2 w-full">
                <div className="group relative pt-2">
                  <Label
                    htmlFor="phone"
                    className={cn(
                      "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors text-muted-foreground group-focus-within:text-foreground"
                    )}
                  >
                    {PROFILE_FORM_LABELS.phone}
                  </Label>
                  <InputMask
                    component={Input}
                    mask="+7 (___) ___-__-__"
                    replacement={{ _: /\d/ }}
                    showMask
                    ref={field.ref}
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={PROFILE_FORM_PLACEHOLDERS.phone}
                    lang="ru"
                    aria-label={PROFILE_FORM_LABELS.phone}
                    className="peer bg-background/60"
                    value={
                      typeof field.value === "string" ? field.value : ""
                    }
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </div>
              </div>
            )}
          />
          <FormField
            control={control}
            name={fieldName("dateOfBirth")}
            label={PROFILE_FORM_LABELS.dateOfBirth}
            placeholder={PROFILE_FORM_PLACEHOLDERS.dateOfBirth}
            type="date"
          />
          <FormField
            control={control}
            name={fieldName("citizenship")}
            label={PROFILE_FORM_LABELS.citizenship}
            placeholder={PROFILE_FORM_PLACEHOLDERS.citizenship}
            type="text"
          />
        </div>
      </div>
    );
  }
);
