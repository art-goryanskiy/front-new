"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface ComponentExampleProps {
  className?: string;
  title?: string;
}

export function ComponentExample({
  className,
  title = "Component Example",
}: ComponentExampleProps) {
  const [count, setCount] = useState(0);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm",
        className
      )}
    >
      <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
      <h2 className="text-xl font-semibold text-foreground">{count}</h2>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setCount((prev) => prev - 1)}
          aria-label="Уменьшить"
        >
          −
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setCount((prev) => prev + 1)}
          aria-label="Увеличить"
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default ComponentExample;
