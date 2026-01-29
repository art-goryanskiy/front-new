"use client";

import { highlightMatch } from "@/shared/ui/highlight/highlight-match";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Folder, Loader2 } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import type { PublicSearchResult } from "../hooks/use-public-search-results";
import { usePublicSearchResults } from "../hooks/use-public-search-results";

interface PublicSearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: PublicSearchResult) => void;
}

export const PublicSearchDropdown = memo(
  function PublicSearchDropdown({
    query,
    isOpen,
    onClose,
    onSelect,
  }: PublicSearchDropdownProps) {
    const { results, loading } = usePublicSearchResults(query);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закрываем при клике вне dropdown
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);

    const handleResultClick = useCallback(
      (result: PublicSearchResult) => {
        onSelect(result);
        onClose();
      },
      [onSelect, onClose]
    );

    const hasResults = results.length > 0;
    const showDropdown = isOpen && query.length > 0;

    // Группируем результаты
    const groupedResults = useMemo(() => {
      const categories = results.filter((r) => r.type === "category");
      const programs = results.filter((r) => r.type === "program");
      return { categories, programs };
    }, [results]);

    if (!showDropdown) return null;

    return (
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-border bg-background shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2 p-4 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Поиск...</span>
              </div>
            ) : !hasResults ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Ничего не найдено
              </div>
            ) : (
              <div className="py-2">
                {groupedResults.categories.length > 0 && (
                  <div className="px-4 py-2">
                    <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Категории
                    </div>
                    <div className="space-y-1">
                      {groupedResults.categories.map((result) => (
                        <SearchResultItem
                          key={result.id}
                          result={result}
                          query={query}
                          onClick={handleResultClick}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {groupedResults.programs.length > 0 && (
                  <div className="px-4 py-2">
                    <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Программы
                    </div>
                    <div className="space-y-1">
                      {groupedResults.programs.map((result) => (
                        <SearchResultItem
                          key={result.id}
                          result={result}
                          query={query}
                          onClick={handleResultClick}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

interface SearchResultItemProps {
  result: PublicSearchResult;
  query: string;
  onClick: (result: PublicSearchResult) => void;
}

const SearchResultItem = memo(function SearchResultItem({
  result,
  query,
  onClick,
}: SearchResultItemProps) {
  // Мемоизируем компонент иконки
  const IconComponent = useMemo(
    () => (result.icon === "folder" ? Folder : BookOpen),
    [result.icon]
  );

  const highlightedLabel = useMemo(
    () =>
      query ? highlightMatch(result.label, query) : result.label,
    [result.label, query]
  );

  const highlightedDescription = useMemo(() => {
    if (!result.description) return null;
    return query
      ? highlightMatch(result.description, query)
      : result.description;
  }, [result.description, query]);

  const handleClick = useCallback(() => {
    onClick(result);
  }, [onClick, result]);

  // Формируем текст категории
  const categoryText = useMemo(() => {
    if (result.type === "category" && result.parentCategoryName) {
      return `Категория: ${result.parentCategoryName}`;
    }
    if (result.type === "program" && result.parentCategoryName) {
      return `Категория: ${result.parentCategoryName}`;
    }
    return result.type === "category" ? "Категория" : "Программа";
  }, [result.type, result.parentCategoryName]);

  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={handleClick}
      className="w-full rounded-lg px-4 py-3 text-left text-foreground transition-all hover:bg-muted"
    >
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground">
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-medium">{highlightedLabel}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {categoryText}
          </div>
          {highlightedDescription && (
            <div className="mt-0.5 truncate text-xs text-muted-foreground">
              {highlightedDescription}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
});
