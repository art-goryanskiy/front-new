"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ChevronDown, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { LearnerFormData } from "../types/learner-form-data.types";

function learnerShortLabel(data: LearnerFormData): string {
  const hasName =
    data.lastName?.trim() || data.firstName?.trim() || data.middleName?.trim();
  if (hasName) {
    const last = (data.lastName?.trim() || "").trim();
    const first = (data.firstName?.trim() || "").charAt(0);
    const middle = (data.middleName?.trim() || "").charAt(0);
    const parts = [last];
    if (first) parts.push(`${first}.`);
    if (middle) parts.push(`${middle}.`);
    return parts.join(" ") || "Слушатель";
  }
  return "Слушатель";
}

interface LearnerAccordionItemProps {
  index: number;
  data: LearnerFormData;
  defaultOpen?: boolean;
  title?: string;
  children: ReactNode;
  /** Показать блок «Подставить мои данные» (когда заказчик не «я») */
  showUseMyDataCheckbox?: boolean;
  useMyData?: boolean;
  onUseMyDataChange?: (checked: boolean) => void;
  /** Показывать точку статуса (зелёная/красная) — только после первой валидации */
  showStatusDot?: boolean;
  /** Есть ошибки валидации — индикатор и подпись при свёрнутом виде */
  hasErrors?: boolean;
}

export function LearnerAccordionItem({
  index,
  data,
  defaultOpen = false,
  title,
  children,
  showUseMyDataCheckbox = false,
  useMyData = false,
  onUseMyDataChange,
  showStatusDot = false,
  hasErrors = false,
}: LearnerAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const label = title ?? `${learnerShortLabel(data)} ${index + 1}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-background/90 shadow-sm transition-all duration-300",
        "border-border/50 hover:border-border/70",
        "dark:border-white/10 dark:hover:border-white/20"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors duration-200",
          "hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          open && "bg-muted/25"
        )}
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1 text-foreground">{label}</span>
        <span className="flex shrink-0 items-center gap-2">
          {showStatusDot && (
            <>
              {hasErrors && !open && (
                <span className="text-xs text-destructive">
                  Заполните обязательные поля
                </span>
              )}
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full shadow-sm",
                  hasErrors
                    ? "bg-destructive ring-2 ring-destructive/20"
                    : "bg-emerald-500 ring-2 ring-emerald-500/20"
                )}
                aria-hidden
              />
            </>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </span>
      </button>
      {open && (
        <div className="border-t border-border/40" role="region">
          {showUseMyDataCheckbox && onUseMyDataChange && (
            <div
              className={cn(
                "relative flex items-center justify-between gap-4 px-4 py-3 transition-all duration-300",
                "border-b border-border/40",
                "bg-muted/10",
                useMyData &&
                  "border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              )}
            >
              <div className="relative flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200",
                    useMyData
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/50 bg-muted/30 text-muted-foreground"
                  )}
                >
                  <User className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Подставить мои данные
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Заполнить из профиля
                  </p>
                </div>
              </div>
              <Switch
                checked={useMyData}
                onCheckedChange={onUseMyDataChange}
                className="relative shrink-0"
                aria-label="Подставить мои данные из профиля"
              />
            </div>
          )}
          <div className="p-3">{children}</div>
        </div>
      )}
    </div>
  );
}
