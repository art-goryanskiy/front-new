import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type {
  Command,
  SearchResult,
} from "../types/command-palette.types";

type CommandPaletteItem = Command | SearchResult;

interface UseCommandPaletteNavigationOptions {
  filteredCommands: ReadonlyArray<CommandPaletteItem>;
  onSelect: (item: CommandPaletteItem) => void;
  onClose: () => void;
}

/**
 * Хук для навигации по командам с клавиатуры
 */
export function useCommandPaletteNavigation({
  filteredCommands,
  onSelect,
  onClose,
}: UseCommandPaletteNavigationOptions) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Вычисляем скорректированный индекс на основе длины списка
  const correctedIndex = useMemo(() => {
    if (selectedIndex >= filteredCommands.length) {
      return Math.max(0, filteredCommands.length - 1);
    }
    return selectedIndex;
  }, [selectedIndex, filteredCommands.length]);

  // Обновляем индекс если он был скорректирован
  useEffect(() => {
    if (correctedIndex !== selectedIndex) {
      queueMicrotask(() => {
        setSelectedIndex(correctedIndex);
      });
    }
  }, [correctedIndex, selectedIndex]);

  // Обработка навигации с клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredCommands.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[correctedIndex]) {
          onSelect(filteredCommands[correctedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctedIndex, filteredCommands, onSelect, onClose]);

  const handleSelect = useCallback(
    (item: CommandPaletteItem) => {
      router.push(item.path);
      onSelect(item);
    },
    [router, onSelect]
  );

  return {
    selectedIndex: correctedIndex,
    handleSelect,
  };
}
