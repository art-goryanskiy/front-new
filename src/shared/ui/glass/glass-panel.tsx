"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GLASS_CLASSES } from "./glass-constants";

export type GlassPanelVariant =
  | "panel"
  | "strong"
  | "card"
  | "panelWithRing";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassPanelVariant;
}

export const GlassPanel = React.forwardRef<
  HTMLDivElement,
  GlassPanelProps
>(({ className, variant = "panel", ...props }, ref) => {
  const variantClass = GLASS_CLASSES[variant];
  return (
    <div
      ref={ref}
      className={cn(variantClass, className)}
      {...props}
    />
  );
});
GlassPanel.displayName = "GlassPanel";
