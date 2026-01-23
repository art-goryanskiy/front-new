"use client";

import {
  AUTH_GUARD_TEXTS,
  AUTH_GUARD_CLASSES,
} from "../constants/auth-guard-constants";

export function AuthGuardLoading() {
  return (
    <div className={AUTH_GUARD_CLASSES.loadingContainer}>
      <div className={AUTH_GUARD_CLASSES.loadingText}>
        {AUTH_GUARD_TEXTS.loading}
      </div>
    </div>
  );
}
