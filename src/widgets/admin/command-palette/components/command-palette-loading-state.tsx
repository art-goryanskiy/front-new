"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { memo, useMemo } from "react";
import { COMMAND_PALETTE_CLASSES } from "../constants/command-palette-constants";

export const CommandPaletteLoadingState = memo(
  function CommandPaletteLoadingState() {
    const skeletonItems = useMemo(
      () => Array.from({ length: 3 }, (_, index) => index),
      []
    );

    return (
      <div className="space-y-2 p-2">
        {skeletonItems.map((index) => (
          <div
            key={index}
            className={`${COMMAND_PALETTE_CLASSES.commandItem} ${COMMAND_PALETTE_CLASSES.commandItemDefault}`}
          >
            <div
              className={COMMAND_PALETTE_CLASSES.commandItemContent}
            >
              <Skeleton className="h-5 w-5 rounded" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);
