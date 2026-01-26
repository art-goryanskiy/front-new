"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PUBLIC_HEADER_CLASSES } from "../constants/public-header-constants";

export const HeaderLogo = memo(function HeaderLogo() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/" className={PUBLIC_HEADER_CLASSES.logo}>
        <div
          style={{
            width: 60,
            height: 50,
            position: "relative",
          }}
        >
          <Image
            src="/logo-full.svg"
            alt="ООО ЦОК СТАНДАРТ ПЛЮС"
            fill
            sizes="60px"
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
    </div>
  );
});
