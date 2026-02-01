/** Расширенные данные слушателя (ФИО, контакты, паспорт, образование, адреса, работа) */
export interface LearnerFormData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  citizenship: string;
  passportSeries: string;
  passportNumber: string;
  passportIssuedBy: string;
  passportIssuedAt: string;
  passportDepartmentCode: string;
  snils: string;
  educationQualification: string;
  educationDocumentIssuedAt: string;
  passportRegistrationAddress: string;
  residentialAddress: string;
  sameAsRegistration: boolean;
  workPlaceName: string;
  position: string;
}

export const defaultLearnerFormData = (): LearnerFormData => ({
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  citizenship: "",
  passportSeries: "",
  passportNumber: "",
  passportIssuedBy: "",
  passportIssuedAt: "",
  passportDepartmentCode: "",
  snils: "",
  educationQualification: "",
  educationDocumentIssuedAt: "",
  passportRegistrationAddress: "",
  residentialAddress: "",
  sameAsRegistration: true,
  workPlaceName: "",
  position: "",
});
