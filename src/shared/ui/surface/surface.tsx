import * as React from "react";
import { cn } from "@/lib/utils";
import { GLASS_CLASSES } from "@/shared/ui/glass/glass-constants";

type SurfaceVariant = "default" | "floating" | "inset" | "glass";

export function Surface({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: SurfaceVariant;
}) {
  const base =
    "rounded-2xl border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50";
  const variants: Record<SurfaceVariant, string> = {
    default: "shadow-sm",
    floating: "shadow-md",
    inset: "bg-muted/20 shadow-none",
    glass: `${GLASS_CLASSES.card} rounded-2xl shadow-sm`,
  };

  return (
    <div
      className={cn(variant === "glass" ? variants.glass : cn(base, variants[variant]), className)}
      {...props}
    />
  );
}
