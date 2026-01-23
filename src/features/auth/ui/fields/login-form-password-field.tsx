"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  LOGIN_FORM_TEXTS,
  LOGIN_FORM_CLASSES,
} from "../constants/login-form-constants";
import type { LoginFormData } from "../types/login-form.types";

interface LoginFormPasswordFieldProps {
  control: Control<LoginFormData>;
}

export const LoginFormPasswordField = memo(
  function LoginFormPasswordField({
    control,
  }: LoginFormPasswordFieldProps) {
    const rules = useMemo(
      () => ({ required: LOGIN_FORM_TEXTS.password.required }),
      []
    );

    return (
      <Controller
        name="password"
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="password"
            label={LOGIN_FORM_TEXTS.password.label}
            placeholder={LOGIN_FORM_TEXTS.password.placeholder}
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            aria-label={LOGIN_FORM_TEXTS.password.label}
            variant="bordered"
            size="md"
            radius="lg"
            classNames={LOGIN_FORM_CLASSES.inputClassNames}
          />
        )}
      />
    );
  }
);
