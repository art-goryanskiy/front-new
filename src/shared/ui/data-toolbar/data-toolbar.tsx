"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
  leftSlot?: React.ReactNode; // фильтры/чипы слева
  rightSlot?: React.ReactNode; // сортировка/колонки/кнопки справа
  className?: string;
}) {
  const hasValue = searchValue.trim().length > 0;

  return (
    <div
      className={cn(
        "sticky top-(--admin-header-offset) z-30 rounded-2xl border border-border/60 bg-background/70 shadow-sm backdrop-blur-xl",
        className
      )}
    >
      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="relative w-full sm:w-[320px]">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pr-10 pl-9"
            />
            {hasValue && (
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
            )}
          </div>

          {leftSlot}
        </div>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          {rightSlot}
        </div>
      </div>
    </div>
  );
}
