"use client";

import { memo } from "react";
import { Form, Button } from "@heroui/react";
import { useRegisterForm } from "./hooks/use-register-form";
import { RegisterFormError } from "./components/register-form-error";
import { RegisterFormEmailField } from "./fields/register-form-email-field";
import { RegisterFormPasswordField } from "./fields/register-form-password-field";
import {
  REGISTER_FORM_TEXTS,
  REGISTER_FORM_CLASSES,
} from "./constants/register-form-constants";

export const RegisterForm = memo(function RegisterForm() {
  const { form, onSubmit, loading, error } = useRegisterForm();
  const { control, handleSubmit } = form;

  return (
    <div className={REGISTER_FORM_CLASSES.container}>
      <h1 className={REGISTER_FORM_CLASSES.title}>
        {REGISTER_FORM_TEXTS.title}
      </h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        validationBehavior="native"
        className={REGISTER_FORM_CLASSES.form}
      >
        <RegisterFormError error={error} />

        <RegisterFormEmailField control={control} />
        <RegisterFormPasswordField control={control} />

        <Button
          type="submit"
          color="primary"
          className={REGISTER_FORM_CLASSES.submitButton}
          isLoading={loading}
        >
          {REGISTER_FORM_TEXTS.submit}
        </Button>
      </Form>
    </div>
  );
});
