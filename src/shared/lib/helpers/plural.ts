/**
 * Склонение слова «программа» по правилам русского языка.
 * 1, 21, 31... → программа; 2, 3, 4, 22, 23, 24... → программы; 0, 5–20, 25–30... → программ.
 */
export function pluralPrograms(n: number): "программа" | "программы" | "программ" {
  const num = Math.floor(Number(n));
  const mod10 = num % 10;
  const mod100 = num % 100;
  if (mod10 === 1 && mod100 !== 11) return "программа";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "программы";
  return "программ";
}

/**
 * Форматирует количество программ для подписи: «5 программ», «1 программа», «— программ» при отсутствии числа.
 */
export function formatProgramsCount(count: number | null | undefined): string {
  if (count === null || count === undefined) return "— программ";
  const n = Math.floor(Number(count));
  return `${n} ${pluralPrograms(n)}`;
}

/**
 * Склонение слова «слушатель» для заказов.
 * 1, 21, 31... → слушатель; 2, 3, 4, 22... → слушателя; 0, 5–20... → слушателей.
 */
export function pluralLearners(n: number): "слушатель" | "слушателя" | "слушателей" {
  const num = Math.floor(Number(n));
  const mod10 = num % 10;
  const mod100 = num % 100;
  if (mod10 === 1 && mod100 !== 11) return "слушатель";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "слушателя";
  return "слушателей";
}

/**
 * Форматирует количество слушателей: «3 слушателя», «1 слушатель» и т.д.
 */
export function formatLearnersCount(n: number): string {
  const num = Math.floor(Number(n));
  return `${num} ${pluralLearners(num)}`;
}
