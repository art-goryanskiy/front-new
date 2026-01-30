import type { ReactElement } from "react";
import type { Command } from "../types/command-palette.types";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Home,
  Folder,
} from "lucide-react";
import { Icon } from "@/shared/ui/icons/icon";
import type { IconName } from "@/shared/ui/icons/icon";

/**
 * Команды для палитры команд
 */
export const COMMANDS: ReadonlyArray<Command> = [
  {
    id: "dashboard",
    label: "Главная панель",
    path: "/admin",
    icon: "home",
  },
  {
    id: "qualification",
    label: "Повышение квалификации",
    path: "/admin/qualification-upgrade",
    icon: "book",
  },
  {
    id: "retraining",
    label: "Профессиональная переподготовка",
    path: "/admin/professional-retraining",
    icon: "graduation-cap",
  },
  {
    id: "education",
    label: "Профессиональное обучение",
    path: "/admin/professional-education",
    icon: "briefcase",
  },
] as const;

/**
 * Маппинг иконок для команд (legacy, используется для обратной совместимости)
 */
export const COMMAND_ICONS: Record<string, ReactElement> = {
  home: <Home className="h-5 w-5" />,
  book: <BookOpen className="h-5 w-5" />,
  "graduation-cap": <GraduationCap className="h-5 w-5" />,
  briefcase: <Briefcase className="h-5 w-5" />,
  folder: <Folder className="h-5 w-5" />,
};

/**
 * Получить иконку по имени
 */
export function getCommandIcon(iconName: string): ReactElement {
  // Проверяем, есть ли иконка в legacy маппинге
  if (COMMAND_ICONS[iconName]) {
    return COMMAND_ICONS[iconName];
  }

  // Используем компонент Icon для остальных случаев
  return (
    <Icon name={iconName as IconName} className="h-5 w-5" size={20} />
  );
}

/**
 * Тексты для палитры команд
 */
export const COMMAND_PALETTE_TEXTS = {
  searchPlaceholder: "Поиск команд...",
  noCommandsFound: "Команды не найдены",
  escKey: "ESC",
} as const;

/**
 * CSS классы для палитры команд
 */
export const COMMAND_PALETTE_CLASSES = {
  overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
  container:
    "fixed inset-0 flex items-start justify-center pt-[20vh] z-50 pointer-events-none",
  modal: "w-full max-w-2xl mx-4 pointer-events-auto",
  modalContent:
    "bg-background/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden",
  header: "p-4 border-b border-border",
  commandsList: "max-h-96 overflow-y-auto p-2",
  resultsCount:
    "px-4 py-2 text-xs text-muted-foreground border-b border-border",
  emptyState: "text-center py-8 text-muted-foreground",
  commandItem: "w-full text-left px-4 py-3 rounded-lg transition-all",
  commandItemSelected:
    "bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100",
  commandItemDefault: "hover:bg-muted text-foreground",
  commandItemContent: "flex items-center gap-3",
  commandIcon: "text-2xl",
  commandLabel: "font-medium",
  escBadge:
    "px-2 py-1 text-xs font-semibold text-muted-foreground bg-muted rounded border border-border",
} as const;

/**
 * Анимации для палитры команд
 */
export const COMMAND_PALETTE_ANIMATIONS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.95, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  },
  commandItem: {
    whileHover: { x: 4 },
  },
} as const;
