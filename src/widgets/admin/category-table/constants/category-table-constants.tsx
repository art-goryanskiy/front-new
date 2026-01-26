import { Folder } from "lucide-react";
import type { ReactElement } from "react";

/**
 * CSS классы для таблицы категорий
 */
export const TABLE_CLASSES = {
  wrapper: "min-h-[400px]",
  base: "table-fixed w-full",
  th: "bg-muted/50 text-muted-foreground font-bold text-xs uppercase tracking-wider px-3 sm:px-4",
  td: "py-3 sm:py-4 lg:py-5 px-3 sm:px-4",
  tr: "hover:bg-muted/50 transition-colors",
} as const;

/**
 * Иконка для пустого состояния
 */
export const EMPTY_STATE_ICON: ReactElement = (
  <Folder className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
);
