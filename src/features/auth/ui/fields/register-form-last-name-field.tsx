"use client";

import { Controller, type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { REGISTER_FORM_TEXTS } from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormLastNameFieldProps {
  control: Control<RegisterFormData>;
}

export function RegisterFormLastNameField({
  control,
}: RegisterFormLastNameFieldProps) {
  return (
    <Controller
      name="lastName"
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2 w-full")}>
          <Label htmlFor="lastName">{REGISTER_FORM_TEXTS.lastName.label}</Label>
          <Input
            {...field}
            id="lastName"
            type="text"
            placeholder={REGISTER_FORM_TEXTS.lastName.placeholder}
            aria-invalid={fieldState.invalid}
            aria-label={REGISTER_FORM_TEXTS.lastName.label}
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
