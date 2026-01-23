"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  REGISTER_FORM_TEXTS,
  EMAIL_REGEX,
  REGISTER_FORM_CLASSES,
} from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormEmailFieldProps {
  control: Control<RegisterFormData>;
}

export const RegisterFormEmailField = memo(
  function RegisterFormEmailField({
    control,
  }: RegisterFormEmailFieldProps) {
    const rules = useMemo(
      () => ({
        required: REGISTER_FORM_TEXTS.email.required,
        pattern: {
          value: EMAIL_REGEX,
          message: REGISTER_FORM_TEXTS.email.invalidFormat,
        },
      }),
      []
    );

    return (
      <Controller
        name="email"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="email"
            label={REGISTER_FORM_TEXTS.email.label}
            placeholder={REGISTER_FORM_TEXTS.email.placeholder}
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            aria-label={REGISTER_FORM_TEXTS.email.label}
            variant="bordered"
            size="md"
            radius="lg"
            classNames={REGISTER_FORM_CLASSES.inputClassNames}
          />
        )}
      />
    );
  }
);
