"use client";

import { memo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbInput } from "@/components/ui/animated-input";
import { PublicSearchDropdown } from "./public-search-dropdown";
import type { PublicSearchResult } from "../hooks/use-public-search-results";

interface SearchPanelProps {
  isExpanded: boolean;
  searchValue: string;
  isSearchOpen: boolean;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchClose: () => void;
  onSearchSelect: (result: PublicSearchResult) => void;
}

export const SearchPanel = memo(function SearchPanel({
  isExpanded,
  searchValue,
  isSearchOpen,
  onSearchChange,
  onSearchFocus,
  onSearchClose,
  onSearchSelect,
}: SearchPanelProps) {
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const searchInputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && searchInputWrapperRef.current) {
      const input =
        searchInputWrapperRef.current.querySelector("input");
      if (input) {
        setTimeout(() => {
          input.focus();
        }, 150);
      }
    }
  }, [isExpanded]);

  return (
    <AnimatePresence mode="wait">
      {isExpanded && (
        <motion.div
          key="search-panel"
          initial={{ opacity: 0, y: -15, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -15, height: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ overflow: "hidden" }}
          className="sticky top-0 z-50 border-b border-border bg-background shadow-sm"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div
              ref={searchWrapperRef}
              className="relative mx-auto max-w-2xl"
            >
              <div ref={searchInputWrapperRef}>
                <OrbInput
                  value={searchValue}
                  onValueChange={onSearchChange}
                  onFocus={onSearchFocus}
                  placeholders={[
                    "Поиск программ...",
                    "Что ищете?",
                    "Введите запрос...",
                    "Найти программу обучения...",
                  ]}
                  aria-label="Поиск программ"
                  className="w-full"
                />
              </div>
              <PublicSearchDropdown
                query={searchValue}
                isOpen={isSearchOpen}
                onClose={onSearchClose}
                onSelect={onSearchSelect}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
