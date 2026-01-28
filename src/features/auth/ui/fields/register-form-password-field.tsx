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
            <Label htmlFor="password">
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
