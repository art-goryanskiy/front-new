"use client";

import { highlightMatch } from "@/shared/ui/highlight/highlight-match";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Folder, Loader2, Receipt } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import type { PublicSearchResult } from "../hooks/use-public-search-results";
import { usePublicSearchResults } from "../hooks/use-public-search-results";
import type { UserEntity } from "@/shared/api/generated/graphql";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CATEGORY_ORDER = Object.values(
  CATEGORY_TYPE_LABELS
) as string[];
const OTHER_CATEGORY_LABEL = "Прочее";

interface PublicSearchDropdownProps {
  query: string;
  isOpen: boolean;
  user: UserEntity | null;
  onClose: () => void;
  onSelect: (result: PublicSearchResult) => void;
}

export const PublicSearchDropdown = memo(
  function PublicSearchDropdown({
    query,
    isOpen,
    user,
    onClose,
    onSelect,
  }: PublicSearchDropdownProps) {
    const { results, loading } = usePublicSearchResults(query, {
      isAuthenticated: !!user,
    });
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закрываем при клике вне dropdown
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          target &&
          "closest" in target &&
          (target as Element).closest?.("[data-user-menu]")
        ) {
          return;
        }
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(target)
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

    // Группируем результаты: категории и заявки — как есть; программы — по родительской категории
    const groupedResults = useMemo(() => {
      const categories = results.filter((r) => r.type === "category");
      const programs = results.filter((r) => r.type === "program");
      const orders = results.filter((r) => r.type === "order");

      const programsByCategory = new Map<
        string,
        PublicSearchResult[]
      >();
      for (const p of programs) {
        const key =
          p.parentCategoryName?.trim() || OTHER_CATEGORY_LABEL;
        if (!programsByCategory.has(key))
          programsByCategory.set(key, []);
        programsByCategory.get(key)!.push(p);
      }
      const programEntries: [string, PublicSearchResult[]][] = [];
      for (const name of CATEGORY_ORDER) {
        const list = programsByCategory.get(name);
        if (list?.length) programEntries.push([name, list]);
      }
      programsByCategory.forEach((list, name) => {
        if (!CATEGORY_ORDER.includes(name))
          programEntries.push([name, list]);
      });

      return { categories, orders, programEntries };
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
              <div className="space-y-4 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Пока ничего не нашли по этому запросу. Давайте подберем
                  программу вместе?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button asChild size="sm" className="rounded-xl">
                    <Link href="/contacts">Подобрать с поддержкой</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-xl"
                  >
                    <Link href="/">Все направления</Link>
                  </Button>
                </div>
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
                {groupedResults.programEntries.length > 0 && (
                  <div className="px-4 py-2">
                    <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Программы
                    </div>
                    <div className="space-y-4">
                      {groupedResults.programEntries.map(
                        ([categoryName, programList]) => (
                          <div key={categoryName}>
                            <div className="mb-1.5 px-1 text-xs font-medium text-muted-foreground">
                              {categoryName}
                            </div>
                            <div className="space-y-1">
                              {programList.map((result) => (
                                <SearchResultItem
                                  key={result.id}
                                  result={result}
                                  query={query}
                                  onClick={handleResultClick}
                                  showCategoryLabel={false}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                {groupedResults.orders.length > 0 && (
                  <div className="px-4 py-2">
                    <div className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Заявки
                    </div>
                    <div className="space-y-1">
                      {groupedResults.orders.map((result) => (
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
  /** Скрыть подпись «Категория: …» (когда категория уже показана заголовком группы) */
  showCategoryLabel?: boolean;
}

const SearchResultItem = memo(function SearchResultItem({
  result,
  query,
  onClick,
  showCategoryLabel = true,
}: SearchResultItemProps) {
  const IconComponent = useMemo(() => {
    if (result.icon === "folder") return Folder;
    if (result.icon === "receipt") return Receipt;
    return BookOpen;
  }, [result.icon]);

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

  const categoryText = useMemo(() => {
    if (!showCategoryLabel) return null;
    if (result.type === "category" && result.parentCategoryName) {
      return `Категория: ${result.parentCategoryName}`;
    }
    if (result.type === "program" && result.parentCategoryName) {
      return `Категория: ${result.parentCategoryName}`;
    }
    if (result.type === "order" && result.parentCategoryName) {
      return result.parentCategoryName;
    }
    if (result.type === "order") return "Моя заявка";
    return result.type === "category" ? "Категория" : "Программа";
  }, [result.type, result.parentCategoryName, showCategoryLabel]);

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
});
