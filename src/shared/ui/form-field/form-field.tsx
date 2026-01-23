"use client";

import { JSX, memo, useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { Input, type InputProps } from "@heroui/react";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: InputProps["type"];
  isRequired?: boolean;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  className?: string;
  classNames?: InputProps["classNames"];
  variant?: InputProps["variant"];
  size?: InputProps["size"];
  radius?: InputProps["radius"];
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
  classNames,
  variant = "bordered",
  size = "md",
  radius = "lg",
  startContent,
  endContent,
  description,
  isDisabled,
}: FormFieldProps<TFieldValues>) {
  const defaultClassNames = useMemo(
    () => ({
      inputWrapper: "w-full",
      input: "w-full",
    }),
    []
  );

  const finalClassNames = useMemo(
    () => classNames || defaultClassNames,
    [classNames, defaultClassNames]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          type={type}
          label={label}
          placeholder={placeholder}
          isRequired={isRequired}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          description={description}
          isDisabled={isDisabled}
          aria-label={label}
          className={className}
          variant={variant}
          size={size}
          radius={radius}
          startContent={startContent}
          endContent={endContent}
          classNames={finalClassNames}
        />
      )}
    />
  );
}) as <TFieldValues extends FieldValues = FieldValues>(
  props: FormFieldProps<TFieldValues>
) => JSX.Element;
