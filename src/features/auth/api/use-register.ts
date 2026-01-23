import { RegisterInput } from "@/shared/api/generated/graphql";
import { REGISTER } from "@/shared/api/mutations/auth";
import { useMutation } from "@apollo/client/react";

export function useRegister() {
  const [registerMutation, { loading, error }] = useMutation<{
    register: boolean;
  }>(REGISTER);

  const register = async (input: RegisterInput) => {
    try {
      const result = await registerMutation({ variables: { input } });
      return result.data?.register ?? false;
    } catch (error) {
      throw error;
    }
  };

  return { register, loading, error };
}
