import type { LearnerFormData } from "../types/learner-form-data.types";

const REQUIRED_MESSAGE = "Обязательное поле";

export type LearnerFieldErrors = Partial<Record<keyof LearnerFormData, string>>;

function required(value: string | undefined): string | undefined {
  if (value == null || String(value).trim() === "") return REQUIRED_MESSAGE;
  return undefined;
}

/**
 * Валидирует данные слушателя. Все поля считаются обязательными.
 * residentialAddress обязателен, если не отмечено «Совпадает с адресом регистрации».
 */
export function validateLearner(data: LearnerFormData): LearnerFieldErrors {
  const errors: LearnerFieldErrors = {};

  const lastNameErr = required(data.lastName);
  if (lastNameErr) errors.lastName = lastNameErr;

  const firstNameErr = required(data.firstName);
  if (firstNameErr) errors.firstName = firstNameErr;

  const middleNameErr = required(data.middleName);
  if (middleNameErr) errors.middleName = middleNameErr;

  const emailErr = required(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = required(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  const dateOfBirthErr = required(data.dateOfBirth);
  if (dateOfBirthErr) errors.dateOfBirth = dateOfBirthErr;

  const citizenshipErr = required(data.citizenship);
  if (citizenshipErr) errors.citizenship = citizenshipErr;

  const passportSeriesErr = required(data.passportSeries);
  if (passportSeriesErr) errors.passportSeries = passportSeriesErr;

  const passportNumberErr = required(data.passportNumber);
  if (passportNumberErr) errors.passportNumber = passportNumberErr;

  const passportIssuedByErr = required(data.passportIssuedBy);
  if (passportIssuedByErr) errors.passportIssuedBy = passportIssuedByErr;

  const passportIssuedAtErr = required(data.passportIssuedAt);
  if (passportIssuedAtErr) errors.passportIssuedAt = passportIssuedAtErr;

  const passportDepartmentCodeErr = required(data.passportDepartmentCode);
  if (passportDepartmentCodeErr)
    errors.passportDepartmentCode = passportDepartmentCodeErr;

  const snilsErr = required(data.snils);
  if (snilsErr) errors.snils = snilsErr;

  const educationQualificationErr = required(data.educationQualification);
  if (educationQualificationErr)
    errors.educationQualification = educationQualificationErr;

  const educationDocumentIssuedAtErr = required(
    data.educationDocumentIssuedAt
  );
  if (educationDocumentIssuedAtErr)
    errors.educationDocumentIssuedAt = educationDocumentIssuedAtErr;

  const passportRegistrationAddressErr = required(
    data.passportRegistrationAddress
  );
  if (passportRegistrationAddressErr)
    errors.passportRegistrationAddress = passportRegistrationAddressErr;

  if (!data.sameAsRegistration) {
    const residentialAddressErr = required(data.residentialAddress);
    if (residentialAddressErr) errors.residentialAddress = residentialAddressErr;
  }

  const workPlaceNameErr = required(data.workPlaceName);
  if (workPlaceNameErr) errors.workPlaceName = workPlaceNameErr;

  const positionErr = required(data.position);
  if (positionErr) errors.position = positionErr;

  return errors;
}
