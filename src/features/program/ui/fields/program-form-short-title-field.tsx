"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import {
  FORM_LABELS,
  FORM_MESSAGES,
  FORM_PLACEHOLDERS,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormShortTitleFieldProps {
  control: Control<ProgramFormData>;
}

const MAX_SHORT_TITLE = 80;

export const ProgramFormShortTitleField = memo(
  function ProgramFormShortTitleField({
    control,
  }: ProgramFormShortTitleFieldProps) {
    const rules = useMemo(
      () => ({
        maxLength: {
          value: MAX_SHORT_TITLE,
          message: FORM_MESSAGES.shortTitleTooLong,
        },
        validate: (value: string | undefined) => {
          if (!value) return true;
          const len = value.trim().length;
          return (
            len <= MAX_SHORT_TITLE || FORM_MESSAGES.shortTitleTooLong
          );
        },
      }),
      []
    );

    return (
      <Controller
        name="shortTitle"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <div className="group relative pt-2">
              <Label
                htmlFor="shortTitle"
                className={cn(
                  "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                  fieldState.invalid
                    ? "text-destructive"
                    : "text-muted-foreground group-focus-within:text-foreground"
                )}
              >
                {FORM_LABELS.shortTitle}
              </Label>
              <Input
                {...field}
                id="shortTitle"
                value={field.value ?? ""}
                placeholder={FORM_PLACEHOLDERS.shortTitle}
                maxLength={MAX_SHORT_TITLE}
                lang="ru"
                spellCheck={true}
                autoCorrect="on"
                aria-invalid={fieldState.invalid}
                aria-label={FORM_LABELS.shortTitle}
                className="peer bg-background/60"
              />
            </div>

            {!fieldState.error?.message && (
              <p className="text-xs text-muted-foreground">
                До {MAX_SHORT_TITLE} символов. Используется в
                карточках и списках.
              </p>
            )}

            {fieldState.error?.message && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    );
  }
);
