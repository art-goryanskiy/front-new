import type { IndividualApplicantData } from "../types/individual-applicant.types";
import { getProfileDefaultValues } from "@/features/profile/ui/utils/profile-form-utils";

type ProfileInput = Parameters<typeof getProfileDefaultValues>[0];

/**
 * Заполняет данные заказчика (только ФИО + контакты) из профиля пользователя.
 */
export function individualApplicantFromProfile(
  profile: ProfileInput,
  email?: string
): IndividualApplicantData {
  const p = getProfileDefaultValues(profile);
  return {
    lastName: p.lastName ?? "",
    firstName: p.firstName ?? "",
    middleName: p.middleName ?? "",
    email: email ?? "",
    phone: p.phone ?? "",
  };
}
