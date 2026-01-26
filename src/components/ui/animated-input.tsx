"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHAR_DELAY = 75;
const IDLE_DELAY_AFTER_FINISH = 2200;

const DEFAULT_PLACEHOLDERS = [
  "Ask anything...",
  "What's on your mind?",
  "How can I help you?",
  "What would you like to know?",
];

export interface OrbInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
  placeholders?: string[];
  "aria-label"?: string;
  className?: string;
  showClearButton?: boolean;
  onClear?: () => void;
}

export function OrbInput({
  value: controlledValue,
  onValueChange,
  onFocus,
  placeholders: placeholdersProp,
  "aria-label": ariaLabel = "Ask a question",
  className,
  showClearButton = true,
  onClear,
}: OrbInputProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState("");
  const value = isControlled ? controlledValue : internalValue;
  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const placeholders = useMemo(
    () => placeholdersProp ?? DEFAULT_PLACEHOLDERS,
    [placeholdersProp]
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const current = placeholders[placeholderIndex];
    if (!current) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    const chars = Array.from(current);
    setDisplayedText("");
    setIsTyping(true);

    let charIndex = 0;

    intervalRef.current = window.setInterval(() => {
      if (charIndex < chars.length) {
        const next = chars.slice(0, charIndex + 1).join("");
        setDisplayedText(next);
        charIndex += 1;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsTyping(false);
        timeoutRef.current = window.setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, IDLE_DELAY_AFTER_FINISH);
      }
    }, CHAR_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [placeholderIndex, placeholders]);

  const handleClear = useCallback(() => {
    setValue("");
    onClear?.();
  }, [setValue, onClear]);

  const hasValue = value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border border-border bg-background py-2.5 pl-2.5 pr-3 text-foreground shadow-lg transition-all duration-300 ease-out sm:gap-3 sm:py-3 sm:pl-3 sm:pr-3",
          "focus-within:border-primary/50 focus-within:shadow-xl",
          isFocused ? "scale-[1.02] border-primary/50 shadow-xl" : "shadow-lg"
        )}
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full transition-all duration-300 dark:border dark:border-border sm:h-10 sm:w-10">
          <img
            src="https://media.giphy.com/media/26gsuUjoEBmLrNBxC/giphy.gif"
            alt="Animated orb"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="h-6 w-px shrink-0 bg-border sm:h-7" />

        <div className="min-w-0 flex-1 sm:max-w-[320px]">
          <input
            data-testid="orb-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={`${displayedText}${isTyping ? "|" : ""}`}
            aria-label={ariaLabel}
            className="w-full border-none bg-transparent text-base font-light text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
          />
        </div>

        {showClearButton && hasValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="h-7 w-7 shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground sm:h-8 sm:w-8"
            aria-label="Clear"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrbInput;
