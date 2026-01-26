"use client";

import {
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = memo(function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const ariaLabel = useMemo(
    () =>
      theme === "dark"
        ? "Переключить на светлую тему"
        : "Переключить на темную тему",
    [theme]
  );

  const IconComponent = useMemo(
    () => (theme === "dark" ? Sun : Moon),
    [theme]
  );

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Переключить тему"
        className="text-muted-foreground"
      >
        <Spinner size={20} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={ariaLabel}
      onClick={handleToggle}
      className="text-muted-foreground hover:text-foreground"
    >
      <IconComponent className="h-5 w-5" />
    </Button>
  );
});
