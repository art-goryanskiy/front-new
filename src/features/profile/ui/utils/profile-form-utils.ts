import type { UpdateMyProfileInput } from "@/shared/api/generated/graphql";
import type {
  ProfileFormData,
  WorkPlaceFormData,
} from "../types/profile-form.types";
import {
  stripPassportNumber,
  stripPassportSeries,
  formatPassportNumber,
  formatPassportSeries,
  stripPassportDepartmentCode,
  formatPassportDepartmentCode,
} from "./passport-utils";
import { formatPhone, toApiPhone } from "./phone-utils";
import { formatSnils, stripSnils } from "./snils-utils";

/** Преобразует ISO дату (2014-04-04T00:00:00.000Z) в формат YYYY-MM-DD для input[type="date"]. */
export function toDateInputValue(
  isoDate: string | null | undefined
): string {
  if (!isoDate) return "";
  // Берём первые 10 символов: YYYY-MM-DD
  const dateOnly = isoDate.slice(0, 10);
  // Проверяем валидность формата
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly;
  }
  return "";
}

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
  const phoneApi = data.phone ? toApiPhone(data.phone) : "";
  if (phoneApi) {
    profile.phone = phoneApi;
  }
  if (data.dateOfBirth) {
    profile.dateOfBirth = data.dateOfBirth;
  }
  if (data.citizenship?.trim()) {
    profile.citizenship = data.citizenship.trim();
  }
  const snilsCleaned = data.snils ? stripSnils(data.snils) : "";
  if (snilsCleaned.length === 11) {
    profile.snils = snilsCleaned.slice(0, 11);
  }
  if (data.passportRegistrationAddress?.trim()) {
    profile.passportRegistrationAddress =
      data.passportRegistrationAddress.trim();
  }
  if (data.residentialAddress?.trim()) {
    profile.residentialAddress = data.residentialAddress.trim();
  }
  if (Array.isArray(data.workPlaces) && data.workPlaces.length > 0) {
    (profile as Record<string, unknown>).workPlaces = data.workPlaces
      .filter(
        (
          wp: WorkPlaceFormData
        ): wp is WorkPlaceFormData & { organizationId: string } =>
          Boolean(wp.organizationId?.trim())
      )
      .map((wp) => ({
        organizationId: wp.organizationId.trim(),
        position: wp.position?.trim() || undefined,
        isPrimary: Boolean(wp.isPrimary),
      }));
  }
  if (data.avatar?.trim()) {
    profile.avatar = data.avatar.trim();
  }

  // Паспорт
  const passportSeriesCleaned = data.passportSeries
    ? stripPassportSeries(data.passportSeries)
    : "";
  const passportNumberCleaned = data.passportNumber
    ? stripPassportNumber(data.passportNumber)
    : "";
  const passportDepartmentCodeCleaned = data.passportDepartmentCode
    ? stripPassportDepartmentCode(data.passportDepartmentCode)
    : "";
  if (
    passportSeriesCleaned ||
    passportNumberCleaned ||
    data.passportIssuedBy?.trim() ||
    data.passportIssuedAt ||
    passportDepartmentCodeCleaned
  ) {
    profile.passport = {};
    if (passportSeriesCleaned) {
      profile.passport.series = passportSeriesCleaned;
    }
    if (passportNumberCleaned) {
      profile.passport.number = passportNumberCleaned;
    }
    if (data.passportIssuedBy?.trim()) {
      profile.passport.issuedBy = data.passportIssuedBy.trim();
    }
    if (data.passportIssuedAt) {
      profile.passport.issuedAt = data.passportIssuedAt;
    }
    if (passportDepartmentCodeCleaned) {
      profile.passport.departmentCode = passportDepartmentCodeCleaned;
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
    snils?: string | null;
    passportRegistrationAddress?: string | null;
    residentialAddress?: string | null;
    workPlaces?: Array<{
      organizationId?: string | null;
      position?: string | null;
      isPrimary?: boolean | null;
      organization?: {
        id?: string | null;
        type?: string | null;
        displayName?: string | null;
        inn?: string | null;
        kpp?: string | null;
        ogrn?: string | null;
        legalAddress?: string | null;
      } | null;
    }> | null;
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
    phone: profile?.phone ? formatPhone(profile.phone) : "",
    dateOfBirth: toDateInputValue(profile?.dateOfBirth),
    citizenship: profile?.citizenship || "",
    snils: formatSnils(profile?.snils ?? ""),
    passportRegistrationAddress:
      profile?.passportRegistrationAddress || "",
    residentialAddress: profile?.residentialAddress || "",
    workPlaces:
      profile?.workPlaces?.map((wp) => {
        const orgId: string =
          wp.organizationId || wp.organization?.id || "";
        return {
          organizationId: orgId,
          position: wp.position || undefined,
          isPrimary: Boolean(wp.isPrimary),
          organization: wp.organization
            ? {
                id: wp.organization.id || orgId || undefined,
                type: wp.organization.type || undefined,
                displayName: wp.organization.displayName || undefined,
                inn: wp.organization.inn || undefined,
                kpp: wp.organization.kpp || undefined,
                ogrn: wp.organization.ogrn || undefined,
                legalAddress:
                  wp.organization.legalAddress || undefined,
              }
            : null,
        };
      }) ?? [],
    avatar: profile?.avatar || "",
    passportSeries: formatPassportSeries(
      profile?.passport?.series ?? ""
    ),
    passportNumber: formatPassportNumber(
      profile?.passport?.number ?? ""
    ),
    passportIssuedBy: profile?.passport?.issuedBy || "",
    passportIssuedAt: toDateInputValue(profile?.passport?.issuedAt),
    passportDepartmentCode: formatPassportDepartmentCode(
      profile?.passport?.departmentCode ?? ""
    ),
    educationQualification: profile?.education?.qualification || "",
    educationDocumentIssuedAt: toDateInputValue(
      profile?.education?.documentIssuedAt
    ),
  };
}
