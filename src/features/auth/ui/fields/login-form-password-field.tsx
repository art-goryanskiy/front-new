"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  LOGIN_FORM_TEXTS,
} from "../constants/login-form-constants";
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
          <div className={cn("space-y-2 w-full")}>
            <Label htmlFor="password">{LOGIN_FORM_TEXTS.password.label} *</Label>
            <Input
              {...field}
              id="password"
              type="password"
              placeholder={LOGIN_FORM_TEXTS.password.placeholder}
              required
              aria-invalid={fieldState.invalid}
              aria-label={LOGIN_FORM_TEXTS.password.label}
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
