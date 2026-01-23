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

interface ProfileAddressesSectionProps<T extends ProfileFormData> {
  control: Control<T>;
}

export const ProfileAddressesSection = memo(
  function ProfileAddressesSection<
    T extends ProfileFormData = ProfileFormData,
  >({ control }: ProfileAddressesSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>Адреса</h3>
        <div className="space-y-4">
          <FormField
            control={control}
            name={fieldName("passportRegistrationAddress")}
            label={PROFILE_FORM_LABELS.passportRegistrationAddress}
            placeholder={
              PROFILE_FORM_PLACEHOLDERS.passportRegistrationAddress
            }
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("residentialAddress")}
            label={PROFILE_FORM_LABELS.residentialAddress}
            placeholder={PROFILE_FORM_PLACEHOLDERS.residentialAddress}
            type="text"
          />
        </div>
      </div>
    );
  }
);
