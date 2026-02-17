"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADDRESS_SUGGESTIONS } from "@/shared/api/queries/addresses";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { highlightMatch } from "@/shared/ui/highlight/highlight-match";
import { cn } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client/react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MapPin, AlertTriangle } from "lucide-react";
import {
  JSX,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  useController,
} from "react-hook-form";

type AddressSuggestion = {
  value: string;
  unrestrictedValue?: string | null;
  region?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  flat?: string | null;
  postalCode?: string | null;
  fiasId?: string | null;
  kladrId?: string | null;
  geoLat?: string | null;
  geoLon?: string | null;
};

type AddressSuggestionsQueryData = {
  addressSuggestions: AddressSuggestion[];
};

type AddressSuggestionsQueryVars = {
  query: string;
  count?: number | null;
};

export interface AddressSuggestFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  className?: string;
  description?: string;
  isDisabled?: boolean;
  minQueryLength?: number;
  debounceMs?: number;
  count?: number;
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

function toStoredAddressString(sug: AddressSuggestion): string {
  const value = (sug.value ?? "").trim();
  const postalCode = (sug.postalCode ?? "").trim();
  if (!postalCode) return value;

  // Avoid double prefix if backend already included it.
  if (value.startsWith(postalCode)) return value;

  return `${postalCode}, ${value}`;
}

/** Пропсы для поля с подсказками адреса (value/onChange, без react-hook-form) */
export interface AddressSuggestInputProps {
  value: string;
  onChange: (value: string) => void;
  id: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  description?: string;
  isDisabled?: boolean;
  minQueryLength?: number;
  debounceMs?: number;
  count?: number;
  error?: string;
  invalid?: boolean;
}

function AddressSuggestFieldInner({
  value,
  onChange,
  id,
  label,
  placeholder,
  isRequired = false,
  className = "w-full",
  description,
  isDisabled,
  minQueryLength = 3,
  debounceMs = 350,
  count = 8,
  error,
  invalid = false,
}: AddressSuggestInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rawValue = useMemo(() => String(value ?? ""), [value]);
  const q = useMemo(() => rawValue.trim(), [rawValue]);
  const debounced = useDebounce(q, debounceMs);

  const [loadSuggestions, queryState] = useLazyQuery<
    AddressSuggestionsQueryData,
    AddressSuggestionsQueryVars
  >(ADDRESS_SUGGESTIONS, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const items = queryState.data?.addressSuggestions ?? [];
  const loading = queryState.loading;
  const queryError = queryState.error;
  const rateLimited = useMemo(() => is429(queryError), [queryError]);

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

  const selectSuggestion = useCallback(
    (v: string) => {
      onChange(v);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [onChange]
  );

  const showDropdown =
    isOpen && q.length >= minQueryLength && !isDisabled;

  const baseId = useMemo(
    () => id.replace(/[^a-zA-Z0-9_-]/g, "-"),
    [id]
  );

  const currentIndex = useMemo(() => {
    if (!showDropdown) return -1;
    if (activeIndex >= 0 && activeIndex < items.length) return activeIndex;
    return items.length > 0 ? 0 : -1;
  }, [activeIndex, items.length, showDropdown]);

  useEffect(() => {
    if (!showDropdown || currentIndex < 0) return;
    const el = document.getElementById(`${baseId}-opt-${currentIndex}`);
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
          htmlFor={id}
          className={cn(
            "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
            invalid
              ? "text-destructive"
              : "text-muted-foreground group-focus-within:text-foreground"
          )}
        >
          {label}
          {isRequired && " *"}
        </Label>

        <div className="relative">
          <Input
            value={value}
            onChange={(e) => {
              const next = e.target.value;
              onChange(next);
              if (!isDisabled) {
                setIsOpen(next.trim().length >= minQueryLength);
                setActiveIndex(0);
              }
            }}
            id={id}
            type="text"
            placeholder={placeholder}
            required={isRequired}
            lang="ru"
            spellCheck={true}
            autoCorrect="on"
            disabled={isDisabled}
            aria-invalid={invalid}
            aria-label={label}
            className={cn(
              "peer bg-background/60 pr-10",
              showDropdown && "rounded-b-none",
              invalid && "border-destructive focus-visible:ring-destructive/20"
            )}
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
                if (!isOpen && q.length >= minQueryLength && !isDisabled) {
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
                if (!showDropdown || currentIndex < 0) return;
                const sug = items[currentIndex];
                if (!sug) return;
                e.preventDefault();
                selectSuggestion(toStoredAddressString(sug));
              }
            }}
          />

          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                className="absolute top-full right-0 left-0 z-50 max-h-72 overflow-y-auto rounded-b-xl border border-t-0 border-border bg-background/85 shadow-lg backdrop-blur-xl"
                role="listbox"
                id={`${baseId}-listbox`}
              >
                {rateLimited ? (
                  <div className="flex items-start gap-2 px-4 py-3 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    Слишком часто. Попробуйте позже.
                  </div>
                ) : queryError ? (
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
                      const secondary =
                        sug.region || sug.city
                          ? [sug.region, sug.city].filter(Boolean).join(", ")
                          : null;
                      const active = idx === currentIndex;
                      return (
                        <button
                          id={`${baseId}-opt-${idx}`}
                          key={`${sug.value}-${idx}`}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() =>
                            selectSuggestion(toStoredAddressString(sug))
                          }
                          className={cn(
                            "w-full rounded-lg px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted/60",
                            active && "bg-muted/60"
                          )}
                        >
                          <div className="font-medium">
                            {highlightMatch(sug.value, q)}
                          </div>
                          {secondary && (
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {secondary}
                            </div>
                          )}
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

      {description && !error && !rateLimited && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {rateLimited && !error && (
        <p className="text-sm text-muted-foreground">
          Слишком часто, попробуйте позже.
        </p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

/** Поле адреса с подсказками по value/onChange (без react-hook-form) */
export const AddressSuggestInput = memo(function AddressSuggestInput(
  props: AddressSuggestInputProps
) {
  return <AddressSuggestFieldInner {...props} />;
});

export const AddressSuggestField = memo(function AddressSuggestField<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  placeholder,
  isRequired = false,
  rules,
  className = "w-full",
  description,
  isDisabled,
  minQueryLength = 3,
  debounceMs = 350,
  count = 8,
}: AddressSuggestFieldProps<TFieldValues>) {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  return (
    <AddressSuggestFieldInner
      value={field.value ?? ""}
      onChange={field.onChange}
      id={String(name)}
      label={label}
      placeholder={placeholder}
      isRequired={isRequired}
      className={className}
      description={description}
      isDisabled={isDisabled}
      minQueryLength={minQueryLength}
      debounceMs={debounceMs}
      count={count}
      error={fieldState.error?.message}
      invalid={fieldState.invalid}
    />
  );
}) as <TFieldValues extends FieldValues = FieldValues>(
  props: AddressSuggestFieldProps<TFieldValues>
) => JSX.Element;
