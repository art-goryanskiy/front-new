"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ORGANIZATION_SUGGESTIONS } from "@/shared/api/queries/organizations";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { highlightMatch } from "@/shared/ui/highlight/highlight-match";
import { cn } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  Loader2,
  UserRound,
} from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type OrganizationSuggestion = {
  type: "LEGAL" | "INDIVIDUAL";
  inn: string;
  kpp?: string | null;
  ogrn?: string | null;
  displayName: string;
  legalAddress?: string | null;
};

type OrganizationSuggestionsQueryData = {
  organizationSuggestions: OrganizationSuggestion[];
};

type OrganizationSuggestionsQueryVars = {
  query: string;
  count?: number | null;
};

export interface OrganizationSuggestInputProps {
  label: string;
  placeholder?: string;
  className?: string;
  description?: string;
  isDisabled?: boolean;
  minQueryLength?: number;
  debounceMs?: number;
  count?: number;
  /** После выбора очистить инпут (для добавления нескольких подряд) */
  clearAfterSelect?: boolean;
  onSelect: (suggestion: OrganizationSuggestion) => void;
  onApiUnavailableChange?: (isUnavailable: boolean) => void;
}

function is429(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;

  const maybeErr = err as {
    message?: unknown;
    networkError?: unknown;
  };

  const message =
    typeof maybeErr.message === "string" ? maybeErr.message : "";

  const networkError =
    maybeErr.networkError && typeof maybeErr.networkError === "object"
      ? (maybeErr.networkError as {
          statusCode?: unknown;
          response?: unknown;
        })
      : null;

  const statusCode =
    networkError && typeof networkError.statusCode === "number"
      ? networkError.statusCode
      : undefined;

  const response =
    networkError &&
    networkError.response &&
    typeof networkError.response === "object"
      ? (networkError.response as { status?: unknown })
      : null;

  const responseStatus =
    response && typeof response.status === "number"
      ? response.status
      : undefined;

  return (
    statusCode === 429 ||
    responseStatus === 429 ||
    message.includes("429")
  );
}

