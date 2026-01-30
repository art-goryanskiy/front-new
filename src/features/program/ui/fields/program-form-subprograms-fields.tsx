"use client";

import { memo, useCallback } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
  FORM_CLASSES,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormSubProgramsFieldsProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormSubProgramsFields = memo(
  function ProgramFormSubProgramsFields({
    control,
  }: ProgramFormSubProgramsFieldsProps) {
    const {
      fields: subProgramFields,
      append: appendSubProgram,
      remove: removeSubProgram,
    } = useFieldArray({
      control,
      name: "subPrograms",
    });

    const handleAppendSubProgram = useCallback(() => {
      appendSubProgram({ title: "", description: "" });
    }, [appendSubProgram]);

    const handleRemoveSubProgram = useCallback(
      (index: number) => {
        removeSubProgram(index);
      },
      [removeSubProgram]
    );

    return (
      <div className={FORM_CLASSES.subProgramsContainer}>
        <p className={FORM_CLASSES.subProgramsDescription}>
          {FORM_MESSAGES.subProgramsDescription}
        </p>
        {subProgramFields.map((field, index) => (
          <div key={field.id} className={FORM_CLASSES.subProgramCard}>
            <Controller
              name={`subPrograms.${index}.title`}
              control={control}
              render={({ field }) => (
                <div className="w-full space-y-2">
                  <Label htmlFor={`subprogram-title-${index}`}>
                    {FORM_LABELS.subProgramTitle}
                  </Label>
                  <Input
                    {...field}
                    id={`subprogram-title-${index}`}
                    placeholder={FORM_PLACEHOLDERS.subProgramTitle}
                    aria-label={`${FORM_LABELS.subProgramTitle} ${index + 1}`}
                    className="w-full"
                  />
                </div>
              )}
            />
            <Controller
              name={`subPrograms.${index}.description`}
              control={control}
              render={({ field }) => (
                <div className="w-full space-y-2">
                  <Label htmlFor={`subprogram-desc-${index}`}>
                    {FORM_LABELS.subProgramDescription}
                  </Label>
                  <Textarea
                    {...field}
                    id={`subprogram-desc-${index}`}
                    placeholder={
                      FORM_PLACEHOLDERS.subProgramDescription
                    }
                    rows={2}
                    aria-label={`${FORM_LABELS.subProgramDescription} ${index + 1}`}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    {FORM_MESSAGES.subProgramOptional}
                  </p>
                </div>
              )}
            />
            {subProgramFields.length > 1 && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveSubProgram(index)}
                  aria-label={`${FORM_MESSAGES.removeSubProgram} ${index + 1}`}
                >
                  {FORM_MESSAGES.removeSubProgram}
                </Button>
              </div>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAppendSubProgram}
          className="w-full"
        >
          {FORM_MESSAGES.addSubProgram}
        </Button>
      </div>
    );
  }
);
