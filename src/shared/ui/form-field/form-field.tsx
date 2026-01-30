"use client";

import { JSX, memo } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: React.ComponentProps<"input">["type"];
  isRequired?: boolean;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  className?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  description?: string;
  isDisabled?: boolean;
}

export const FormField = memo(function FormField<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isRequired = false,
  rules,
  className = "w-full",
  startContent,
  endContent,
  description,
  isDisabled,
}: FormFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          <div className="group relative pt-2">
            <Label
              htmlFor={name}
              className={cn(
                "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                fieldState.invalid
                  ? "text-destructive"
                  : "text-muted-foreground group-focus-within:text-foreground"
              )}
            >
              {label}
              {isRequired && " *"}
            </Label>

            <div className="relative flex w-full items-center">
              {startContent && (
                <div className="pointer-events-none absolute left-3 text-muted-foreground">
                  {startContent}
                </div>
              )}
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                disabled={isDisabled}
                aria-invalid={fieldState.invalid}
                aria-label={label}
                className={cn(
                  "peer bg-background/60",
                  startContent
                    ? "pl-9"
                    : endContent
                      ? "pr-9"
                      : undefined
                )}
              />
              {endContent && (
                <div className="absolute right-3 text-muted-foreground">
                  {endContent}
                </div>
              )}
            </div>
          </div>
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
}) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormFieldProps<TFieldValues>
) => JSX.Element;
