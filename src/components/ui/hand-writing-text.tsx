"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle = "Optional subtitle",
}: HandWrittenTitleProps) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 2.5,
          ease: [0.43, 0.13, 0.23, 0.96] as [
            number,
            number,
            number,
            number,
          ],
        },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl py-24">
      <div className="absolute inset-0" aria-hidden>
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          animate="visible"
          className="h-full w-full"
        >
          <motion.path
            d="M 950 90 
                           C 1250 300, 1050 480, 600 520
                           C 250 520, 150 480, 150 300
                           C 150 120, 350 80, 600 80
                           C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="text-black opacity-90 dark:text-white"
          />
        </motion.svg>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="flex items-center gap-2 text-4xl font-extrabold tracking-tighter text-black md:text-6xl dark:text-white">
          {title}
        </span>
        {subtitle && (
          <p className="text-xl text-black/80 dark:text-white/80">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
