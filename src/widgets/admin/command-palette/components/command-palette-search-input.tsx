"use client";

import { memo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
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
    const {
      clearSearch,
      searchOriginPath,
      closeCommandPalette,
    } = useSearchState();
    const hasValue = value.length > 0;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.target.value);
      },
      [onValueChange]
    );

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
      <div className="relative flex w-full items-center bg-transparent">
        <Search
          className="absolute left-3 h-5 w-5 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={value}
          onChange={handleChange}
          placeholder={COMMAND_PALETTE_TEXTS.searchPlaceholder}
          autoFocus
          className="border-0 bg-transparent pl-9 pr-24 shadow-none focus-visible:ring-0"
          aria-label={COMMAND_PALETTE_TEXTS.searchPlaceholder}
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
          {!hasValue && (
            <span className={COMMAND_PALETTE_CLASSES.escBadge}>
              {COMMAND_PALETTE_TEXTS.escKey}
            </span>
          )}
        </div>
      </div>
    );
  }
);
