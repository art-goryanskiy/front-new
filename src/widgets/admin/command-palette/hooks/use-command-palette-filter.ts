import { useMemo } from "react";
import type { Command } from "../types/command-palette.types";

/**
 * Хук для фильтрации команд по поисковому запросу
 */
export function useCommandPaletteFilter(
  commands: ReadonlyArray<Command>,
  searchQuery: string
) {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return commands;
    }

    const query = searchQuery.toLowerCase();
    return commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(query)
    );
  }, [commands, searchQuery]);
}
