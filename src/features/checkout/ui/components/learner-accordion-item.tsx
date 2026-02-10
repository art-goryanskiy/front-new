"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { LearnerFormData } from "../types/learner-form-data.types";

function learnerShortLabel(data: LearnerFormData): string {
  const hasName =
    data.lastName?.trim() || data.firstName?.trim() || data.middleName?.trim();
  if (hasName) {
    const last = (data.lastName?.trim() || "").trim();
    const first = (data.firstName?.trim() || "").charAt(0);
    const middle = (data.middleName?.trim() || "").charAt(0);
    const parts = [last];
    if (first) parts.push(`${first}.`);
    if (middle) parts.push(`${middle}.`);
    return parts.join(" ") || "Слушатель";
  }
  return "Слушатель";
}

interface LearnerAccordionItemProps {
  index: number;
  data: LearnerFormData;
  defaultOpen?: boolean;
  title?: string;
  children: ReactNode;
}

export function LearnerAccordionItem({
  index,
  data,
  defaultOpen = false,
  title,
  children,
}: LearnerAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const label = title ?? `${learnerShortLabel(data)} ${index + 1}`;

  return (
    <div className="rounded-lg border border-border/50 bg-background/80 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium transition-colors",
          "hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          open && "bg-muted/30"
        )}
        aria-expanded={open}
      >
        <span className="text-foreground">{label}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open && (
        <div className="border-t border-border/50 p-3" role="region">
          {children}
        </div>
      )}
    </div>
  );
}
