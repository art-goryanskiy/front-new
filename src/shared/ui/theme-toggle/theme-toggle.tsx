"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = React.memo(function ThemeToggle({
  className,
}: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const resolved = resolvedTheme ?? theme ?? "light";
  const isDark = resolved === "dark";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const ariaLabel = isDark
    ? "Переключить на светлую тему"
    : "Переключить на тёмную тему";

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full text-foreground",
          className
        )}
        aria-hidden
      >
        <Sun className="h-5 w-5 opacity-50" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-foreground",
        "transition-opacity hover:opacity-80",
        className
      )}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          !isDark
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-50 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-50 opacity-0"
        }`}
      />
    </button>
  );
});
