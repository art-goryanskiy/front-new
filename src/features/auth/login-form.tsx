"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input } from "@heroui/react";
import { useLogin } from "./api/use-login";
import { useRouter } from "next/navigation";
import type { LoginInput } from "@/shared/api/generated/graphql";

interface FormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const input: LoginInput = {
        email: data.email,
        password: data.password,
      };

      await login(input);
      router.push("/admin");
    } catch (err) {
      console.error("Ошибка при входе:", err);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior="native"
      className="space-y-4"
    >
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">
            {error.message || "Неверный email или пароль"}
          </p>
        </div>
      )}

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email обязателен",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неверный формат email",
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="email"
            label="Email"
            placeholder="Введите email"
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: "Пароль обязателен" }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            isRequired
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button
        type="submit"
        color="primary"
        className="w-full"
        isLoading={loading}
      >
        Войти
      </Button>
    </Form>
  );
}
