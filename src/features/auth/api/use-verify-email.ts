import { VerifyEmailInput } from "@/shared/api/generated/graphql";
import { VERIFY_EMAIL } from "@/shared/api/mutations/auth";
import { useMutation } from "@apollo/client/react";

export function useVerifyEmail() {
  const [verifyEmailMutation, { loading, error }] = useMutation<{
    verifyEmail: boolean;
  }>(VERIFY_EMAIL);

  const verifyEmail = async (input: VerifyEmailInput) => {
    try {
      const result = await verifyEmailMutation({ variables: { input } });
      return result.data?.verifyEmail ?? false;
    } catch (error) {
      throw error;
    }
  };

  return { verifyEmail, loading, error };
}
