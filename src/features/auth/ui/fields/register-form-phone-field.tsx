"use client";

import { Controller, type Control } from "react-hook-form";
import { Input } from "@heroui/react";
import {
  REGISTER_FORM_TEXTS,
  REGISTER_FORM_CLASSES,
} from "../constants/register-form-constants";
import type { RegisterFormData } from "../types/register-form.types";

interface RegisterFormPhoneFieldProps {
  control: Control<RegisterFormData>;
}

export function RegisterFormPhoneField({
  control,
}: RegisterFormPhoneFieldProps) {
  return (
    <Controller
      name="phone"
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          type="tel"
          label={REGISTER_FORM_TEXTS.phone.label}
          placeholder={REGISTER_FORM_TEXTS.phone.placeholder}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          aria-label={REGISTER_FORM_TEXTS.phone.label}
          startContent={<span className="text-default-400 text-lg">📞</span>}
          variant="bordered"
          size="md"
          radius="lg"
          classNames={REGISTER_FORM_CLASSES.inputClassNames}
        />
      )}
    />
  );
}
