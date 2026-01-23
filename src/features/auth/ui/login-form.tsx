"use client";

import { memo } from "react";
import { Form, Button } from "@heroui/react";
import { useLoginForm } from "./hooks/use-login-form";
import { LoginFormError } from "./components/login-form-error";
import { LoginFormEmailField } from "./fields/login-form-email-field";
import { LoginFormPasswordField } from "./fields/login-form-password-field";
import {
  LOGIN_FORM_TEXTS,
  LOGIN_FORM_CLASSES,
} from "./constants/login-form-constants";

export const LoginForm = memo(function LoginForm() {
  const { form, onSubmit, loading, error } = useLoginForm();
  const { control, handleSubmit } = form;

  return (
    <div className={LOGIN_FORM_CLASSES.container}>
      <h1 className={LOGIN_FORM_CLASSES.title}>
        {LOGIN_FORM_TEXTS.title}
      </h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        validationBehavior="native"
        className={LOGIN_FORM_CLASSES.form}
      >
        <LoginFormError error={error} />

        <LoginFormEmailField control={control} />
        <LoginFormPasswordField control={control} />

        <Button
          type="submit"
          color="primary"
          className={LOGIN_FORM_CLASSES.submitButton}
          isLoading={loading}
        >
          {LOGIN_FORM_TEXTS.submit}
        </Button>
      </Form>
    </div>
  );
});
