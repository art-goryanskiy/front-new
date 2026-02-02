"use client";

import { memo, useMemo } from "react";
import {
  LOGIN_FORM_CLASSES,
  getLoginErrorMessage,
} from "../constants/login-form-constants";

interface LoginFormErrorProps {
  error?: Error | null;
}

export const LoginFormError = memo(function LoginFormError({
  error,
}: LoginFormErrorProps) {
  const errorMessage = useMemo(
    () => getLoginErrorMessage(error?.message),
    [error?.message]
  );

  if (!error) return null;

  return (
    <div className={LOGIN_FORM_CLASSES.errorContainer}>
      <p className={LOGIN_FORM_CLASSES.errorText}>{errorMessage}</p>
    </div>
  );
});
