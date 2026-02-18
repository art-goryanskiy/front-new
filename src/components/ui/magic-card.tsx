"use client";

import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "hsl(var(--muted-foreground) / 0.4)",
  gradientOpacity = 0.6,
  gradientFrom = "hsl(var(--primary) / 0.5)",
  gradientTo = "hsl(var(--primary) / 0.15)",
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const handleGlobalPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset();
    };
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset();
    };
    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  const borderGradient = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, var(--border) 100%)`;
  const innerGlow = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`;

  return (
    <div
      role="presentation"
      className={cn("group relative overflow-hidden rounded-2xl", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={reset}
      {...props}
    >
      {/* Градиент по границе (следует за курсором) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: borderGradient }}
      />
      {/* Внутренний фон карточки */}
      <div className="absolute inset-px rounded-[inherit] bg-card" />
      {/* Внутреннее свечение под курсором */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: innerGlow,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
