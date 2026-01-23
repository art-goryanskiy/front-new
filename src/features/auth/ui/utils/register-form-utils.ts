import type { RegisterFormData } from "../types/register-form.types";
import type { RegisterInput } from "@/shared/api/generated/graphql";

/**
 * Преобразует данные формы в формат для API
 */
export function prepareRegisterInput(
  data: RegisterFormData
): RegisterInput {
  return {
    email: data.email,
    password: data.password,
  };
}

/**
 * Получает значения по умолчанию для формы
 */
export function getDefaultValues(): RegisterFormData {
  return {
    email: "",
    password: "",
  };
}
