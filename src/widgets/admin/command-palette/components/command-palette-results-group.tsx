"use client";

import { memo } from "react";
import { CommandPaletteCommandItem } from "./command-palette-command-item";
import type { Command, SearchResult } from "../types/command-palette.types";

interface CommandPaletteResultsGroupProps {
  title: string;
  items: (Command | SearchResult)[];
  selectedIndex: number;
  globalIndexOffset: number;
  onSelect: (item: Command | SearchResult) => void;
  searchQuery?: string;
}

export const CommandPaletteResultsGroup = memo(
  function CommandPaletteResultsGroup({
    title,
    items,
    selectedIndex,
    globalIndexOffset,
    onSelect,
    searchQuery = "",
  }: CommandPaletteResultsGroupProps) {
    if (items.length === 0) return null;

    return (
      <div className="py-2">
        <div className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </div>
        <div className="space-y-1">
          {items.map((item, index) => {
            const globalIndex = globalIndexOffset + index;
            return (
              <CommandPaletteCommandItem
                key={item.id}
                command={item}
                isSelected={globalIndex === selectedIndex}
                onSelect={onSelect}
                searchQuery={searchQuery}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
