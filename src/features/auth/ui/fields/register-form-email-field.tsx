"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import {
  EMAIL_REGEX,
  REGISTER_FORM_TEXTS,
} from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormEmailFieldProps {
  control: Control<RegisterFormData>;
}

export const RegisterFormEmailField = memo(
  function RegisterFormEmailField({
    control,
  }: RegisterFormEmailFieldProps) {
    const rules = useMemo(
      () => ({
        required: REGISTER_FORM_TEXTS.email.required,
        pattern: {
          value: EMAIL_REGEX,
          message: REGISTER_FORM_TEXTS.email.invalidFormat,
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
              {REGISTER_FORM_TEXTS.email.label} *
            </Label>
            <Input
              {...field}
              id="email"
              type="email"
              placeholder={REGISTER_FORM_TEXTS.email.placeholder}
              required
              aria-invalid={fieldState.invalid}
              aria-label={REGISTER_FORM_TEXTS.email.label}
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
  }
);
