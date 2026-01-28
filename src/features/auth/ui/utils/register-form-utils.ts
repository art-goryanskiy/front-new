import type { RegisterInput } from "@/shared/api/generated/graphql";
import type { RegisterFormData } from "../types/register-form.types";

/**
 * Преобразует данные формы в формат для API
 */
export function prepareRegisterInput(
  data: RegisterFormData
): RegisterInput {
  return {
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };
}

/**
 * Получает значения по умолчанию для формы
 */
export function getDefaultValues(): RegisterFormData {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
}
