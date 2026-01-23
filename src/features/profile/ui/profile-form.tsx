"use client";

import { memo } from "react";
import type {
  ProfileFormProps,
  ProfileFormData,
} from "./types/profile-form.types";
import { ProfileBasicInfoSection } from "./sections/profile-basic-info-section";
import { ProfileAdditionalInfoSection } from "./sections/profile-additional-info-section";
import { ProfileAddressesSection } from "./sections/profile-addresses-section";
import { ProfilePassportSection } from "./sections/profile-passport-section";
import { ProfileEducationSection } from "./sections/profile-education-section";
import type { Control } from "react-hook-form";

export const ProfileForm = memo(function ProfileForm<
  T extends ProfileFormData = ProfileFormData,
>({ control, className }: ProfileFormProps<T>) {
  const typedControl = control as unknown as Control<ProfileFormData>;

  return (
    <div className={className}>
      <ProfileBasicInfoSection control={typedControl} />
      <ProfileAdditionalInfoSection control={typedControl} />
      <ProfileAddressesSection control={typedControl} />
      <ProfilePassportSection control={typedControl} />
      <ProfileEducationSection control={typedControl} />
    </div>
  );
});
