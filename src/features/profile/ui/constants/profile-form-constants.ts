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
  workPlaces: "Места работы",
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
  phone: "+7 (978) 742-90-42",
  dateOfBirth: "Выберите дату рождения",
  citizenship: "Введите гражданство",
  position: "Введите должность",
  snils: "000-000-000 00",
  passportRegistrationAddress: "Введите адрес регистрации",
  residentialAddress: "Введите адрес проживания",
  workPlaces: "Добавьте места работы по ИНН или вручную",
  avatar: "Введите URL аватара",
  passportSeries: "00 00",
  passportNumber: "000000",
  passportIssuedBy: "Введите кем выдан паспорт",
  passportIssuedAt: "Выберите дату выдачи",
  passportDepartmentCode: "000-000",
  educationQualification: "Введите квалификацию",
  educationDocumentIssuedAt: "Выберите дату выдачи документа",
} as const;

export const PROFILE_FORM_CLASSES = {
  section:
    "relative w-full space-y-4 sm:space-y-6 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-sm shadow-black/5 backdrop-blur-sm transition-shadow hover:shadow-md sm:p-6",
  sectionTitle:
    "text-sm font-semibold text-foreground tracking-tight pb-1 sm:text-base",
  fieldGrid:
    "grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2",
} as const;
