"use client";

import { memo, useCallback, useMemo } from "react";
import { Input, Kbd, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchState } from "@/shared/store/ui-store";
import {
  SEARCH_INPUT_TEXTS,
  SEARCH_INPUT_CLASSES,
  SEARCH_INPUT_ANIMATIONS,
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

  const handleFocus = useCallback(() => {
    if (!searchOriginPath && pathname) {
      setSearchOriginPath(pathname);
    }
    onFocus?.();
  }, [pathname, searchOriginPath, setSearchOriginPath, onFocus]);

  const keyboardHint = useMemo(
    () => (
      <Kbd
        keys={["command"]}
        className="border-slate-300/50 bg-slate-100/80 text-slate-600 dark:border-slate-600/50 dark:bg-slate-700/80 dark:text-slate-300"
      >
        {SEARCH_INPUT_TEXTS.keyboardHint}
      </Kbd>
    ),
    []
  );

  return (
    <motion.div
      {...SEARCH_INPUT_ANIMATIONS.wrapper}
      className={`${SEARCH_INPUT_CLASSES.wrapper} ${className || ""}`}
    >
      <Input
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        startContent={
          <motion.div
            {...SEARCH_INPUT_ANIMATIONS.icon}
            className="flex items-center"
          >
            <Search
              className="h-4 w-4 shrink-0 text-slate-500 transition-colors duration-300 group-hover:text-primary-600 sm:h-5 sm:w-5 dark:text-slate-400 dark:group-hover:text-primary-400"
              aria-hidden="true"
            />
          </motion.div>
        }
        endContent={
          <div className="flex items-center gap-1">
            {hasValue && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={handleClear}
                  className="h-6 w-6 min-w-6"
                  aria-label="Очистить поиск"
                >
                  <X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
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
        }
        classNames={SEARCH_INPUT_CLASSES}
        variant="bordered"
        size="md"
        radius="lg"
        aria-label={placeholder}
      />
    </motion.div>
  );
});
