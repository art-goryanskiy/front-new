"use client";

import { memo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInputField } from "./search-input-field";
import { PublicSearchDropdown } from "./public-search-dropdown";
import type { PublicSearchResult } from "../hooks/use-public-search-results";
import type { UserEntity } from "@/shared/api/generated/graphql";

interface SearchPanelProps {
  isExpanded: boolean;
  searchValue: string;
  isSearchOpen: boolean;
  user: UserEntity | null;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchClose: () => void;
  onSearchPanelClose: () => void;
  onSearchSelect: (result: PublicSearchResult) => void;
}

export const SearchPanel = memo(function SearchPanel({
  isExpanded,
  searchValue,
  isSearchOpen,
  user,
  onSearchChange,
  onSearchFocus,
  onSearchClose,
  onSearchPanelClose,
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
          className="sticky top-0 z-50 border-b border-border bg-background shadow-sm"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div
              ref={searchWrapperRef}
              className="relative mx-auto max-w-2xl"
            >
              <div className="flex items-center gap-2">
                <div ref={searchInputWrapperRef} className="min-w-0 flex-1">
                  <SearchInputField
                    value={searchValue}
                    onChange={onSearchChange}
                    onFocus={onSearchFocus}
                    placeholder="Поиск программ и категорий..."
                    aria-label="Поиск"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onSearchPanelClose}
                  aria-label="Закрыть поиск"
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <PublicSearchDropdown
                query={searchValue}
                isOpen={isSearchOpen}
                user={user}
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
