"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRequestPasswordReset } from "@/features/auth/api/use-request-password-reset";
import { cn } from "@/lib/utils";
import { FormErrorSummary } from "@/shared/ui/form-error-summary/form-error-summary";
import { Surface } from "@/shared/ui/surface/surface";
import { memo, useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type ForgotPasswordFormData = {
  email: string;
};

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const ForgotPasswordForm = memo(function ForgotPasswordForm({
  onBackToLogin,
}: {
  onBackToLogin: () => void;
}) {
  const { requestPasswordReset, loading, error } =
    useRequestPasswordReset();
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
  });

  const emailRules = useMemo(
    () => ({
      required: "Email обязателен",
      pattern: {
        value: EMAIL_REGEX,
        message: "Неверный формат email",
      },
    }),
    []
  );

  const onInvalid = useCallback(() => {
    const el = document.getElementById(
      "forgot-password-error-summary"
    );
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      // Security-friendly: always show success UI regardless of backend result
      try {
        await requestPasswordReset({ email: data.email });
      } finally {
        setSent(true);
      }
    },
    [requestPasswordReset]
  );

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className="space-y-5"
    >
      <div id="forgot-password-error-summary">
        <FormErrorSummary<ForgotPasswordFormData>
          errors={form.formState.errors}
          labels={{ email: "Email" }}
        />
      </div>

      {error && !sent && (
        <Surface
          variant="default"
          className="w-full border-destructive/30 bg-destructive/10 p-4"
          role="alert"
        >
          <p className="text-sm font-medium text-destructive">
            {error.message || "Ошибка при отправке письма"}
          </p>
        </Surface>
      )}

      {sent ? (
        <Surface
          variant="default"
          className="w-full border-border/60 bg-muted/20 p-4"
        >
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">
              Если такой email существует — мы отправили письмо
            </div>
            <p className="text-sm text-muted-foreground">
              Проверьте “Входящие” и “Спам”. Ссылка для сброса пароля
              обычно действует ограниченное время.
            </p>
          </div>
        </Surface>
      ) : (
        <Controller
          name="email"
          control={form.control}
          rules={emailRules}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <div className="group relative pt-2">
                <Label
                  htmlFor="email"
                  className={cn(
                    "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                    fieldState.invalid
                      ? "text-destructive"
                      : "text-muted-foreground group-focus-within:text-foreground"
                  )}
                >
                  Email
                </Label>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Введите email"
                  disabled={loading}
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "peer h-12 border-border/60 bg-background/60",
                    "focus:border-primary"
                  )}
                />
              </div>

              {fieldState.error?.message && (
                <p className="text-xs font-medium text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      )}

      <div className="flex flex-col gap-2">
        {sent ? (
          <Button
            type="button"
            className="h-12 w-full text-base font-medium"
            onClick={onBackToLogin}
          >
            Вернуться ко входу
          </Button>
        ) : (
          <Button
            type="submit"
            className="h-12 w-full text-base font-medium"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner size={18} className="h-[18px] w-[18px]" />
                Отправка…
              </span>
            ) : (
              "Отправить ссылку"
            )}
          </Button>
        )}

        {!sent && (
          <Button
            type="button"
            variant="ghost"
            className="h-11 w-full font-semibold"
            onClick={onBackToLogin}
            disabled={loading}
          >
            Назад
          </Button>
        )}
      </div>
    </form>
  );
});
