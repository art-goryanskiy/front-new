"use client";

import { memo } from "react";
import {
  COMMAND_PALETTE_CLASSES,
  COMMAND_PALETTE_TEXTS,
} from "../constants/command-palette-constants";

export const CommandPaletteEmptyState = memo(
  function CommandPaletteEmptyState() {
    return (
      <div className={COMMAND_PALETTE_CLASSES.emptyState}>
        {COMMAND_PALETTE_TEXTS.noCommandsFound}
      </div>
    );
  }
);
