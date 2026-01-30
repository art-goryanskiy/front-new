import type { ProgramEntity } from "@/shared/api/generated/graphql";

/**
 * Вычисляет общее количество просмотров всех программ
 */
export function calculateTotalViews(
  programs: ProgramEntity[]
): number {
  return programs.reduce(
    (sum, program) => sum + (program.views || 0),
    0
  );
}

/**
 * Форматирует число для отображения (с разделителями тысяч)
 */
export function formatStatValue(value: number): string {
  return value.toLocaleString("ru-RU");
}

/**
 * Форматирует значение тренда
 */
export function formatTrendValue(value: number): string {
  return Math.abs(value).toString();
}
