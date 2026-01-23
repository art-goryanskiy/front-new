import type { UpdateMyProfileInput } from "@/shared/api/generated/graphql";
import type { ProfileFormData } from "../types/profile-form.types";

export function createProfileInput(
  data: ProfileFormData
): Partial<UpdateMyProfileInput> {
  const profile: Partial<UpdateMyProfileInput> = {};

  if (data.firstName?.trim()) {
    profile.firstName = data.firstName.trim();
  }
  if (data.lastName?.trim()) {
    profile.lastName = data.lastName.trim();
  }
  if (data.middleName?.trim()) {
    profile.middleName = data.middleName.trim();
  }
  if (data.phone?.trim()) {
    profile.phone = data.phone.trim();
  }
  if (data.dateOfBirth) {
    profile.dateOfBirth = data.dateOfBirth;
  }
  if (data.citizenship?.trim()) {
    profile.citizenship = data.citizenship.trim();
  }
  if (data.position?.trim()) {
    profile.position = data.position.trim();
  }
  if (data.snils?.trim()) {
    profile.snils = data.snils.trim();
  }
  if (data.passportRegistrationAddress?.trim()) {
    profile.passportRegistrationAddress =
      data.passportRegistrationAddress.trim();
  }
  if (data.residentialAddress?.trim()) {
    profile.residentialAddress = data.residentialAddress.trim();
  }
  if (data.workPlaceId?.trim()) {
    profile.workPlaceId = data.workPlaceId.trim();
  }
  if (data.avatar?.trim()) {
    profile.avatar = data.avatar.trim();
  }

  // Паспорт
  if (
    data.passportSeries?.trim() ||
    data.passportNumber?.trim() ||
    data.passportIssuedBy?.trim() ||
    data.passportIssuedAt ||
    data.passportDepartmentCode?.trim()
  ) {
    profile.passport = {};
    if (data.passportSeries?.trim()) {
      profile.passport.series = data.passportSeries.trim();
    }
    if (data.passportNumber?.trim()) {
      profile.passport.number = data.passportNumber.trim();
    }
    if (data.passportIssuedBy?.trim()) {
      profile.passport.issuedBy = data.passportIssuedBy.trim();
    }
    if (data.passportIssuedAt) {
      profile.passport.issuedAt = data.passportIssuedAt;
    }
    if (data.passportDepartmentCode?.trim()) {
      profile.passport.departmentCode =
        data.passportDepartmentCode.trim();
    }
  }

  // Образование
  if (
    data.educationQualification?.trim() ||
    data.educationDocumentIssuedAt
  ) {
    profile.education = {};
    if (data.educationQualification?.trim()) {
      profile.education.qualification =
        data.educationQualification.trim();
    }
    if (data.educationDocumentIssuedAt) {
      profile.education.documentIssuedAt =
        data.educationDocumentIssuedAt;
    }
  }

  return profile;
}

export function getProfileDefaultValues(
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
  } | null
): ProfileFormData {
  return {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    middleName: profile?.middleName || "",
    phone: profile?.phone || "",
    dateOfBirth: profile?.dateOfBirth || "",
    citizenship: profile?.citizenship || "",
    position: profile?.position || "",
    snils: profile?.snils || "",
    passportRegistrationAddress:
      profile?.passportRegistrationAddress || "",
    residentialAddress: profile?.residentialAddress || "",
    workPlaceId: profile?.workPlaceId || "",
    avatar: profile?.avatar || "",
    passportSeries: profile?.passport?.series || "",
    passportNumber: profile?.passport?.number || "",
    passportIssuedBy: profile?.passport?.issuedBy || "",
    passportIssuedAt: profile?.passport?.issuedAt || "",
    passportDepartmentCode: profile?.passport?.departmentCode || "",
    educationQualification: profile?.education?.qualification || "",
    educationDocumentIssuedAt:
      profile?.education?.documentIssuedAt || "",
  };
}
