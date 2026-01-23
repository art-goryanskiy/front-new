"use client";

import { memo, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, BookOpen, Loader2 } from "lucide-react";
import { usePublicSearchResults } from "../hooks/use-public-search-results";
import { highlightMatch } from "@/widgets/admin/command-palette/utils/highlight-utils";
import type { PublicSearchResult } from "../hooks/use-public-search-results";

interface PublicSearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: PublicSearchResult) => void;
}

export const PublicSearchDropdown = memo(function PublicSearchDropdown({
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
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 z-50 max-h-96 overflow-y-auto"
        >
          {loading ? (
            <div className="p-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Поиск...</span>
            </div>
          ) : !hasResults ? (
            <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Ничего не найдено
            </div>
          ) : (
            <div className="py-2">
              {groupedResults.categories.length > 0 && (
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
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
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
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
});

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
    () => (query ? highlightMatch(result.label, query) : result.label),
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
      className="w-full text-left px-4 py-3 rounded-lg transition-all hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-500 dark:text-slate-400">
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium">{highlightedLabel}</div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {categoryText}
          </div>
          {highlightedDescription && (
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {highlightedDescription}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
});
