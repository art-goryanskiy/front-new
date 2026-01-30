"use client";

import { memo } from "react";
import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormStudentCategoryFieldProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormStudentCategoryField = memo(
  function ProgramFormStudentCategoryField({
    control,
  }: ProgramFormStudentCategoryFieldProps) {
    return (
      <Controller
        name="studentCategory"
        control={control}
        render={({ field }) => (
          <div className="w-full space-y-2">
            <div className="group relative pt-2">
              <Label
                htmlFor="studentCategory"
                className={cn(
                  "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm transition-colors",
                  "group-focus-within:text-foreground"
                )}
              >
                {FORM_LABELS.studentCategory}
              </Label>
              <Textarea
                {...field}
                id="studentCategory"
                placeholder={FORM_PLACEHOLDERS.studentCategory}
                aria-label={FORM_LABELS.studentCategory}
                rows={3}
                className="peer w-full bg-background/60"
              />
            </div>
          </div>
        )}
      />
    );
  }
);
