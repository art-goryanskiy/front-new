"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRegister } from "../../api/use-register";
import type { RegisterFormData } from "../types/register-form.types";
import {
  getDefaultValues,
  prepareRegisterInput,
} from "../utils/register-form-utils";

/**
 * Хук для управления формой регистрации
 */
export function useRegisterForm() {
  const { register: registerUser, loading, error } = useRegister();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const input = prepareRegisterInput(data);
      await registerUser(input);
      // После успешной регистрации перенаправляем на страницу верификации
      router.push(
        "/verify-email?email=" + encodeURIComponent(data.email)
      );
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
    }
  };

  return {
    form,
    onSubmit,
    loading,
    error,
  };
}
