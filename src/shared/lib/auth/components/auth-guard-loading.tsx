"use client";

import { OrbitalLoader } from "@/components/ui/orbital-loader";
import { AUTH_GUARD_CLASSES } from "../constants/auth-guard-constants";

export function AuthGuardLoading() {
  return (
    <div className={AUTH_GUARD_CLASSES.loadingContainer}>
      <OrbitalLoader
        message="Загрузка..."
        messagePlacement="bottom"
      />
    </div>
  );
}
