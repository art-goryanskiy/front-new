"use client";

import { memo, useMemo } from "react";
import {
  REGISTER_FORM_TEXTS,
  REGISTER_FORM_CLASSES,
} from "../constants/register-form-constants";

interface RegisterFormErrorProps {
  error?: Error | null;
}

export const RegisterFormError = memo(function RegisterFormError({
  error,
}: RegisterFormErrorProps) {
  const errorMessage = useMemo(
    () => error?.message || REGISTER_FORM_TEXTS.error.default,
    [error?.message]
  );

  if (!error) return null;

  return (
    <div className={REGISTER_FORM_CLASSES.errorContainer}>
      <p className={REGISTER_FORM_CLASSES.errorText}>
        {errorMessage}
      </p>
    </div>
  );
});
