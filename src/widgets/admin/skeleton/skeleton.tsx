"use client";
import { motion } from "framer-motion";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-muted rounded-lg overflow-hidden ${className}`}
    >
      <motion.div
        className="h-full w-full bg-linear-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
