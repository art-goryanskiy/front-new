"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LOGIN_FORM_TEXTS } from "../constants/login-form-constants";
import type { LoginFormData } from "../types/login-form.types";

interface LoginFormPasswordFieldProps {
  control: Control<LoginFormData>;
}

export const LoginFormPasswordField = memo(
  function LoginFormPasswordField({
    control,
  }: LoginFormPasswordFieldProps) {
    const rules = useMemo(
      () => ({ required: LOGIN_FORM_TEXTS.password.required }),
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
                {LOGIN_FORM_TEXTS.password.label} *
              </Label>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder={LOGIN_FORM_TEXTS.password.placeholder}
                required
                aria-invalid={fieldState.invalid}
                aria-label={LOGIN_FORM_TEXTS.password.label}
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
