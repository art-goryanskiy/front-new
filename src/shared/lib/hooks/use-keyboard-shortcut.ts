import { useEffect } from "react";

interface UseKeyboardShortcutOptions {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  onPress: () => void;
  enabled?: boolean;
}

/**
 * Хук для обработки горячих клавиш
 */
export function useKeyboardShortcut({
  key,
  metaKey = false,
  ctrlKey = false,
  onPress,
  enabled = true,
}: UseKeyboardShortcutOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const metaMatch = metaKey ? e.metaKey : true;
      const ctrlMatch = ctrlKey ? e.ctrlKey : true;
      const keyMatch = e.key === key;

      if (metaMatch && ctrlMatch && keyMatch) {
        e.preventDefault();
        onPress();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, metaKey, ctrlKey, onPress, enabled]);
}
