"use client";

import { memo } from "react";
import { FormField } from "@/shared/ui/form-field/form-field";
import {
  PROFILE_FORM_LABELS,
  PROFILE_FORM_PLACEHOLDERS,
  PROFILE_FORM_CLASSES,
} from "../constants/profile-form-constants";
import type { ProfileFormData } from "../types/profile-form.types";
import type { Control, FieldPath } from "react-hook-form";

interface ProfileBasicInfoSectionProps<T extends ProfileFormData> {
  control: Control<T>;
}

export const ProfileBasicInfoSection = memo(
  function ProfileBasicInfoSection<
    T extends ProfileFormData = ProfileFormData,
  >({ control }: ProfileBasicInfoSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Основная информация
        </h3>
        <div className="space-y-4">
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
          <FormField
            control={control}
            name={fieldName("phone")}
            label={PROFILE_FORM_LABELS.phone}
            placeholder={PROFILE_FORM_PLACEHOLDERS.phone}
            type="tel"
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
