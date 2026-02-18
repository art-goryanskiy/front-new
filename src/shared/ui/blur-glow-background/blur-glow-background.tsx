"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

export type BlurGlowSpotPosition =
  | "top-left"
  | "top-right"
  | "top-right-card"
  | "bottom-left"
  | "bottom-right";

export interface BlurGlowSpot {
  position: BlurGlowSpotPosition;
  /** Tailwind класс цвета, например bg-primary/10 */
  color: string;
  /** default: 360x520, small: 260x360 */
  size?: "default" | "small";
}

const POSITION_CLASSES: Record<BlurGlowSpotPosition, string> = {
  "top-left": "absolute -top-28 -left-28",
  "top-right": "absolute -top-28 -right-28",
  "top-right-card": "absolute -top-24 -right-24",
  "bottom-left": "absolute -bottom-28 -left-28",
  "bottom-right": "absolute -bottom-28 -right-28",
};

const SIZE_CLASSES = {
  default: "h-[360px] w-[520px]",
  small: "h-[260px] w-[360px]",
};

export interface BlurGlowBackgroundProps {
  /** Массив «бликов» (размытые круги) */
  spots: BlurGlowSpot[];
  /** Показывать градиентную маску сверху вниз */
  gradient?: boolean;
  className?: string;
  /** Дополнительные дети (например, сетка) */
  children?: React.ReactNode;
}

export const BlurGlowBackground = memo(function BlurGlowBackground({
  spots,
  gradient = true,
  className,
  children,
}: BlurGlowBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {children}
      {spots.map((spot, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full blur-3xl",
            POSITION_CLASSES[spot.position],
            SIZE_CLASSES[spot.size ?? "default"],
            spot.color
          )}
        />
      ))}
      {gradient && (
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
      )}
    </div>
  );
});
