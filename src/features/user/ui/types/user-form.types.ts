import type { UserRole } from "@/shared/api/generated/graphql";
import type { ProfileFormData } from "@/features/profile/ui/types/profile-form.types";

export interface UserFormData extends ProfileFormData {
  email: string;
  password?: string;
  role?: UserRole;
  isBlocked?: boolean;
}

export interface EditingUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role: UserRole;
  isBlocked?: boolean;
  profile?: {
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    dateOfBirth?: string | null;
    citizenship?: string | null;
    phone?: string | null;
    position?: string | null;
    snils?: string | null;
    passportRegistrationAddress?: string | null;
    residentialAddress?: string | null;
    workPlaceId?: string | null;
    avatar?: string | null;
    passport?: {
      series?: string | null;
      number?: string | null;
      issuedBy?: string | null;
      issuedAt?: string | null;
      departmentCode?: string | null;
    } | null;
    education?: {
      qualification?: string | null;
      documentIssuedAt?: string | null;
    } | null;
  } | null;
}

export interface UserFormProps {
  editingUser?: EditingUser | null;
}
