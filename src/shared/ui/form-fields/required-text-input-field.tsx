"use client";

import { JSX, memo, useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface RequiredTextInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  requiredMessage: string;
  className?: string;
  description?: string;
  isDisabled?: boolean;
}

export const RequiredTextInputField = memo(
  function RequiredTextInputField<
    TFieldValues extends FieldValues = FieldValues,
  >({
    control,
    name,
    label,
    placeholder,
    requiredMessage,
    className = "w-full",
    description,
    isDisabled,
  }: RequiredTextInputFieldProps<TFieldValues>) {
    const rules = useMemo(
      () => ({ required: requiredMessage }),
      [requiredMessage]
    );

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className={cn("space-y-2", className)}>
            <Label
              htmlFor={name}
              className="text-xs font-medium text-muted-foreground"
            >
              {label} *
            </Label>
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              required
              disabled={isDisabled}
              aria-invalid={fieldState.invalid}
              aria-label={label}
              className="bg-background/60"
            />
            {description && !fieldState.error && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
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
) as <TFieldValues extends FieldValues = FieldValues>(
  props: RequiredTextInputFieldProps<TFieldValues>
) => JSX.Element;
