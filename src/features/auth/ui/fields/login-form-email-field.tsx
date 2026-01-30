"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  LOGIN_FORM_TEXTS,
  EMAIL_REGEX,
} from "../constants/login-form-constants";
import type { LoginFormData } from "../types/login-form.types";

interface LoginFormEmailFieldProps {
  control: Control<LoginFormData>;
}

export const LoginFormEmailField = memo(function LoginFormEmailField({
  control,
}: LoginFormEmailFieldProps) {
  const rules = useMemo(
    () => ({
      required: LOGIN_FORM_TEXTS.email.required,
      pattern: {
        value: EMAIL_REGEX,
        message: LOGIN_FORM_TEXTS.email.invalidFormat,
      },
    }),
    []
  );

  return (
    <Controller
      name="email"
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={cn("w-full space-y-2")}>
          <Label htmlFor="email">
            {LOGIN_FORM_TEXTS.email.label} *
          </Label>
          <Input
            {...field}
            id="email"
            type="email"
            placeholder={LOGIN_FORM_TEXTS.email.placeholder}
            required
            aria-invalid={fieldState.invalid}
            aria-label={LOGIN_FORM_TEXTS.email.label}
          />
          {fieldState.error?.message && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
});
