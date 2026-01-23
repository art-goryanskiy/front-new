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

interface ProfileAdditionalInfoSectionProps<
  T extends ProfileFormData,
> {
  control: Control<T>;
}

export const ProfileAdditionalInfoSection = memo(
  function ProfileAdditionalInfoSection<
    T extends ProfileFormData = ProfileFormData,
  >({ control }: ProfileAdditionalInfoSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Дополнительная информация
        </h3>
        <div className="space-y-4">
          <FormField
            control={control}
            name={fieldName("position")}
            label={PROFILE_FORM_LABELS.position}
            placeholder={PROFILE_FORM_PLACEHOLDERS.position}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("snils")}
            label={PROFILE_FORM_LABELS.snils}
            placeholder={PROFILE_FORM_PLACEHOLDERS.snils}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("workPlaceId")}
            label={PROFILE_FORM_LABELS.workPlaceId}
            placeholder={PROFILE_FORM_PLACEHOLDERS.workPlaceId}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("avatar")}
            label={PROFILE_FORM_LABELS.avatar}
            placeholder={PROFILE_FORM_PLACEHOLDERS.avatar}
            type="url"
          />
        </div>
      </div>
    );
  }
);
