"use client";

import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { REGISTER_FORM_TEXTS } from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormPhoneFieldProps {
  control: Control<RegisterFormData>;
}

export function RegisterFormPhoneField({
  control,
}: RegisterFormPhoneFieldProps) {
  return (
    <Controller
      name="phone"
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2 w-full")}>
          <Label htmlFor="phone">{REGISTER_FORM_TEXTS.phone.label}</Label>
          <Input
            {...field}
            id="phone"
            type="tel"
            placeholder={REGISTER_FORM_TEXTS.phone.placeholder}
            aria-invalid={fieldState.invalid}
            aria-label={REGISTER_FORM_TEXTS.phone.label}
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
