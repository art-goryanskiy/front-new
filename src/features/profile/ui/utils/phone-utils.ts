const COUNTRY_CODE = "7";
const DIGITS_AFTER_CODE = 10;

/** Извлекает 10 цифр номера (после +7). */
export function stripPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  // 11 цифр и начинается с 7 → берём последние 10
  if (digits.length >= 11 && digits[0] === "7") {
    return digits.slice(1, 11);
  }
  // 10 цифр → как есть
  if (digits.length >= 10) {
    return digits.slice(0, 10);
  }
  return digits.slice(0, 10);
}

/** Форматирует телефон: +7 (978) 742-90-42. */
export function formatPhone(value: string): string {
  const digits = stripPhone(value);
  if (digits.length === 0) return "";
  const parts: string[] = [];
  let i = 0;
  if (i < digits.length) parts.push(digits.slice(i, (i += 3)));
  if (i < digits.length) parts.push(digits.slice(i, (i += 3)));
  if (i < digits.length) parts.push(digits.slice(i, (i += 2)));
  if (i < digits.length) parts.push(digits.slice(i, (i += 2)));
  if (parts.length === 1) return `+7 (${parts[0]}`;
  if (parts.length === 2) return `+7 (${parts[0]}) ${parts[1]}`;
  if (parts.length === 3) return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}`;
  return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}-${parts[3]}`;
}

/**
 * Обрабатывает ввод: при пустом поле — "+7 (", иначе форматирует по мере набора.
 * Не даёт удалить префикс "+7 (".
 */
export function formatPhoneInput(value: string): string {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 0) return "+7 (";
  let digits = digitsOnly;
  if (digits.length >= 11 && (digits[0] === "7" || digits[0] === "8")) {
    digits = digits.slice(1, 11);
  } else if (digits.length > 10) {
    digits = digits.slice(0, 10);
  }
  return formatPhone(digits);
}

/** Возвращает телефон для API: +7XXXXXXXXXX. */
export function toApiPhone(value: string): string {
  const digits = stripPhone(value);
  if (digits.length === 0) return "";
  return `+${COUNTRY_CODE}${digits}`;
}
