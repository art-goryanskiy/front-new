"use client";

import { memo, useMemo } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  REGISTER_FORM_TEXTS,
  REGISTER_FORM_CLASSES,
} from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormPasswordFieldProps {
  control: Control<RegisterFormData>;
}

export const RegisterFormPasswordField = memo(
  function RegisterFormPasswordField({
    control,
  }: RegisterFormPasswordFieldProps) {
    const rules = useMemo(
      () => ({
        required: REGISTER_FORM_TEXTS.password.required,
        minLength: {
          value: 6,
          message: REGISTER_FORM_TEXTS.password.minLength,
        },
      }),
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
            label={REGISTER_FORM_TEXTS.password.label}
            placeholder={REGISTER_FORM_TEXTS.password.placeholder}
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            aria-label={REGISTER_FORM_TEXTS.password.label}
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
