"use client";

import { useSearchState } from "@/shared/store/search-store";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import {
  COMMANDS,
  COMMAND_PALETTE_ANIMATIONS,
  COMMAND_PALETTE_CLASSES,
} from "../constants/command-palette-constants";
import { useCommandPaletteFilter } from "../hooks/use-command-palette-filter";
import { useCommandPaletteNavigation } from "../hooks/use-command-palette-navigation";
import { useSearchResults } from "../hooks/use-search-results";
import type {
  Command,
  SearchResult,
} from "../types/command-palette.types";
import {
  calculateGroupOffsets,
  groupSearchResults,
} from "../utils/command-palette-utils";
import { CommandPaletteEmptyState } from "./command-palette-empty-state";
import { CommandPaletteLoadingState } from "./command-palette-loading-state";
import { CommandPaletteResultsCount } from "./command-palette-results-count";
import { CommandPaletteResultsGroup } from "./command-palette-results-group";
import { CommandPaletteSearchInput } from "./command-palette-search-input";

interface CommandPaletteContentProps {
  closeCommandPalette: () => void;
}

export const CommandPaletteContent = memo(
  function CommandPaletteContent({
    closeCommandPalette,
  }: CommandPaletteContentProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const { searchQuery, setSearchQuery } = useSearchState();

    const query = useMemo(
      () => searchQuery || search,
      [searchQuery, search]
    );

    const {
      results: searchResults,
      loading,
      handleSelect: handleSearchSelect,
    } = useSearchResults(query);
    const filteredCommands = useCommandPaletteFilter(COMMANDS, query);

    const allItemsFlat = useMemo(() => {
      const items: (Command | SearchResult)[] = [];

      if (query.length > 0) {
        items.push(...searchResults);
        if (searchResults.length === 0 && !loading) {
          items.push(...filteredCommands);
        }
      } else {
        items.push(...filteredCommands);
      }

      return items;
    }, [query, searchResults, filteredCommands, loading]);

    const groupedResults = useMemo(
      () => groupSearchResults(allItemsFlat),
      [allItemsFlat]
    );

    const offsets = useMemo(
      () => calculateGroupOffsets(groupedResults),
      [groupedResults]
    );

    const hasResults = useMemo(
      () =>
        groupedResults.categories.length > 0 ||
        groupedResults.programs.length > 0 ||
        groupedResults.commands.length > 0,
      [groupedResults]
    );

    const totalResults = useMemo(
      () => allItemsFlat.length,
      [allItemsFlat.length]
    );

    const handleSelect = useCallback(
      (item: Command | SearchResult) => {
        if ("type" in item && item.type !== "command") {
          handleSearchSelect(item);
        } else {
          router.push(item.path);
        }
        closeCommandPalette();
      },
      [handleSearchSelect, router, closeCommandPalette]
    );

    const { selectedIndex, handleSelect: handleNavigationSelect } =
      useCommandPaletteNavigation({
        filteredCommands: allItemsFlat,
        onSelect: handleSelect,
        onClose: closeCommandPalette,
      });

    const handleSearchChange = useCallback(
      (value: string) => {
        setSearch(value);
        setSearchQuery(value);
      },
      [setSearchQuery]
    );

    return (
      <>
        <motion.div
          {...COMMAND_PALETTE_ANIMATIONS.overlay}
          onClick={closeCommandPalette}
          className={COMMAND_PALETTE_CLASSES.overlay}
          aria-label="Закрыть палитру команд"
        />
        <div className={COMMAND_PALETTE_CLASSES.container}>
          <motion.div
            {...COMMAND_PALETTE_ANIMATIONS.modal}
            className={COMMAND_PALETTE_CLASSES.modal}
          >
            <div className={COMMAND_PALETTE_CLASSES.modalContent}>
              <div className={COMMAND_PALETTE_CLASSES.header}>
                <CommandPaletteSearchInput
                  value={query}
                  onValueChange={handleSearchChange}
                />
              </div>
              {!loading && hasResults && (
                <CommandPaletteResultsCount
                  total={totalResults}
                  categories={groupedResults.categories.length}
                  programs={groupedResults.programs.length}
                  commands={groupedResults.commands.length}
                />
              )}
              <div className={COMMAND_PALETTE_CLASSES.commandsList}>
                {loading ? (
                  <CommandPaletteLoadingState />
                ) : !hasResults ? (
                  <CommandPaletteEmptyState />
                ) : (
                  <>
                    {groupedResults.categories.length > 0 && (
                      <CommandPaletteResultsGroup
                        title="Категории"
                        items={groupedResults.categories}
                        selectedIndex={selectedIndex}
                        globalIndexOffset={offsets.categories}
                        onSelect={handleNavigationSelect}
                        searchQuery={query}
                      />
                    )}
                    {groupedResults.programs.length > 0 && (
                      <CommandPaletteResultsGroup
                        title="Программы"
                        items={groupedResults.programs}
                        selectedIndex={selectedIndex}
                        globalIndexOffset={offsets.programs}
                        onSelect={handleNavigationSelect}
                        searchQuery={query}
                      />
                    )}
                    {groupedResults.commands.length > 0 && (
                      <CommandPaletteResultsGroup
                        title="Команды"
                        items={groupedResults.commands}
                        selectedIndex={selectedIndex}
                        globalIndexOffset={offsets.commands}
                        onSelect={handleNavigationSelect}
                        searchQuery={query}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }
);
