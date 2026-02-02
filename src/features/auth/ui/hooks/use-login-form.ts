"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "../../api/use-login";
import {
  prepareLoginInput,
  getDefaultValues,
} from "../utils/login-form-utils";
import type { LoginFormData } from "../types/login-form.types";
import { getReturnUrl } from "@/shared/lib/auth/utils/auth-redirect-utils";
import { AUTH_GUARD_ROUTES } from "@/shared/lib/auth/constants/auth-guard-constants";

/**
 * Хук для управления формой входа
 */
export function useLoginForm() {
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const input = prepareLoginInput(data);
      await login(input);

      // Получаем сохраненный URL или используем дефолтный
      const returnUrl = getReturnUrl(AUTH_GUARD_ROUTES.admin);
      router.push(returnUrl);
    } catch {
      // Ошибка отображается через error из useLogin
    }
  };

  return {
    form,
    onSubmit,
    loading,
    error,
  };
}
