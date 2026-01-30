"use client";

import { memo } from "react";

export const PublicBackdrop = memo(function PublicBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid-black/[0.04] dark:bg-grid-white/[0.05] absolute inset-0 bg-size-[20px_20px]" />
      <div className="absolute -top-28 -left-28 h-[360px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -top-32 -right-28 h-[360px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-28 h-[420px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
    </div>
  );
});
