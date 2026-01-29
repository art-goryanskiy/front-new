import { cn } from "@/lib/utils";
import * as React from "react";

export function Kbd({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/30 px-2 py-1 text-[11px] font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
