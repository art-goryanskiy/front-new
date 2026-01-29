"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { useSearchState } from "@/shared/store/search-store";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import {
  SEARCH_INPUT_ANIMATIONS,
  SEARCH_INPUT_CLASSES,
  SEARCH_INPUT_TEXTS,
} from "./constants/search-input-constants";
import type { SearchInputProps } from "./types/search-input.types";

export const SearchInput = memo(function SearchInput({
  value,
  onValueChange,
  placeholder = SEARCH_INPUT_TEXTS.defaultPlaceholder,
  onFocus,
  showKeyboardHint = true,
  className,
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { clearSearch, setSearchOriginPath, searchOriginPath } =
    useSearchState();
  const hasValue = value.length > 0;

  const handleClear = useCallback(() => {
    onValueChange("");
    clearSearch();

    if (searchOriginPath) {
      router.push(searchOriginPath);
    }
  }, [onValueChange, clearSearch, searchOriginPath, router]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value);
    },
    [onValueChange]
  );

  const handleFocus = useCallback(() => {
    if (!searchOriginPath && pathname) {
      setSearchOriginPath(pathname);
    }
    onFocus?.();
  }, [pathname, searchOriginPath, setSearchOriginPath, onFocus]);

  const keyboardHint = useMemo(
    () => <Kbd>{SEARCH_INPUT_TEXTS.keyboardHint}</Kbd>,
    []
  );

  return (
    <motion.div
      {...SEARCH_INPUT_ANIMATIONS.wrapper}
      className={`group ${SEARCH_INPUT_CLASSES.wrapper} ${className || ""}`}
    >
      <div className="relative flex w-full items-center">
        <motion.div
          {...SEARCH_INPUT_ANIMATIONS.icon}
          className="pointer-events-none absolute left-3 flex items-center"
        >
          <Search
            className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary sm:h-5 sm:w-5"
            aria-hidden="true"
          />
        </motion.div>
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          className="pr-20 pl-9"
          aria-label={placeholder}
        />
        <div className="absolute right-2 flex items-center gap-1">
          {hasValue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="h-6 w-6"
                aria-label="Очистить поиск"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </motion.div>
          )}
          {showKeyboardHint && !hasValue && (
            <motion.div
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="hidden shrink-0 items-center gap-1 sm:flex"
            >
              {keyboardHint}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
