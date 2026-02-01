import * as React from "react";
import { cn } from "@/lib/utils";

type SurfaceVariant = "default" | "floating" | "inset";

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
  };

  return (
    <div
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}
