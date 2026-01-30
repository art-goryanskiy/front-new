import { RequestPasswordResetInput } from "@/shared/api/generated/graphql";
import { REQUEST_PASSWORD_RESET } from "@/shared/api/mutations/auth";
import { useMutation } from "@apollo/client/react";

export function useRequestPasswordReset() {
  const [mutate, { loading, error, data }] = useMutation<{
    requestPasswordReset: boolean;
  }>(REQUEST_PASSWORD_RESET);

  const requestPasswordReset = async (
    input: RequestPasswordResetInput
  ) => {
    const result = await mutate({ variables: { input } });
    return result.data?.requestPasswordReset ?? false;
  };

  return {
    requestPasswordReset,
    loading,
    error,
    data,
  };
}
