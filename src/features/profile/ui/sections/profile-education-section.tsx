"use client";

import { memo } from "react";
import { FormField } from "@/shared/ui/form-field/form-field";
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

interface ProfileEducationSectionProps<T extends ProfileFormData> {
  control: Control<T>;
  mode?: "view" | "edit";
  values?: ProfileFormData;
}

export const ProfileEducationSection = memo(
  function ProfileEducationSection<
    T extends ProfileFormData = ProfileFormData,
  >({
    control,
    mode = "edit",
    values,
  }: ProfileEducationSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    if (mode === "view") {
      const qualification = formatProfileValue(
        values?.educationQualification
      );
      const issuedAt = formatProfileDate(
        values?.educationDocumentIssuedAt
      );

      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Образование
          </h3>
          <div className={PROFILE_FORM_CLASSES.fieldGrid}>
            <ProfileFieldPreview
              className="md:col-span-2"
              label={PROFILE_FORM_LABELS.educationQualification}
              value={qualification}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.educationDocumentIssuedAt}
              value={issuedAt}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Образование
        </h3>
        <div className={PROFILE_FORM_CLASSES.fieldGrid}>
          <FormField
            control={control}
            name={fieldName("educationQualification")}
            label={PROFILE_FORM_LABELS.educationQualification}
            type="text"
            className="md:col-span-2"
          />
          <FormField
            control={control}
            name={fieldName("educationDocumentIssuedAt")}
            label={PROFILE_FORM_LABELS.educationDocumentIssuedAt}
            type="date"
          />
        </div>
      </div>
    );
  }
);
