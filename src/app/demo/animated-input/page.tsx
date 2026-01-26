"use client";

import { OrbInput } from "@/components/ui/animated-input";

export default function AnimatedInputDemoPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="mx-auto max-w-2xl space-y-12">
        <h1 className="text-2xl font-bold text-foreground">
          OrbInput — строка поиска в стиле orb
        </h1>
        <OrbInput />
      </div>
    </div>
  );
}
