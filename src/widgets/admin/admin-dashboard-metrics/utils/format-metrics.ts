/** Форматирует сумму в рублях с пробелами между разрядами */
export function formatRevenue(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
