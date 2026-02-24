"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  default: "rounded-lg bg-muted overflow-hidden",
  premium:
    "rounded-xl overflow-hidden bg-gradient-to-br from-muted/90 via-muted/70 to-muted/50 border border-border/40",
} as const;

export function Skeleton({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "premium";
}) {
  return (
    <div className={cn(variants[variant], className)}>
      <motion.div
        className={
          variant === "premium"
            ? "h-full w-full bg-linear-to-r from-transparent via-white/10 to-transparent dark:via-white/5"
            : "h-full w-full bg-linear-to-r from-transparent via-white/20 to-transparent"
        }
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: variant === "premium" ? 2.2 : 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
