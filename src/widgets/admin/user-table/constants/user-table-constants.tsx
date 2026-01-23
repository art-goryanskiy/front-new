import { Users } from "lucide-react";
import type { ReactElement } from "react";

/**
 * CSS классы для таблицы пользователей
 */
export const TABLE_CLASSES = {
  wrapper: "min-h-[400px] overflow-hidden",
  th: "bg-gradient-to-r from-default-100 to-default-50 text-default-700 font-bold text-xs uppercase tracking-wider",
  td: "py-5",
  tr: "hover:bg-default-50/50 transition-colors cursor-pointer",
} as const;

/**
 * Иконка для пустого состояния
 */
export const EMPTY_STATE_ICON: ReactElement = (
  <Users className="h-10 w-10 text-default-400" aria-hidden="true" />
);
