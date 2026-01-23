import type {
  AdminCreateUserInput,
  AdminUpdateUserInput,
  UserRole,
} from "@/shared/api/generated/graphql";
import type { UserFormData } from "../types/user-form.types";
import { createProfileInput } from "@/features/profile/ui/utils/profile-form-utils";

export function createUserInput(
  data: UserFormData
): AdminCreateUserInput {
  const profile = createProfileInput(data);

  return {
    email: data.email.trim(),
    password: data.password || "",
    ...(Object.keys(profile).length > 0 && { profile }),
    ...(data.role && { role: data.role }),
    ...(data.isBlocked !== undefined && {
      isBlocked: data.isBlocked,
    }),
  };
}

export function updateUserInput(
  data: UserFormData
): AdminUpdateUserInput {
  const input: AdminUpdateUserInput = {};

  if (data.email?.trim()) {
    input.email = data.email.trim();
  }

  if (data.password?.trim()) {
    input.password = data.password.trim();
  }

  const profile = createProfileInput(data);

  if (Object.keys(profile).length > 0) {
    input.profile = profile;
  }

  if (data.isBlocked !== undefined) {
    input.isBlocked = data.isBlocked;
  }

  return input;
}

export function getDefaultValues(
  editingUser?: {
    email?: string;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    role?: UserRole;
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
  } | null
): UserFormData {
  return {
    email: editingUser?.email || "",
    password: "",
    firstName:
      editingUser?.firstName || editingUser?.profile?.firstName || "",
    lastName:
      editingUser?.lastName || editingUser?.profile?.lastName || "",
    middleName: editingUser?.profile?.middleName || "",
    phone: editingUser?.phone || editingUser?.profile?.phone || "",
    role: editingUser?.role,
    isBlocked: editingUser?.isBlocked || false,
    dateOfBirth: editingUser?.profile?.dateOfBirth || "",
    citizenship: editingUser?.profile?.citizenship || "",
    position: editingUser?.profile?.position || "",
    snils: editingUser?.profile?.snils || "",
    passportRegistrationAddress:
      editingUser?.profile?.passportRegistrationAddress || "",
    residentialAddress:
      editingUser?.profile?.residentialAddress || "",
    workPlaceId: editingUser?.profile?.workPlaceId || "",
    avatar: editingUser?.profile?.avatar || "",
    passportSeries: editingUser?.profile?.passport?.series || "",
    passportNumber: editingUser?.profile?.passport?.number || "",
    passportIssuedBy: editingUser?.profile?.passport?.issuedBy || "",
    passportIssuedAt: editingUser?.profile?.passport?.issuedAt || "",
    passportDepartmentCode:
      editingUser?.profile?.passport?.departmentCode || "",
    educationQualification:
      editingUser?.profile?.education?.qualification || "",
    educationDocumentIssuedAt:
      editingUser?.profile?.education?.documentIssuedAt || "",
  };
}
