"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  HERO_BANNER_TEXTS,
  HERO_BANNER_CLASSES,
  HERO_BANNER_ANIMATIONS,
} from "./constants/hero-banner-constants";

export const HeroBanner = memo(function HeroBanner() {
  const router = useRouter();

  const handlePrimaryCta = useCallback(() => {
    router.push("#programs");
  }, [router]);

  const handleSecondaryCta = useCallback(() => {
    router.push("/qualification-upgrade");
  }, [router]);

  return (
    <section className={HERO_BANNER_CLASSES.section}>
      {/* Background Image */}
      <div className={HERO_BANNER_CLASSES.backgroundImage}>
        <Image
          src="/banner.svg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Decoration */}
      <div className={HERO_BANNER_CLASSES.decoration} />

      {/* Content */}
      <div className={HERO_BANNER_CLASSES.container}>
        <div className={HERO_BANNER_CLASSES.content}>
          {/* Left Section - Text and Buttons */}
          <motion.div
            {...HERO_BANNER_ANIMATIONS.text}
            className={HERO_BANNER_CLASSES.leftSection}
          >
            <div className={HERO_BANNER_CLASSES.textContent}>
              <h1 className={HERO_BANNER_CLASSES.headline}>
                {HERO_BANNER_TEXTS.headline}
              </h1>
              <p className={HERO_BANNER_CLASSES.description}>
                {HERO_BANNER_TEXTS.description}
              </p>
              <div className={HERO_BANNER_CLASSES.ctaGroup}>
                <Button
                  size="lg"
                  endContent={<ArrowRight className="h-5 w-5" />}
                  className="bg-white font-semibold text-gray-900 hover:bg-gray-100"
                  onPress={handlePrimaryCta}
                >
                  {HERO_BANNER_TEXTS.ctaPrimary}
                </Button>
                <Button
                  variant="bordered"
                  size="lg"
                  className="border-2 border-white/30 bg-white/10 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
                  onPress={handleSecondaryCta}
                >
                  {HERO_BANNER_TEXTS.ctaSecondary}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Decorative */}
          <motion.div
            {...HERO_BANNER_ANIMATIONS.right}
            className={HERO_BANNER_CLASSES.rightSection}
          >
            <div className="relative h-full w-full max-w-md">
              <div className="absolute inset-0 border border-white/20 bg-white/5 backdrop-blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});
