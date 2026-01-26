"use client";

import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useProgramModalState } from "@/shared/store/ui-store";
import { useCreateProgram } from "@/entities/program/api/use-create-programs";
import { useUpdateProgram } from "@/entities/program/api/use-update-program";
import { useProgramFormConfig } from "./hooks/use-program-form-config";
import {
  getDefaultValues,
  createProgramInput,
  updateProgramInput,
} from "./utils/program-form-utils";
import {
  FORM_CLASSES,
  FORM_MESSAGES,
} from "./constants/program-form-constants";
import type {
  ProgramFormData,
  ProgramFormProps,
} from "./types/program-form.types";
import { ProgramFormTitleField } from "./fields/program-form-title-field";
import { ProgramFormDescriptionField } from "./fields/program-form-description-field";
import { ProgramFormStudentCategoryField } from "./fields/program-form-student-category-field";
import { ProgramFormAwardedQualificationField } from "./fields/program-form-awarded-qualification-field";
import { ProgramFormAwardedRankFields } from "./fields/program-form-awarded-rank-fields";
import { ProgramFormPricingFields } from "./fields/program-form-pricing-fields";
import { ProgramFormSubProgramsFields } from "./fields/program-form-subprograms-fields";

interface ErrorLike {
  message?: string;
}

interface ProgramFormErrorProps {
  error: ErrorLike | undefined;
  isEditMode: boolean;
}

const ProgramFormError = memo(function ProgramFormError({
  error,
  isEditMode,
}: ProgramFormErrorProps) {
  if (!error) return null;

  return (
    <div className={FORM_CLASSES.errorContainer}>
      <p className={FORM_CLASSES.errorText}>
        {error.message ||
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} программы`}
      </p>
    </div>
  );
});

export const ProgramForm = memo(function ProgramForm({
  editingProgram,
  categoryId,
  categoryType,
}: ProgramFormProps) {
  const isEditMode = !!editingProgram;
  const {
    createProgram,
    loading: creating,
    error: createError,
  } = useCreateProgram();
  const {
    updateProgram,
    loading: updating,
    error: updateError,
  } = useUpdateProgram();

  const { closeProgramModal: closeModal } = useProgramModalState();

  const loading = creating || updating;
  const error = createError || updateError;

  const config = useProgramFormConfig(categoryType);

  const defaultValues = useMemo(
    () => getDefaultValues(editingProgram),
    [editingProgram]
  );

  const { control, handleSubmit, reset } = useForm<ProgramFormData>({
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: ProgramFormData) => {
      try {
        if (isEditMode && editingProgram) {
          const input = updateProgramInput(data, config);
          await updateProgram(editingProgram.id, input);
          closeModal();
        } else {
          const input = createProgramInput(data, categoryId, config);
          await createProgram(input);
          closeModal();
        }

        reset();
      } catch (err) {
        console.error(
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} программы:`,
          err
        );
      }
    },
    [
      isEditMode,
      editingProgram,
      config,
      updateProgram,
      categoryId,
      createProgram,
      closeModal,
      reset,
    ]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={FORM_CLASSES.form}
    >
      <ProgramFormError error={error} isEditMode={isEditMode} />

      {/* Основная информация */}
      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>
          Основная информация
        </h3>
        <ProgramFormTitleField control={control} />
        <ProgramFormDescriptionField control={control} />
        <ProgramFormStudentCategoryField control={control} />
      </div>

      {/* Квалификация и разряд */}
      {(config.showAwardedQualification ||
        config.showAwardedRank) && (
        <div className={FORM_CLASSES.section}>
          <h3 className={FORM_CLASSES.sectionTitle}>Квалификация</h3>
          {config.showAwardedQualification && (
            <ProgramFormAwardedQualificationField control={control} />
          )}
          {config.showAwardedRank && (
            <ProgramFormAwardedRankFields control={control} />
          )}
        </div>
      )}

      {/* Цены и часы */}
      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>Цены и часы</h3>
        <ProgramFormPricingFields control={control} />
      </div>

      {/* Подпрограммы */}
      {config.showSubPrograms && (
        <div className={FORM_CLASSES.section}>
          <h3 className={FORM_CLASSES.sectionTitle}>Подпрограммы</h3>
          <ProgramFormSubProgramsFields control={control} />
        </div>
      )}

      {/* Действия */}
      <div className={FORM_CLASSES.actions}>
        <Button
          type="button"
          variant="ghost"
          onClick={closeModal}
          disabled={loading}
          className="min-w-24"
        >
          {FORM_MESSAGES.cancel}
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
        >
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" size={16} />
              {isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create}
            </>
          ) : (
            isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create
          )}
        </Button>
      </div>
    </form>
  );
});
