"use client";

import { memo, useCallback, useMemo } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
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

    const classNames = useMemo(
      () => ({
        inputWrapper: "w-full",
        input: "w-full",
      }),
      []
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
                <Input
                  {...field}
                  label={FORM_LABELS.subProgramTitle}
                  placeholder={FORM_PLACEHOLDERS.subProgramTitle}
                  aria-label={`${FORM_LABELS.subProgramTitle} ${index + 1}`}
                  className="w-full"
                  classNames={classNames}
                />
              )}
            />
            <Controller
              name={`subPrograms.${index}.description`}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label={FORM_LABELS.subProgramDescription}
                  placeholder={
                    FORM_PLACEHOLDERS.subProgramDescription
                  }
                  minRows={2}
                  description={FORM_MESSAGES.subProgramOptional}
                  aria-label={`${FORM_LABELS.subProgramDescription} ${index + 1}`}
                  className="w-full"
                  classNames={classNames}
                />
              )}
            />
            {subProgramFields.length > 1 && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="light"
                  color="danger"
                  size="sm"
                  onPress={() => handleRemoveSubProgram(index)}
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
          variant="bordered"
          size="sm"
          onPress={handleAppendSubProgram}
          className="w-full"
        >
          {FORM_MESSAGES.addSubProgram}
        </Button>
      </div>
    );
  }
);
