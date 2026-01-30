import type { Control } from "react-hook-form";

export interface ProfileEmploymentOrganizationData {
  type?: "LEGAL" | "INDIVIDUAL" | string;
  displayName?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  legalAddress?: string;
}

export interface ProfileEmploymentData {
  id?: string;
  organizationId?: string;
  position?: string;
  isPrimary?: boolean;
  organization?: ProfileEmploymentOrganizationData | null;
}

export interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  dateOfBirth?: string;
  citizenship?: string;
  position?: string;
  snils?: string;
  passportRegistrationAddress?: string;
  residentialAddress?: string;
  workPlaceId?: string;
  employments?: ProfileEmploymentData[] | null;
  avatar?: string;
  // Паспорт
  passportSeries?: string;
  passportNumber?: string;
  passportIssuedBy?: string;
  passportIssuedAt?: string;
  passportDepartmentCode?: string;
  // Образование
  educationQualification?: string;
  educationDocumentIssuedAt?: string;
}

export interface ProfileFormProps<
  T extends ProfileFormData = ProfileFormData,
> {
  control: Control<T>;
  className?: string;
}
