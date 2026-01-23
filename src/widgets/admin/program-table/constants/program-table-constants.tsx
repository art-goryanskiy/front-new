// src/widgets/admin/program-table/constants/program-table-constants.tsx
import { BookOpen } from "lucide-react";
import type { ReactElement } from "react";

/**
 * CSS классы для таблицы программ
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
  <BookOpen className="w-10 h-10 text-default-400" aria-hidden="true" />
);

/**
 * Порог просмотров для показа бейджа популярности
 */
export const POPULAR_VIEWS_THRESHOLD = 100;
