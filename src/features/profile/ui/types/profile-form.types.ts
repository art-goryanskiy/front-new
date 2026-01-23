import type { Control } from "react-hook-form";

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
