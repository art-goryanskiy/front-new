"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";
import { Controller, useWatch, type Control } from "react-hook-form";
import { REGISTER_FORM_TEXTS } from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface Props {
  control: Control<RegisterFormData>;
}

export const RegisterFormConfirmPasswordField = memo(
  function RegisterFormConfirmPasswordField({ control }: Props) {
    const password = useWatch({ control, name: "password" });

    const rules = useMemo(
      () => ({
        required: REGISTER_FORM_TEXTS.confirmPassword.required,
        validate: (value: string) =>
          value === password ||
          REGISTER_FORM_TEXTS.confirmPassword.mismatch,
      }),
      [password]
    );

    return (
      <Controller
        name="confirmPassword"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className={cn("w-full space-y-2")}>
            <div className="group relative pt-2">
              <Label
                htmlFor="confirmPassword"
                className={cn(
                  "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                  fieldState.invalid
                    ? "text-destructive"
                    : "text-muted-foreground group-focus-within:text-foreground"
                )}
              >
                {REGISTER_FORM_TEXTS.confirmPassword.label} *
              </Label>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                placeholder={
                  REGISTER_FORM_TEXTS.confirmPassword.placeholder
                }
                autoComplete="new-password"
                required
                aria-invalid={fieldState.invalid}
                aria-label={REGISTER_FORM_TEXTS.confirmPassword.label}
                className="peer bg-background/60"
              />
            </div>
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
