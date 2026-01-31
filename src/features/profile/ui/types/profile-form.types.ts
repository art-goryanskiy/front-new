import type { Control } from "react-hook-form";

export interface WorkPlaceOrganizationData {
  id?: string;
  type?: "LEGAL" | "INDIVIDUAL" | string;
  displayName?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  legalAddress?: string;
}

export interface WorkPlaceFormData {
  organizationId?: string; // required for update; filter invalid before submit
  organization?: WorkPlaceOrganizationData | null;
  position?: string;
  isPrimary?: boolean; // default false when undefined
}

export interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone?: string;
  dateOfBirth?: string;
  citizenship?: string;
  snils?: string;
  passportRegistrationAddress?: string;
  residentialAddress?: string;
  workPlaces?: WorkPlaceFormData[];
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
