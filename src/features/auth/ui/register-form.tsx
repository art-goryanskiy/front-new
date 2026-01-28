"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { memo } from "react";
import { RegisterFormError } from "./components/register-form-error";
import {
  REGISTER_FORM_CLASSES,
  REGISTER_FORM_TEXTS,
} from "./constants/register-form-constants";
import { RegisterFormConfirmPasswordField } from "./fields/register-form-confirm-password-field";
import { RegisterFormEmailField } from "./fields/register-form-email-field";
import { RegisterFormPasswordField } from "./fields/register-form-password-field";
import { useRegisterForm } from "./hooks/use-register-form";

export const RegisterForm = memo(function RegisterForm() {
  const { form, onSubmit, loading, error } = useRegisterForm();
  const { control, handleSubmit } = form;

  return (
    <div className={REGISTER_FORM_CLASSES.container}>
      <h1 className={REGISTER_FORM_CLASSES.title}>
        {REGISTER_FORM_TEXTS.title}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={REGISTER_FORM_CLASSES.form}
      >
        <RegisterFormError error={error} />

        <RegisterFormEmailField control={control} />
        <RegisterFormPasswordField control={control} />
        <RegisterFormConfirmPasswordField control={control} />

        <Button
          type="submit"
          className={REGISTER_FORM_CLASSES.submitButton}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" size={16} />
              {REGISTER_FORM_TEXTS.submit}
            </>
          ) : (
            REGISTER_FORM_TEXTS.submit
          )}
        </Button>
      </form>
    </div>
  );
});
