"use client";

import { memo, useCallback, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchState } from "@/shared/store/ui-store";
import {
  COMMAND_PALETTE_TEXTS,
  COMMAND_PALETTE_CLASSES,
} from "../constants/command-palette-constants";

interface CommandPaletteSearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CommandPaletteSearchInput = memo(
  function CommandPaletteSearchInput({
    value,
    onValueChange,
  }: CommandPaletteSearchInputProps) {
    const router = useRouter();
    const pathname = usePathname();
    const {
      clearSearch,
      setSearchOriginPath,
      searchOriginPath,
      closeCommandPalette,
    } = useSearchState();
    const hasValue = value.length > 0;

    useEffect(() => {
      if (!searchOriginPath && pathname) {
        setSearchOriginPath(pathname);
      }
    }, [pathname, searchOriginPath, setSearchOriginPath]);

    const handleClear = useCallback(() => {
      onValueChange("");
      clearSearch();
      closeCommandPalette();

      if (searchOriginPath) {
        router.push(searchOriginPath);
      }
    }, [
      onValueChange,
      clearSearch,
      closeCommandPalette,
      searchOriginPath,
      router,
    ]);

    return (
      <Input
        value={value}
        onValueChange={onValueChange}
        placeholder={COMMAND_PALETTE_TEXTS.searchPlaceholder}
        autoFocus
        startContent={
          <Search
            className="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
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
            {!hasValue && (
              <span className={COMMAND_PALETTE_CLASSES.escBadge}>
                {COMMAND_PALETTE_TEXTS.escKey}
              </span>
            )}
          </div>
        }
        classNames={{
          inputWrapper: "bg-transparent shadow-none border-none",
        }}
        variant="bordered"
        aria-label={COMMAND_PALETTE_TEXTS.searchPlaceholder}
      />
    );
  }
);
