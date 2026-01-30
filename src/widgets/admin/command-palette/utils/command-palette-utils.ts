import type {
  Command,
  SearchResult,
} from "../types/command-palette.types";

export interface GroupedResults {
  categories: SearchResult[];
  programs: SearchResult[];
  commands: Command[];
}

/**
 * Группирует результаты поиска по типам
 */
export function groupSearchResults(
  items: (Command | SearchResult)[]
): GroupedResults {
  const grouped: GroupedResults = {
    categories: [],
    programs: [],
    commands: [],
  };

  items.forEach((item) => {
    if ("type" in item) {
      if (item.type === "category") {
        grouped.categories.push(item);
      } else if (item.type === "program") {
        grouped.programs.push(item);
      } else {
        grouped.commands.push(item as Command);
      }
    } else {
      grouped.commands.push(item);
    }
  });

  return grouped;
}

/**
 * Вычисляет смещения индексов для групп
 */
export function calculateGroupOffsets(groups: GroupedResults): {
  categories: number;
  programs: number;
  commands: number;
} {
  return {
    categories: 0,
    programs: groups.categories.length,
    commands: groups.categories.length + groups.programs.length,
  };
}
