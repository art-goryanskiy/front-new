"use client";

import { JSX, memo } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  minRows?: number;
  className?: string;
  description?: string;
  isDisabled?: boolean;
}

export const TextareaField = memo(function TextareaField<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  placeholder,
  minRows = 3,
  className = "w-full",
  description,
  isDisabled,
}: TextareaFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
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
            </Label>
            <Textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={minRows}
              disabled={isDisabled}
              aria-invalid={fieldState.invalid}
              aria-label={label}
              className="peer bg-background/60"
            />
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
  props: TextareaFieldProps<TFieldValues>
) => JSX.Element;
