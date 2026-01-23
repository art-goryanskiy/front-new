"use client";

import { memo } from "react";
import { FORM_CLASSES } from "../constants/user-form-constants";

interface ErrorLike {
  message?: string;
}

interface UserFormErrorProps {
  error: ErrorLike | undefined;
  isEditMode: boolean;
}

export const UserFormError = memo(function UserFormError({
  error,
  isEditMode,
}: UserFormErrorProps) {
  if (!error) return null;

  return (
    <div className={FORM_CLASSES.errorContainer}>
      <p className={FORM_CLASSES.errorText}>
        {error.message ||
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} пользователя`}
      </p>
    </div>
  );
});
