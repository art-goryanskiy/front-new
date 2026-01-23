"use client";

import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchState } from "@/shared/store/ui-store";
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
