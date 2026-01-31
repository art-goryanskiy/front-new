const SERIES_LENGTH = 4;
const NUMBER_LENGTH = 6;

/** Оставляет только цифры серии, не более 4. */
export function stripPassportSeries(value: string): string {
  return value.replace(/\D/g, "").slice(0, SERIES_LENGTH);
}

/** Форматирует серию: 00 00 (2 цифры пробел 2 цифры). */
export function formatPassportSeries(value: string): string {
  const digits = stripPassportSeries(value);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} ${digits.slice(2, 4)}`;
}

/** Оставляет только цифры номера, не более 6. */
export function stripPassportNumber(value: string): string {
  return value.replace(/\D/g, "").slice(0, NUMBER_LENGTH);
}

/** Форматирует номер: 000000 (6 цифр подряд). */
export function formatPassportNumber(value: string): string {
  return stripPassportNumber(value);
}

const DEPARTMENT_CODE_LENGTH = 6;

/** Оставляет только цифры кода подразделения, не более 6. */
export function stripPassportDepartmentCode(value: string): string {
  return value.replace(/\D/g, "").slice(0, DEPARTMENT_CODE_LENGTH);
}

/** Форматирует код подразделения: 000-000 (3 цифры дефис 3 цифры). */
export function formatPassportDepartmentCode(value: string): string {
  const digits = stripPassportDepartmentCode(value);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}`;
}
