"use client";

import { memo } from "react";
import type { Control } from "react-hook-form";
import type { UserFormData } from "../types/user-form.types";
import type { ProfileFormData } from "@/features/profile/ui/types/profile-form.types";
import { ProfileForm } from "@/features/profile/ui/profile-form";

interface UserFormProfileTabProps {
  control: Control<UserFormData>;
}

export const UserFormProfileTab = memo(function UserFormProfileTab({
  control,
}: UserFormProfileTabProps) {
  // Приведение типа необходимо, так как UserFormData расширяет ProfileFormData,
  // но TypeScript не может автоматически связать generic типы
  const typedControl = control as unknown as Control<ProfileFormData>;

  return (
    <div className="w-full py-4">
      <ProfileForm control={typedControl} className="w-full" />
    </div>
  );
});
