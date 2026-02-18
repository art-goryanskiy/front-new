"use client";

import { memo } from "react";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";

export const PublicBackdrop = memo(function PublicBackdrop() {
  return (
    <BlurGlowBackground
      spots={[
        { position: "top-left", color: "bg-primary/10" },
        { position: "top-right", color: "bg-orange-500/10" },
        { position: "bottom-left", color: "bg-blue-500/10" },
      ]}
      className="overflow-hidden"
    >
      <div className="bg-grid-black/[0.04] dark:bg-grid-white/[0.05] absolute inset-0 bg-size-[20px_20px]" />
    </BlurGlowBackground>
  );
});
