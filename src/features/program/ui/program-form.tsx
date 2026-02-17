"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateProgram } from "@/entities/program/api/use-create-programs";
import { useUpdateProgram } from "@/entities/program/api/use-update-program";
import { useProgramModalState } from "@/shared/store/modal-store";
import { useToastState } from "@/shared/store/toast-store";
import { getAdminFormErrorMessage } from "@/shared/lib/graphql/error-to-user-message";
import { FormErrorSummary } from "@/shared/ui/form-error-summary/form-error-summary";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  FORM_CLASSES,
  FORM_LABELS,
  FORM_MESSAGES,
} from "./constants/program-form-constants";
import { ProgramFormAwardedQualificationField } from "./fields/program-form-awarded-qualification-field";
import { ProgramFormEducationDocumentField } from "./fields/program-form-education-document-field";
import { ProgramFormAwardedRankFields } from "./fields/program-form-awarded-rank-fields";
import { ProgramFormDescriptionField } from "./fields/program-form-description-field";
import { ProgramFormPricingFields } from "./fields/program-form-pricing-fields";
import { ProgramFormShortTitleField } from "./fields/program-form-short-title-field";
import { ProgramFormStudentCategoryField } from "./fields/program-form-student-category-field";
import { ProgramFormSubProgramsFields } from "./fields/program-form-subprograms-fields";
import { ProgramFormTitleField } from "./fields/program-form-title-field";
import { useProgramFormConfig } from "./hooks/use-program-form-config";
import type {
  ProgramFormData,
  ProgramFormProps,
} from "./types/program-form.types";
import {
  createProgramInput,
  getDefaultValues,
  updateProgramInput,
} from "./utils/program-form-utils";

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

  const message = getAdminFormErrorMessage(
    error,
    `Ошибка при ${isEditMode ? "обновлении" : "создании"} программы`
  );

  return (
    <div className={FORM_CLASSES.errorContainer}>
      <p className={FORM_CLASSES.errorText}>{message}</p>
    </div>
  );
});

export const ProgramForm = memo(function ProgramForm({
  editingProgram,
  categoryId,
  categoryType,
  onDirtyChange,
  onBusyChange,
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
  const { showToast } = useToastState();

  const loading = creating || updating;
  const error = createError || updateError;

  const config = useProgramFormConfig(categoryType);

  const missingCategory = useMemo(
    () => !isEditMode && !categoryId,
    [isEditMode, categoryId]
  );

  const defaultValues = useMemo(
    () => getDefaultValues(editingProgram),
    [editingProgram]
  );

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<ProgramFormData>({
      defaultValues,
    });

  useEffect(() => {
    onDirtyChange?.(formState.isDirty);
  }, [formState.isDirty, onDirtyChange]);

  useEffect(() => {
    onBusyChange?.(loading);
  }, [loading, onBusyChange]);

  const onSubmit = useCallback(
    async (data: ProgramFormData) => {
      try {
        if (isEditMode && editingProgram) {
          const input = updateProgramInput(data, config);
          await updateProgram(editingProgram.id, input);
          showToast("success", "Программа обновлена");
          closeModal();
        } else {
          if (!categoryId) {
            showToast("error", "Выберите категорию для программы");
            return;
          }
          const input = createProgramInput(data, categoryId, config);
          await createProgram(input);
          showToast("success", "Программа создана");
          closeModal();
        }

        reset();
        onDirtyChange?.(false);
      } catch (err) {
        const message = getAdminFormErrorMessage(
          err,
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} программы`
        );
        showToast("error", message);
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
      showToast,
      onDirtyChange,
    ]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => {
        const el = document.getElementById("form-error-summary");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      })}
      className={FORM_CLASSES.form}
    >
      <div id="form-error-summary">
        <FormErrorSummary<ProgramFormData>
          errors={formState.errors}
          labels={{
            title: FORM_LABELS.title,
            shortTitle: FORM_LABELS.shortTitle,
            studentCategory: FORM_LABELS.studentCategory,
            awardedQualification: FORM_LABELS.awardedQualification,
          }}
        />
      </div>

      <ProgramFormError
        error={
          missingCategory
            ? {
                message:
                  "Выберите категорию, чтобы создать программу.",
              }
            : error
        }
        isEditMode={isEditMode}
      />

      {/* Основная информация */}
      <div className={FORM_CLASSES.section}>
        <h3 className={FORM_CLASSES.sectionTitle}>
          Основная информация
        </h3>
        <ProgramFormTitleField control={control} />
        <ProgramFormShortTitleField control={control} />
        <ProgramFormDescriptionField control={control} />
        <ProgramFormStudentCategoryField control={control} />
        <ProgramFormEducationDocumentField control={control} />
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
            <ProgramFormAwardedRankFields control={control} setValue={setValue} />
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
          disabled={loading || missingCategory}
          className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
        >
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" size={16} />
              {isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create}
            </>
          ) : isEditMode ? (
            FORM_MESSAGES.save
          ) : (
            FORM_MESSAGES.create
          )}
        </Button>
      </div>
    </form>
  );
});
