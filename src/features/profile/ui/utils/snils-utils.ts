const SNILS_LENGTH = 11;

/** Оставляет только цифры, не более 11. */
export function stripSnils(value: string): string {
  return value.replace(/\D/g, "").slice(0, SNILS_LENGTH);
}

/** Форматирует ввод/отображение: 000-000-000 00 (до 11 цифр). */
export function formatSnils(value: string): string {
  const digits = stripSnils(value);
  if (digits.length === 0) return "";
  const parts: string[] = [];
  let i = 0;
  if (i < digits.length) parts.push(digits.slice(i, (i += 3)));
  if (i < digits.length) parts.push(digits.slice(i, (i += 3)));
  if (i < digits.length) parts.push(digits.slice(i, (i += 3)));
  if (i < digits.length) parts.push(digits.slice(i, (i += 2)));
  if (parts.length <= 3) return parts.join("-");
  return `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3] ?? ""}`.trim();
}

/** Проверяет, что значение — ровно 11 цифр (после strip). */
export function isSnilsLengthValid(value: string): boolean {
  const digits = stripSnils(value);
  return digits.length === SNILS_LENGTH;
}

/**
 * Проверка контрольного числа СНИЛС (первые 9 цифр × 9,8,7,6,5,4,3,2,1;
 * сумма < 100 → контроль = сумма; 100/101 → 00; > 101 → остаток % 101, 100 → 00).
 */
function getSnilsControlDigits(digits: string): string {
  if (digits.length < 9) return "";
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]!, 10) * (9 - i);
  }
  if (sum < 100) return sum.toString().padStart(2, "0");
  if (sum === 100 || sum === 101) return "00";
  const remainder = sum % 101;
  return remainder === 100 ? "00" : remainder.toString().padStart(2, "0");
}

/** Проверяет, что СНИЛС из 11 цифр и контрольная сумма совпадает. */
export function isSnilsValid(value: string): boolean {
  const digits = stripSnils(value);
  if (digits.length !== SNILS_LENGTH) return false;
  const expectedControl = getSnilsControlDigits(digits);
  const actualControl = digits.slice(9, 11);
  return expectedControl === actualControl;
}
