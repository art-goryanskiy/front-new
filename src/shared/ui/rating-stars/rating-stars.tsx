"use client";

import { cn } from "@/lib/utils";

const MAX_DOTS = 5;

interface RatingStarsProps {
  /** Rating from 0 to 5 */
  rating: number;
  className?: string;
  size?: "sm" | "md";
  showValue?: boolean;
}

export function RatingStars({
  rating,
  className,
  size = "sm",
  showValue = false,
}: RatingStarsProps) {
  const clamped = Math.min(MAX_DOTS, Math.max(0, rating));
  const sizeClass = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  const borderClass = size === "sm" ? "border-[1.5px]" : "border-2";

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`Рейтинг: ${clamped.toFixed(1)} из ${MAX_DOTS}`}
    >
      {Array.from({ length: MAX_DOTS }, (_, i) => {
        const filled = clamped >= i + 0.5;
        return (
          <span
            key={i}
            className={cn(
              "shrink-0 rounded-full border",
              sizeClass,
              borderClass,
              filled
                ? "border-primary/70 bg-primary/10"
                : "border-border bg-transparent"
            )}
            style={
              filled
                ? {
                    boxShadow:
                      "0 0 6px color-mix(in srgb, var(--primary) 35%, transparent)",
                  }
                : undefined
            }
          />
        );
      })}
      {showValue && (
        <span className="ml-1 text-xs font-medium text-muted-foreground">
          {clamped.toFixed(1)} / {MAX_DOTS}
        </span>
      )}
    </div>
  );
}
