import { Folder } from "lucide-react";
import type { ReactElement } from "react";

/**
 * CSS классы для таблицы категорий
 */
export const TABLE_CLASSES = {
  wrapper: "min-h-[400px]",
  base: "table-fixed w-full",
  th: "bg-gradient-to-r from-default-100 to-default-50 text-default-700 font-bold text-xs uppercase tracking-wider px-3 sm:px-4",
  td: "py-3 sm:py-4 lg:py-5 px-3 sm:px-4",
  tr: "hover:bg-default-50/50 transition-colors",
} as const;

/**
 * Иконка для пустого состояния
 */
export const EMPTY_STATE_ICON: ReactElement = (
  <Folder className="w-10 h-10 text-default-400" aria-hidden="true" />
);
