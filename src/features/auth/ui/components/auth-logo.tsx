"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AUTH_FORM_CONTAINER_CLASSES } from "../constants/auth-form-container-constants";

export const AuthLogo = memo(function AuthLogo() {
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className={AUTH_FORM_CONTAINER_CLASSES.logoContainer}>
      <button
        onClick={handleLogoClick}
        className={AUTH_FORM_CONTAINER_CLASSES.logoButton}
        aria-label="Перейти на главную страницу"
      >
        <Image
          src="/logo-full.svg"
          alt="ООО ЦОК СТАНДАРТ ПЛЮС"
          width={300}
          height={72}
          className={AUTH_FORM_CONTAINER_CLASSES.logo}
          style={{ width: "auto" }}
          priority
        />
      </button>
    </div>
  );
});
