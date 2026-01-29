"use client";

import { useSearchState } from "@/shared/store/search-store";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { CommandPaletteContent } from "./components/command-palette-content";

export const CommandPalette = memo(function CommandPalette() {
  const { isCommandPaletteOpen: isOpen, closeCommandPalette } =
    useSearchState();

  return (
    <AnimatePresence>
      {isOpen && (
        <CommandPaletteContent
          key="command-palette"
          closeCommandPalette={closeCommandPalette}
        />
      )}
    </AnimatePresence>
  );
});
