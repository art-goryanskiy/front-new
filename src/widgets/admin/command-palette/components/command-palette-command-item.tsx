"use client";

import { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCommandIcon } from "../constants/command-palette-constants";
import {
  COMMAND_PALETTE_CLASSES,
  COMMAND_PALETTE_ANIMATIONS,
} from "../constants/command-palette-constants";
import { highlightMatch } from "../utils/highlight-utils";
import type { Command, SearchResult } from "../types/command-palette.types";

interface CommandPaletteCommandItemProps {
  command: Command | SearchResult;
  isSelected: boolean;
  onSelect: (command: Command | SearchResult) => void;
  searchQuery?: string;
}

export const CommandPaletteCommandItem = memo(
  function CommandPaletteCommandItem({
    command,
    isSelected,
    onSelect,
    searchQuery = "",
  }: CommandPaletteCommandItemProps) {
    const router = useRouter();
    const IconComponent = getCommandIcon(command.icon);

    const handleClick = useCallback(() => {
      router.push(command.path);
      onSelect(command);
    }, [command, onSelect, router]);

    // Мемоизируем подсветку для оптимизации
    const highlightedLabel = useMemo(
      () =>
        searchQuery
          ? highlightMatch(command.label, searchQuery)
          : command.label,
      [command.label, searchQuery]
    );

    // Получаем description заранее для правильных зависимостей
    const description =
      "description" in command ? command.description : undefined;
    const parentCategoryName =
      "parentCategoryName" in command ? command.parentCategoryName : undefined;
    const commandType = "type" in command ? command.type : undefined;

    const highlightedDescription = useMemo(() => {
      if (!description) return null;
      return searchQuery
        ? highlightMatch(description, searchQuery)
        : description;
    }, [description, searchQuery]);

    // Формируем текст категории
    const categoryText = useMemo(() => {
      if (commandType) {
        if (commandType === "category" && parentCategoryName) {
          return `Категория: ${parentCategoryName}`;
        }
        if (commandType === "program" && parentCategoryName) {
          return `Категория: ${parentCategoryName}`;
        }
        return commandType === "category" ? "Категория" : "Программа";
      }
      return undefined;
    }, [commandType, parentCategoryName]);

    return (
      <motion.button
        {...COMMAND_PALETTE_ANIMATIONS.commandItem}
        onClick={handleClick}
        className={`${COMMAND_PALETTE_CLASSES.commandItem} ${
          isSelected
            ? COMMAND_PALETTE_CLASSES.commandItemSelected
            : COMMAND_PALETTE_CLASSES.commandItemDefault
        }`}
        aria-selected={isSelected}
      >
        <div className={COMMAND_PALETTE_CLASSES.commandItemContent}>
          <div className={COMMAND_PALETTE_CLASSES.commandIcon}>
            {IconComponent}
          </div>
          <div className="flex-1 min-w-0">
            <div className={COMMAND_PALETTE_CLASSES.commandLabel}>
              {highlightedLabel}
            </div>
            {categoryText && (
              <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {categoryText}
              </div>
            )}
            {highlightedDescription && (
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {highlightedDescription}
              </div>
            )}
          </div>
        </div>
      </motion.button>
    );
  }
);
