"use client";

import { JSX, memo, useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Input } from "@heroui/react";

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
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label={label}
            placeholder={placeholder}
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            description={description}
            isDisabled={isDisabled}
            aria-label={label}
            className={className}
            classNames={classNames}
          />
        )}
      />
    );
  }
) as <TFieldValues extends FieldValues = FieldValues>(
  props: RequiredTextInputFieldProps<TFieldValues>
) => JSX.Element;
