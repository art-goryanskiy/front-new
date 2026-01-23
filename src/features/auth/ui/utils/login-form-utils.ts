import type { LoginFormData } from "../types/login-form.types";
import type { LoginInput } from "@/shared/api/generated/graphql";

/**
 * Преобразует данные формы в формат для API
 */
export function prepareLoginInput(data: LoginFormData): LoginInput {
  return {
    email: data.email,
    password: data.password,
  };
}

/**
 * Получает значения по умолчанию для формы
 */
export function getDefaultValues(): LoginFormData {
  return {
    email: "",
    password: "",
  };
}
