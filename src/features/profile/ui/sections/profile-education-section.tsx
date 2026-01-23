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

interface ProfileEducationSectionProps<T extends ProfileFormData> {
  control: Control<T>;
}

export const ProfileEducationSection = memo(
  function ProfileEducationSection<
    T extends ProfileFormData = ProfileFormData,
  >({ control }: ProfileEducationSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Образование
        </h3>
        <div className="space-y-4">
          <FormField
            control={control}
            name={fieldName("educationQualification")}
            label={PROFILE_FORM_LABELS.educationQualification}
            placeholder={
              PROFILE_FORM_PLACEHOLDERS.educationQualification
            }
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("educationDocumentIssuedAt")}
            label={PROFILE_FORM_LABELS.educationDocumentIssuedAt}
            placeholder={
              PROFILE_FORM_PLACEHOLDERS.educationDocumentIssuedAt
            }
            type="date"
          />
        </div>
      </div>
    );
  }
);
