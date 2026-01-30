"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { REGISTER_FORM_TEXTS } from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormPasswordFieldProps {
  control: Control<RegisterFormData>;
}

export const RegisterFormPasswordField = memo(
  function RegisterFormPasswordField({
    control,
  }: RegisterFormPasswordFieldProps) {
    const rules = useMemo(
      () => ({
        required: REGISTER_FORM_TEXTS.password.required,
        minLength: {
          value: 6,
          message: REGISTER_FORM_TEXTS.password.minLength,
        },
      }),
      []
    );

    return (
      <Controller
        name="password"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className={cn("w-full space-y-2")}>
            <div className="group relative pt-2">
              <Label
                htmlFor="password"
                className={cn(
                  "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                  fieldState.invalid
                    ? "text-destructive"
                    : "text-muted-foreground group-focus-within:text-foreground"
                )}
              >
                {REGISTER_FORM_TEXTS.password.label} *
              </Label>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder={REGISTER_FORM_TEXTS.password.placeholder}
                required
                aria-invalid={fieldState.invalid}
                aria-label={REGISTER_FORM_TEXTS.password.label}
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
