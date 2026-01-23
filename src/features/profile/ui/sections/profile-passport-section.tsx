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

interface ProfilePassportSectionProps<T extends ProfileFormData> {
  control: Control<T>;
}

export const ProfilePassportSection = memo(
  function ProfilePassportSection<
    T extends ProfileFormData = ProfileFormData,
  >({ control }: ProfilePassportSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>Паспорт</h3>
        <div className="space-y-4">
          <FormField
            control={control}
            name={fieldName("passportSeries")}
            label={PROFILE_FORM_LABELS.passportSeries}
            placeholder={PROFILE_FORM_PLACEHOLDERS.passportSeries}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("passportNumber")}
            label={PROFILE_FORM_LABELS.passportNumber}
            placeholder={PROFILE_FORM_PLACEHOLDERS.passportNumber}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("passportIssuedBy")}
            label={PROFILE_FORM_LABELS.passportIssuedBy}
            placeholder={PROFILE_FORM_PLACEHOLDERS.passportIssuedBy}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("passportIssuedAt")}
            label={PROFILE_FORM_LABELS.passportIssuedAt}
            placeholder={PROFILE_FORM_PLACEHOLDERS.passportIssuedAt}
            type="date"
          />
          <FormField
            control={control}
            name={fieldName("passportDepartmentCode")}
            label={PROFILE_FORM_LABELS.passportDepartmentCode}
            placeholder={
              PROFILE_FORM_PLACEHOLDERS.passportDepartmentCode
            }
            type="text"
          />
        </div>
      </div>
    );
  }
);
