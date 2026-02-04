"use client";

import { memo, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  "aria-label"?: string;
  className?: string;
}

export const SearchInputField = memo(function SearchInputField({
  value,
  onChange,
  onFocus,
  placeholder = "Поиск программ и категорий...",
  "aria-label": ariaLabel = "Поиск",
  className,
}: SearchInputFieldProps) {
  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  const hasValue = value.length > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
        className
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoComplete="off"
        className="min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {hasValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Очистить"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
});
