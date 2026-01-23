"use client";

import { memo, useMemo } from "react";
import {
  AUTH_FORM_CONTAINER_TEXTS,
  AUTH_FORM_CONTAINER_CLASSES,
} from "../constants/auth-form-container-constants";

interface AuthTogglePanelProps {
  isRegister: boolean;
  onToggle: () => void;
  variant?: "desktop" | "mobile";
}

export const AuthTogglePanel = memo(function AuthTogglePanel({
  isRegister,
  onToggle,
  variant = "desktop",
}: AuthTogglePanelProps) {
  const isMobile = useMemo(() => variant === "mobile", [variant]);

  const containerClass = useMemo(
    () =>
      isMobile
        ? AUTH_FORM_CONTAINER_CLASSES.mobileTogglePanel
        : AUTH_FORM_CONTAINER_CLASSES.togglePanel,
    [isMobile]
  );

  const contentClass = useMemo(
    () =>
      isMobile
        ? AUTH_FORM_CONTAINER_CLASSES.mobileTogglePanelContent
        : AUTH_FORM_CONTAINER_CLASSES.togglePanelContent,
    [isMobile]
  );

  const titleClass = useMemo(
    () =>
      isMobile
        ? AUTH_FORM_CONTAINER_CLASSES.mobileTogglePanelTitle
        : AUTH_FORM_CONTAINER_CLASSES.togglePanelTitle,
    [isMobile]
  );

  const descriptionClass = useMemo(
    () =>
      isMobile
        ? AUTH_FORM_CONTAINER_CLASSES.mobileTogglePanelDescription
        : AUTH_FORM_CONTAINER_CLASSES.togglePanelDescription,
    [isMobile]
  );

  const buttonClass = useMemo(
    () =>
      isMobile
        ? AUTH_FORM_CONTAINER_CLASSES.mobileToggleButton
        : AUTH_FORM_CONTAINER_CLASSES.toggleButton,
    [isMobile]
  );

  const texts = useMemo(
    () =>
      isRegister
        ? AUTH_FORM_CONTAINER_TEXTS.login
        : AUTH_FORM_CONTAINER_TEXTS.register,
    [isRegister]
  );

  const titleBrandClass = useMemo(
    () =>
      isMobile
        ? AUTH_FORM_CONTAINER_CLASSES.mobileTogglePanelTitleBrand
        : AUTH_FORM_CONTAINER_CLASSES.togglePanelTitleBrand,
    [isMobile]
  );

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        <h1 className={titleClass}>
          {texts.welcome}
          {!isRegister && (
            <span
              className={titleBrandClass}
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              {AUTH_FORM_CONTAINER_TEXTS.register.welcomeBrand}
            </span>
          )}
        </h1>
        <p className={descriptionClass}>{texts.description}</p>
        <button
          type="button"
          onClick={onToggle}
          className={buttonClass}
        >
          {texts.button}
        </button>
      </div>
    </div>
  );
});
