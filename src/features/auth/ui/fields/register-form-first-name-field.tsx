"use client";

import { Controller, type Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  REGISTER_FORM_TEXTS,
  REGISTER_FORM_CLASSES,
} from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormFirstNameFieldProps {
  control: Control<RegisterFormData>;
}

export function RegisterFormFirstNameField({
  control,
}: RegisterFormFirstNameFieldProps) {
  return (
    <Controller
      name="firstName"
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          type="text"
          label={REGISTER_FORM_TEXTS.firstName.label}
          placeholder={REGISTER_FORM_TEXTS.firstName.placeholder}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          aria-label={REGISTER_FORM_TEXTS.firstName.label}
          startContent={<span className="text-default-400 text-lg">👤</span>}
          variant="bordered"
          size="md"
          radius="lg"
          classNames={REGISTER_FORM_CLASSES.inputClassNames}
        />
      )}
    />
  );
}
