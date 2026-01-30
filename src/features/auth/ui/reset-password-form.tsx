"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useResetPassword } from "@/features/auth/api/use-reset-password";
import { cn } from "@/lib/utils";
import { FormErrorSummary } from "@/shared/ui/form-error-summary/form-error-summary";
import { Surface } from "@/shared/ui/surface/surface";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export const ResetPasswordForm = memo(function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, loading, error } = useResetPassword();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [activePasswordField, setActivePasswordField] = useState<
    "password" | "confirmPassword" | null
  >(null);

  const form = useForm<ResetPasswordFormData>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordRules = useMemo(
    () => ({
      required: "Пароль обязателен",
      minLength: { value: 6, message: "Минимум 6 символов" },
    }),
    []
  );

  const confirmRules = useMemo(
    () => ({
      required: "Подтверждение пароля обязательно",
      validate: (value: string) =>
        value === form.getValues("password") || "Пароли не совпадают",
    }),
    [form]
  );

  const onInvalid = useCallback(() => {
    const el = document.getElementById(
      "reset-password-error-summary"
    );
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handlePasswordKey = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      setCapsLockOn(e.getModifierState("CapsLock"));
    },
    []
  );

  // Avoid hydration mismatch: derive token only after mount.
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);

      const tokenFromSearch = searchParams.get("token");
      if (tokenFromSearch) {
        setToken(tokenFromSearch);
        return;
      }

      const hash = window.location.hash;
      const m = hash.match(/token=([^&]+)/);
      if (m?.[1]) setToken(decodeURIComponent(m[1]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      if (!token) return;
      setSubmitError(null);
      try {
        const ok = await resetPassword({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });

        if (!ok) {
          setSubmitError("Token expired or invalid");
          return;
        }

        setDone(true);
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Ошибка при сбросе пароля";
        setSubmitError(message);
      }
    },
    [resetPassword, token]
  );

  if (!mounted) {
    return (
      <Surface
        variant="default"
        className="w-full border-border/60 bg-muted/20 p-4"
      >
        <div className="flex items-center gap-3">
          <Spinner size={18} className="h-[18px] w-[18px]" />
          <div className="text-sm text-muted-foreground">
            Загрузка…
          </div>
        </div>
      </Surface>
    );
  }

  if (!token) {
    return (
      <Surface
        variant="default"
        className="w-full border-destructive/30 bg-destructive/10 p-4"
        role="alert"
      >
        <div className="space-y-2">
          <div className="text-sm font-semibold text-destructive">
            Неверная ссылка
          </div>
          <p className="text-sm text-muted-foreground">
            В ссылке отсутствует token. Откройте ссылку из письма ещё
            раз.
          </p>
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full font-semibold"
              onClick={() => router.push("/forgot-password")}
            >
              Запросить новую ссылку
            </Button>
          </div>
        </div>
      </Surface>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className="space-y-5"
    >
      <div id="reset-password-error-summary">
        <FormErrorSummary<ResetPasswordFormData>
          errors={form.formState.errors}
          labels={{
            password: "Новый пароль",
            confirmPassword: "Подтверждение пароля",
          }}
        />
      </div>

      {(submitError || error) && !done && (
        <Surface
          variant="default"
          className="w-full border-destructive/30 bg-destructive/10 p-4"
          role="alert"
        >
          <p className="text-sm font-medium text-destructive">
            {submitError ||
              error?.message ||
              "Ошибка при сбросе пароля"}
          </p>
          <div className="pt-3">
            <Button
              type="button"
              variant="outline"
              className="w-full font-semibold"
              onClick={() => router.push("/forgot-password")}
            >
              Запросить новую ссылку
            </Button>
          </div>
        </Surface>
      )}

      {done ? (
        <Surface
          variant="default"
          className="w-full border-border/60 bg-muted/20 p-4"
        >
          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">
              Пароль обновлён
            </div>
            <p className="text-sm text-muted-foreground">
              Теперь можно войти с новым паролем.
            </p>
            <Button
              type="button"
              className="h-11 w-full font-semibold"
              onClick={() => router.push("/login")}
            >
              Перейти ко входу
            </Button>
          </div>
        </Surface>
      ) : (
        <>
          <Controller
            name="password"
            control={form.control}
            rules={passwordRules}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <div className="group relative pt-2">
                  <Label
                    htmlFor="password"
                    className={cn(
                      "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                      fieldState.invalid
                        ? "text-destructive"
                        : "text-muted-foreground group-focus-within:text-foreground"
                    )}
                  >
                    Новый пароль
                  </Label>

                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Введите новый пароль"
                      disabled={loading}
                      aria-invalid={fieldState.invalid}
                      onKeyDown={handlePasswordKey}
                      onKeyUp={handlePasswordKey}
                      onFocus={() =>
                        setActivePasswordField("password")
                      }
                      onBlur={() =>
                        setActivePasswordField((v) =>
                          v === "password" ? null : v
                        )
                      }
                      className={cn(
                        "peer h-12 border-border/60 bg-background/60 pr-11",
                        "focus:border-primary"
                      )}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={loading}
                      className="absolute top-1/2 right-2 h-9 w-9 -translate-y-1/2 rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm backdrop-blur hover:bg-muted/20 hover:text-foreground"
                      aria-label={
                        showPassword
                          ? "Скрыть пароль"
                          : "Показать пароль"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {fieldState.error?.message && (
                  <p className="text-xs font-medium text-destructive">
                    {fieldState.error.message}
                  </p>
                )}

                {capsLockOn &&
                  !showPassword &&
                  activePasswordField === "password" && (
                    <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      Caps Lock включён
                    </div>
                  )}
              </div>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            rules={confirmRules}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <div className="group relative pt-2">
                  <Label
                    htmlFor="confirmPassword"
                    className={cn(
                      "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                      fieldState.invalid
                        ? "text-destructive"
                        : "text-muted-foreground group-focus-within:text-foreground"
                    )}
                  >
                    Подтверждение пароля
                  </Label>

                  <div className="relative">
                    <Input
                      {...field}
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Повторите пароль"
                      disabled={loading}
                      aria-invalid={fieldState.invalid}
                      onKeyDown={handlePasswordKey}
                      onKeyUp={handlePasswordKey}
                      onFocus={() =>
                        setActivePasswordField("confirmPassword")
                      }
                      onBlur={() =>
                        setActivePasswordField((v) =>
                          v === "confirmPassword" ? null : v
                        )
                      }
                      className={cn(
                        "peer h-12 border-border/60 bg-background/60 pr-11",
                        "focus:border-primary"
                      )}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={loading}
                      className="absolute top-1/2 right-2 h-9 w-9 -translate-y-1/2 rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm backdrop-blur hover:bg-muted/20 hover:text-foreground"
                      aria-label={
                        showPassword
                          ? "Скрыть пароль"
                          : "Показать пароль"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {fieldState.error?.message && (
                  <p className="text-xs font-medium text-destructive">
                    {fieldState.error.message}
                  </p>
                )}

                {capsLockOn &&
                  !showPassword &&
                  activePasswordField === "confirmPassword" && (
                    <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                      Caps Lock включён
                    </div>
                  )}
              </div>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full text-base font-medium"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner size={18} className="h-[18px] w-[18px]" />
                Сохранение…
              </span>
            ) : (
              "Сохранить пароль"
            )}
          </Button>
        </>
      )}
    </form>
  );
});
