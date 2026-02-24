"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { GLASS_CLASSES } from "@/shared/ui/glass/glass-constants";
import { Search, X } from "lucide-react";

export function DataToolbar({
  searchValue,
  onSearchValueChange,
  searchPlaceholder = "Поиск…",
  leftSlot,
  rightSlot,
  className,
}: {
  searchValue: string;
  onSearchValueChange: (v: string) => void;
  searchPlaceholder?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}) {
  const hasValue = searchValue.trim().length > 0;

  return (
    <div
      className={cn(
        "sticky top-[calc(var(--admin-header-offset)+var(--admin-tabs-offset,0px))] z-30 rounded-2xl p-4 shadow-md",
        GLASS_CLASSES.panelWithRing,
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="relative w-full sm:w-[320px]">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 rounded-xl border-border/60 bg-background/70 pr-10 pl-10"
            />
            {hasValue ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
                onClick={() => onSearchValueChange("")}
                aria-label="Очистить поиск"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            ) : null}
          </div>

          {leftSlot}
        </div>

        <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] sm:w-auto sm:justify-end sm:overflow-visible sm:pb-0">
          {rightSlot}
        </div>
      </div>
    </div>
  );
}
