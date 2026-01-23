"use client";

import { memo, useState, useCallback } from "react";
import Image from "next/image";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { AUTH_FORM_CONTAINER_CLASSES } from "./constants/auth-form-container-constants";
import { AuthTogglePanel } from "./components/auth-toggle-panel";
import { AuthLogo } from "./components/auth-logo";

export const AuthFormContainer = memo(function AuthFormContainer() {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = useCallback(() => {
    setIsRegister((prev) => !prev);
  }, []);

  return (
    <div
      className={`${AUTH_FORM_CONTAINER_CLASSES.container} ${
        isRegister ? AUTH_FORM_CONTAINER_CLASSES.containerActive : ""
      }`}
    >
      <div className={AUTH_FORM_CONTAINER_CLASSES.rightPanel}>
        <AuthLogo />

        <AuthTogglePanel
          isRegister={isRegister}
          onToggle={toggleForm}
          variant="mobile"
        />

        <div className={AUTH_FORM_CONTAINER_CLASSES.formsContainer}>
          <div
            className={`${AUTH_FORM_CONTAINER_CLASSES.formBox} ${
              isRegister
                ? AUTH_FORM_CONTAINER_CLASSES.formBoxActive
                : ""
            } ${
              isRegister
                ? AUTH_FORM_CONTAINER_CLASSES.formBoxLoginHidden
                : AUTH_FORM_CONTAINER_CLASSES.formBoxLogin
            }`}
          >
            <div
              className={AUTH_FORM_CONTAINER_CLASSES.formBoxContent}
            >
              <LoginForm />
            </div>
          </div>

          <div
            className={`${AUTH_FORM_CONTAINER_CLASSES.formBox} ${
              isRegister
                ? AUTH_FORM_CONTAINER_CLASSES.formBoxRegisterActive
                : AUTH_FORM_CONTAINER_CLASSES.formBoxRegister
            }`}
          >
            <div
              className={AUTH_FORM_CONTAINER_CLASSES.formBoxContent}
            >
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>

      <div className={AUTH_FORM_CONTAINER_CLASSES.toggleBox}>
        <div className={AUTH_FORM_CONTAINER_CLASSES.bannerContainer}>
          <Image
            src="/banner.svg"
            alt="Баннер"
            fill
            className={AUTH_FORM_CONTAINER_CLASSES.bannerImage}
            style={{
              objectFit: "cover",
              objectPosition: "center bottom",
            }}
            priority
          />
          <div
            className={AUTH_FORM_CONTAINER_CLASSES.bannerOverlay}
          />
        </div>

        <AuthTogglePanel
          isRegister={isRegister}
          onToggle={toggleForm}
          variant="desktop"
        />
      </div>
    </div>
  );
});