export const OrganizationSuggestInput = memo(
  function OrganizationSuggestInput({
    label,
    placeholder,
    className = "w-full",
    description,
    isDisabled,
    minQueryLength = 3,
  debounceMs = 350,
  count = 15,
  clearAfterSelect = false,
  onSelect,
  onApiUnavailableChange,
}: OrganizationSuggestInputProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);

    const q = useMemo(() => value.trim(), [value]);
    const debounced = useDebounce(q, debounceMs);

    const [loadSuggestions, queryState] = useLazyQuery<
      OrganizationSuggestionsQueryData,
      OrganizationSuggestionsQueryVars
    >(ORGANIZATION_SUGGESTIONS, {
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    });

    const items = queryState.data?.organizationSuggestions ?? [];
    const loading = queryState.loading;
    const error = queryState.error;
    const rateLimited = useMemo(() => is429(error), [error]);

    const apiUnavailable = Boolean(error) || rateLimited;

    useEffect(() => {
      onApiUnavailableChange?.(apiUnavailable);
    }, [apiUnavailable, onApiUnavailableChange]);

    const shouldQuery =
      isOpen &&
      !isDisabled &&
      debounced.length >= minQueryLength &&
      !rateLimited;

    useEffect(() => {
      if (!shouldQuery) return;
      void loadSuggestions({
        variables: { query: debounced, count },
      });
    }, [count, debounced, loadSuggestions, shouldQuery]);

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const onDocMouseDown = (event: MouseEvent) => {
        const el = containerRef.current;
        if (!el) return;
        if (!el.contains(event.target as Node)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      };

      document.addEventListener("mousedown", onDocMouseDown);
      return () =>
        document.removeEventListener("mousedown", onDocMouseDown);
    }, [isOpen]);

    const showDropdown =
      isOpen && q.length >= minQueryLength && !isDisabled;

    const baseId = useMemo(() => {
      const raw = String(label);
      return `org-${raw.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
    }, [label]);

    const handleSelect = useCallback(
      (s: OrganizationSuggestion) => {
        onSelect(s);
        setValue(clearAfterSelect ? "" : s.displayName);
        setIsOpen(false);
        setActiveIndex(-1);
      },
      [onSelect, clearAfterSelect]
    );

    const currentIndex = useMemo(() => {
      if (!showDropdown) return -1;
      if (activeIndex >= 0 && activeIndex < items.length)
        return activeIndex;
      return items.length > 0 ? 0 : -1;
    }, [activeIndex, items.length, showDropdown]);

    useEffect(() => {
      if (!showDropdown) return;
      if (currentIndex < 0) return;
      const el = document.getElementById(
        `${baseId}-opt-${currentIndex}`
      );
      el?.scrollIntoView({ block: "nearest" });
    }, [baseId, currentIndex, showDropdown]);

    return (
      <div
        ref={containerRef}
        className={cn("space-y-2", className)}
        onBlurCapture={(e) => {
          const el = containerRef.current;
          if (!el) return;
          if (!el.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
            setActiveIndex(-1);
          }
        }}
      >
        <div className="group relative pt-2">
          <Label
            className={cn(
              "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
              "text-muted-foreground group-focus-within:text-foreground"
            )}
          >
            {label}
          </Label>

          <div className="relative">
            <Input
              value={value}
              onChange={(e) => {
                const next = e.target.value;
                setValue(next);
                if (isDisabled) return;
                setIsOpen(next.trim().length >= minQueryLength);
              }}
              onFocus={() => {
                if (!isDisabled && q.length >= minQueryLength) {
                  setIsOpen(true);
                  setActiveIndex(0);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsOpen(false);
                  setActiveIndex(-1);
                  return;
                }

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (
                    !isOpen &&
                    q.length >= minQueryLength &&
                    !isDisabled
                  ) {
                    setIsOpen(true);
                    setActiveIndex(0);
                    return;
                  }
                  setActiveIndex((prev) => {
                    if (items.length === 0) return -1;
                    const next = prev < 0 ? 0 : prev + 1;
                    return Math.min(next, items.length - 1);
                  });
                  return;
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((prev) => {
                    if (items.length === 0) return -1;
                    if (prev < 0) return 0;
                    return Math.max(prev - 1, 0);
                  });
                  return;
                }

                if (e.key === "Enter") {
                  if (!showDropdown) return;
                  if (currentIndex < 0) return;
                  const sug = items[currentIndex];
                  if (!sug) return;
                  e.preventDefault();
                  handleSelect(sug);
                }
              }}
              placeholder={placeholder}
              disabled={isDisabled}
              aria-label={label}
              className={cn(
                "peer bg-background/60 pr-10",
                showDropdown && "rounded-b-none"
              )}
            />

            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
            </div>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full right-0 left-0 z-[100] max-h-72 overflow-y-auto rounded-b-xl border border-t-0 border-border bg-background shadow-lg"
                  role="listbox"
                  id={`${baseId}-listbox`}
                >
                  {rateLimited ? (
                    <div className="flex items-start gap-2 px-4 py-3 text-sm text-muted-foreground">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      Слишком часто. Попробуйте позже.
                    </div>
                  ) : error ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      Не удалось загрузить подсказки.
                    </div>
                  ) : items.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      Ничего не найдено
                    </div>
                  ) : (
                    <div className="py-1">
                      {items.map((sug, idx) => {
                        const Icon =
                          sug.type === "INDIVIDUAL"
                            ? UserRound
                            : Building2;
                        const meta = `ИНН ${sug.inn}${
                          sug.kpp ? `, КПП ${sug.kpp}` : ""
                        }`;
                        const addr = sug.legalAddress?.trim() || null;
                        const active = idx === currentIndex;

                        return (
                          <button
                            id={`${baseId}-opt-${idx}`}
                            key={`${sug.inn}-${sug.kpp ?? ""}-${idx}`}
                            type="button"
                            role="option"
                            aria-selected={active}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSelect(sug)}
                            className={cn(
                              "w-full rounded-lg px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted/60",
                              active && "bg-muted/60"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 text-muted-foreground">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium">
                                  {highlightMatch(sug.displayName, q)}
                                </div>
                                <div className="mt-0.5 text-xs text-muted-foreground">
                                  {meta}
                                </div>
                                {addr && (
                                  <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                                    {addr}
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  }
);
