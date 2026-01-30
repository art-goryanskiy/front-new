"use client";

import type { FieldErrors, FieldValues } from "react-hook-form";
import type { JSX } from "react";
import { memo, useCallback, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";

type ErrorItem = { name: string; label: string; message: string };

function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  const maybe = error as { message?: unknown };
  return typeof maybe.message === "string" && maybe.message.trim()
    ? maybe.message
    : null;
}

export interface FormErrorSummaryProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  errors: FieldErrors<TFieldValues>;
  labels: Partial<Record<keyof TFieldValues & string, string>>;
  className?: string;
}

export const FormErrorSummary = memo(function FormErrorSummary<
  TFieldValues extends FieldValues = FieldValues,
>({
  errors,
  labels,
  className,
}: FormErrorSummaryProps<TFieldValues>) {
  const items = useMemo(() => {
    const out: ErrorItem[] = [];

    for (const key of Object.keys(labels) as Array<
      keyof TFieldValues & string
    >) {
      const label = labels[key];
      if (!label) continue;

      const err = (errors as Record<string, unknown>)[key];
      const msg = getErrorMessage(err);
      if (!msg) continue;

      out.push({ name: key, label, message: msg });
    }

    return out;
  }, [errors, labels]);

  const handleJump = useCallback((name: string) => {
    const el =
      (document.getElementById(name) as HTMLElement | null) ??
      (document.querySelector(
        `[name="${CSS.escape(name)}"]`
      ) as HTMLElement | null);

    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // focus if possible
    if (typeof (el as HTMLElement).focus === "function") {
      (el as HTMLElement).focus({ preventScroll: true });
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <Surface
      variant="default"
      className={[
        "w-full border-destructive/30 bg-destructive/10 p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-xl border border-destructive/30 bg-background/60 p-2">
          <AlertCircle className="h-4 w-4 text-destructive" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="text-sm font-semibold text-destructive">
            Проверьте поля формы
          </div>
          <ul className="space-y-1 text-sm text-destructive">
            {items.map((it) => (
              <li key={it.name}>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto p-0 text-left font-medium text-destructive hover:bg-transparent hover:underline"
                  onClick={() => handleJump(it.name)}
                >
                  {it.label}: {it.message}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Surface>
  );
}) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormErrorSummaryProps<TFieldValues>
) => JSX.Element;
