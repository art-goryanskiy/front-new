"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const EMAIL_DOMAINS = [
  "gmail.com",
  "yandex.ru",
  "mail.ru",
  "inbox.ru",
  "bk.ru",
  "list.ru",
  "rambler.ru",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
  "hotmail.com",
  "protonmail.com",
  "google.com",
  "me.com",
  "ya.ru",
] as const;

export type EmailInputWithDomainsProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "onChange"
> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EmailInputWithDomains = React.forwardRef<
  HTMLInputElement,
  EmailInputWithDomainsProps
>(function EmailInputWithDomains(
  { value, onChange, onBlur, onKeyDown, className, ...props },
  ref
) {
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const blurTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const atIndex = value.indexOf("@");
  const localPart = atIndex >= 0 ? value.slice(0, atIndex) : value;
  const domainPart =
    atIndex >= 0 ? value.slice(atIndex + 1).toLowerCase() : "";

  const suggestions = React.useMemo(() => {
    if (atIndex < 0) return [];
    if (!domainPart) return [...EMAIL_DOMAINS];
    return EMAIL_DOMAINS.filter((d) => d.startsWith(domainPart));
  }, [atIndex, domainPart]);

  const isCompleteDomain = (EMAIL_DOMAINS as readonly string[]).includes(domainPart);
  const open =
    showSuggestions &&
    atIndex >= 0 &&
    suggestions.length > 0 &&
    !isCompleteDomain;
  const displaySuggestions = open ? suggestions : [];

  const selectDomain = React.useCallback(
    (domain: string) => {
      const newValue = `${localPart}@${domain}`;
      const syntheticEvent = {
        target: { value: newValue },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
      setShowSuggestions(false);
      setHighlightIndex(0);
    },
    [localPart, onChange]
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      blurTimeoutRef.current = setTimeout(() => {
        setShowSuggestions(false);
        setHighlightIndex(0);
      }, 150);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleFocus = React.useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    if (atIndex >= 0) setShowSuggestions(true);
  }, [atIndex]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      const v = e.target.value;
      if (v.includes("@")) {
        setShowSuggestions(true);
        setHighlightIndex(0);
      } else {
        setShowSuggestions(false);
      }
    },
    [onChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        onKeyDown?.(e as React.KeyboardEvent<HTMLInputElement>);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) =>
          i < displaySuggestions.length - 1 ? i + 1 : 0
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) =>
          i > 0 ? i - 1 : displaySuggestions.length - 1
        );
        return;
      }
      if (e.key === "Enter" && displaySuggestions[highlightIndex]) {
        e.preventDefault();
        selectDomain(displaySuggestions[highlightIndex]);
        return;
      }
      if (e.key === "Escape") {
        setShowSuggestions(false);
      }
      onKeyDown?.(e as React.KeyboardEvent<HTMLInputElement>);
    },
    [
      open,
      displaySuggestions,
      highlightIndex,
      selectDomain,
      onKeyDown,
    ]
  );

  React.useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.children[highlightIndex] as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex, open]);

  React.useEffect(() => {
    setHighlightIndex(0);
  }, [domainPart]);

  React.useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        ref={ref}
        type="email"
        inputMode="email"
        autoComplete="email"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className={cn(className)}
        {...props}
      />
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(12rem,50vh)] overflow-auto rounded-xl border border-border/80 bg-background/95 py-1 shadow-xl shadow-black/5 backdrop-blur-md",
              "ring-1 ring-border/40"
            )}
          >
            <ul
              ref={listRef}
              role="listbox"
              aria-label="Домены email"
              className="list-none"
            >
              {displaySuggestions.map((domain, i) => (
                <li
                  key={domain}
                  role="option"
                  aria-selected={i === highlightIndex}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectDomain(domain);
                  }}
                  onMouseEnter={() => setHighlightIndex(i)}
                  className={cn(
                    "flex cursor-pointer items-center px-3 py-2.5 text-sm font-normal text-foreground/90 transition-colors",
                    i === highlightIndex
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/50"
                  )}
                >
                  {domain}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
});
