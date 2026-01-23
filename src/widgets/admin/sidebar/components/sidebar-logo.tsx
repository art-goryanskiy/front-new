"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  SIDEBAR_TEXTS,
  SIDEBAR_CLASSES,
  LOGO_SIZE,
} from "../constants/sidebar-constants";

export const SidebarLogo = memo(function SidebarLogo() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className={SIDEBAR_CLASSES.desktop.logoSection}>
      <div className="flex items-center justify-center">
        <button
          onClick={handleClick}
          className={SIDEBAR_CLASSES.desktop.logoButton}
          aria-label="Перейти на главную страницу"
        >
          <Image
            src="/logo-full.svg"
            alt={SIDEBAR_TEXTS.logoAlt}
            width={LOGO_SIZE.width}
            height={LOGO_SIZE.height}
            className="object-contain"
            priority
          />
        </button>
      </div>
    </div>
  );
});
