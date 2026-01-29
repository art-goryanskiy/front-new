"use client";

import { highlightMatch } from "@/shared/ui/highlight/highlight-match";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import {
  COMMAND_PALETTE_ANIMATIONS,
  COMMAND_PALETTE_CLASSES,
  getCommandIcon,
} from "../constants/command-palette-constants";
import type {
  Command,
  SearchResult,
} from "../types/command-palette.types";

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
      "parentCategoryName" in command
        ? command.parentCategoryName
        : undefined;
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
          <div className="min-w-0 flex-1">
            <div className={COMMAND_PALETTE_CLASSES.commandLabel}>
              {highlightedLabel}
            </div>
            {categoryText && (
              <div className="mt-0.5 text-xs text-muted-foreground">
                {categoryText}
              </div>
            )}
            {highlightedDescription && (
              <div className="mt-0.5 truncate text-xs text-muted-foreground">
                {highlightedDescription}
              </div>
            )}
          </div>
        </div>
      </motion.button>
    );
  }
);
