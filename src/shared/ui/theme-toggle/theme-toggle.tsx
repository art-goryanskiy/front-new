"use client";

import {
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = memo(function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        isIconOnly
        variant="light"
        aria-label="Переключить тему"
        className="text-default-600 dark:text-default-400"
        isLoading
      />
    );
  }

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label={ariaLabel}
      onPress={handleToggle}
      className="text-default-600 hover:text-primary-600 dark:text-foreground dark:hover:text-primary-400"
    >
      <IconComponent className="h-5 w-5" />
    </Button>
  );
});
