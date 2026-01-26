export const PROFILE_FORM_LABELS = {
  firstName: "Имя",
  lastName: "Фамилия",
  middleName: "Отчество",
  phone: "Телефон",
  dateOfBirth: "Дата рождения",
  citizenship: "Гражданство",
  position: "Должность",
  snils: "СНИЛС",
  passportRegistrationAddress: "Адрес регистрации по паспорту",
  residentialAddress: "Адрес проживания",
  workPlaceId: "ID места работы",
  avatar: "Аватар (URL)",
  // Паспорт
  passportSeries: "Серия паспорта",
  passportNumber: "Номер паспорта",
  passportIssuedBy: "Кем выдан",
  passportIssuedAt: "Дата выдачи",
  passportDepartmentCode: "Код подразделения",
  // Образование
  educationQualification: "Квалификация",
  educationDocumentIssuedAt: "Дата выдачи документа об образовании",
} as const;

export const PROFILE_FORM_PLACEHOLDERS = {
  firstName: "Введите имя",
  lastName: "Введите фамилию",
  middleName: "Введите отчество",
  phone: "Введите телефон",
  dateOfBirth: "Выберите дату рождения",
  citizenship: "Введите гражданство",
  position: "Введите должность",
  snils: "Введите СНИЛС",
  passportRegistrationAddress: "Введите адрес регистрации",
  residentialAddress: "Введите адрес проживания",
  workPlaceId: "Введите ID места работы",
  avatar: "Введите URL аватара",
  passportSeries: "Введите серию паспорта",
  passportNumber: "Введите номер паспорта",
  passportIssuedBy: "Введите кем выдан паспорт",
  passportIssuedAt: "Выберите дату выдачи",
  passportDepartmentCode: "Введите код подразделения",
  educationQualification: "Введите квалификацию",
  educationDocumentIssuedAt: "Выберите дату выдачи документа",
} as const;

export const PROFILE_FORM_CLASSES = {
  section:
    "space-y-4 p-5 bg-muted/50 rounded-xl border border-border w-full",
  sectionTitle:
    "text-sm font-semibold text-foreground uppercase tracking-wide mb-2",
  fieldGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
} as const;
