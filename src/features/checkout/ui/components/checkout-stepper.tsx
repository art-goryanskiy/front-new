"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Заказчик" },
  { id: 2, label: "Слушатели" },
  { id: 3, label: "Подтверждение" },
] as const;

export type CheckoutStep = (typeof STEPS)[number]["id"];

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
  className?: string;
}

export function CheckoutStepper({ currentStep, className }: CheckoutStepperProps) {
  return (
    <nav
      aria-label="Прогресс оформления заявки"
      className={cn("w-full", className)}
    >
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === STEPS.length - 1;
          return (
            <li
              key={step.id}
              className={cn(
                "flex flex-1 items-center",
                !isLast && "flex-1"
              )}
            >
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent &&
                      "border-primary bg-background text-foreground ring-2 ring-primary ring-offset-2 ring-offset-background",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted-foreground/30 bg-muted/50 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    step.id
                  )}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium sm:text-sm",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1 rounded transition-colors sm:mx-3",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
