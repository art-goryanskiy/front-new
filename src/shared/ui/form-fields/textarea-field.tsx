"use client";

import { JSX, memo, useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Textarea } from "@heroui/react";

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
  const classNames = useMemo(
    () => ({
      inputWrapper: "w-full",
      input: "w-full",
    }),
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Textarea
          {...field}
          label={label}
          placeholder={placeholder}
          description={description}
          minRows={minRows}
          isDisabled={isDisabled}
          aria-label={label}
          className={className}
          classNames={classNames}
        />
      )}
    />
  );
}) as <TFieldValues extends FieldValues = FieldValues>(
  props: TextareaFieldProps<TFieldValues>
) => JSX.Element;
