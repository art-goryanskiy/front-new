"use client";

import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { REGISTER_FORM_TEXTS } from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormFirstNameFieldProps {
  control: Control<RegisterFormData>;
}

export function RegisterFormFirstNameField({
  control,
}: RegisterFormFirstNameFieldProps) {
  return (
    <Controller
      name="firstName"
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2 w-full")}>
          <Label htmlFor="firstName">{REGISTER_FORM_TEXTS.firstName.label}</Label>
          <Input
            {...field}
            id="firstName"
            type="text"
            placeholder={REGISTER_FORM_TEXTS.firstName.placeholder}
            aria-invalid={fieldState.invalid}
            aria-label={REGISTER_FORM_TEXTS.firstName.label}
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
