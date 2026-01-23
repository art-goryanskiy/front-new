"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  LOGIN_FORM_TEXTS,
  EMAIL_REGEX,
  LOGIN_FORM_CLASSES,
} from "../constants/login-form-constants";
import type { LoginFormData } from "../types/login-form.types";

interface LoginFormEmailFieldProps {
  control: Control<LoginFormData>;
}

export const LoginFormEmailField = memo(function LoginFormEmailField({
  control,
}: LoginFormEmailFieldProps) {
  const rules = useMemo(
    () => ({
      required: LOGIN_FORM_TEXTS.email.required,
      pattern: {
        value: EMAIL_REGEX,
        message: LOGIN_FORM_TEXTS.email.invalidFormat,
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
          label={LOGIN_FORM_TEXTS.email.label}
          placeholder={LOGIN_FORM_TEXTS.email.placeholder}
          isRequired
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          aria-label={LOGIN_FORM_TEXTS.email.label}
          variant="bordered"
          size="md"
          radius="lg"
          classNames={LOGIN_FORM_CLASSES.inputClassNames}
        />
      )}
    />
  );
});
