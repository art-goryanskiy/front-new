"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PUBLIC_HEADER_CLASSES } from "../constants/public-header-constants";

export const HeaderLogo = memo(function HeaderLogo() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/" className={PUBLIC_HEADER_CLASSES.logo}>
        <div
          style={{
            width: 60,
            height: 40,
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
        <span
          className="bg-linear-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-xl font-(--font-handwriting) tracking-tight text-transparent sm:text-2xl"
          style={{
            fontFamily: "var(--font-handwriting)",
            fontWeight: 700,
          }}
        >
          Стандарт
        </span>
      </Link>
      <div className="hidden items-center gap-1 sm:flex">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block bg-linear-to-r from-primary-600 via-purple-600 to-primary-800 bg-clip-text text-xl font-(--font-handwriting) text-transparent sm:text-2xl"
          style={{
            fontFamily: "var(--font-handwriting)",
            fontWeight: 700,
          }}
        >
          +
        </motion.span>
      </div>
    </div>
  );
});
