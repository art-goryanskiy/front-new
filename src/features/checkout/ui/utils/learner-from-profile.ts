import type { LearnerFormData } from "../types/learner-form-data.types";
import { getProfileDefaultValues } from "@/features/profile/ui/utils/profile-form-utils";
import { defaultLearnerFormData } from "../types/learner-form-data.types";

type ProfileInput = Parameters<typeof getProfileDefaultValues>[0];

/**
 * Заполняет расширенные данные слушателя из профиля пользователя (для «обучаюсь я»).
 */
export function learnerFromProfile(
  profile: ProfileInput,
  email?: string
): LearnerFormData {
  const p = getProfileDefaultValues(profile);
  const primaryWork =
    p.workPlaces?.find((wp) => wp.isPrimary) ?? p.workPlaces?.[0];
  const workPlaceName = primaryWork?.organization?.displayName ?? "";
  const position = primaryWork?.position ?? "";

  const registration = p.passportRegistrationAddress ?? "";
  const residential = p.residentialAddress ?? "";
  const sameAsRegistration = !residential || residential === registration;

  return {
    ...defaultLearnerFormData(),
    lastName: p.lastName ?? "",
    firstName: p.firstName ?? "",
    middleName: p.middleName ?? "",
    email: email ?? "",
    phone: p.phone ?? "",
    dateOfBirth: p.dateOfBirth ?? "",
    citizenship: p.citizenship ?? "",
    passportSeries: p.passportSeries ?? "",
    passportNumber: p.passportNumber ?? "",
    passportIssuedBy: p.passportIssuedBy ?? "",
    passportIssuedAt: p.passportIssuedAt ?? "",
    passportDepartmentCode: p.passportDepartmentCode ?? "",
    snils: p.snils ?? "",
    educationQualification: p.educationQualification ?? "",
    educationDocumentIssuedAt: p.educationDocumentIssuedAt ?? "",
    passportRegistrationAddress: registration,
    residentialAddress: sameAsRegistration ? registration : residential,
    sameAsRegistration,
    workPlaceName,
    position,
  };
}
