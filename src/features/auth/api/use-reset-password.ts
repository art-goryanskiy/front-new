import { ResetPasswordInput } from "@/shared/api/generated/graphql";
import { RESET_PASSWORD } from "@/shared/api/mutations/auth";
import { useMutation } from "@apollo/client/react";

export function useResetPassword() {
  const [mutate, { loading, error, data }] = useMutation<{
    resetPassword: boolean;
  }>(RESET_PASSWORD);

  const resetPassword = async (input: ResetPasswordInput) => {
    const result = await mutate({ variables: { input } });
    return result.data?.resetPassword ?? false;
  };

  return {
    resetPassword,
    loading,
    error,
    data,
  };
}
