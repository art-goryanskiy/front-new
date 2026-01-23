import {
  LoginInput,
  UserEntity,
} from "@/shared/api/generated/graphql";
import { LOGIN } from "@/shared/api/mutations/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import { useMutation } from "@apollo/client/react";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const [loginMutation, { loading, error }] = useMutation<{
    login: UserEntity;
  }>(LOGIN);

  const login = async (input: LoginInput) => {
    const result = await loginMutation({ variables: { input } });
    if (result.data?.login) {
      setUser(result.data.login);
      setLoading(false);
      return result.data.login;
    }
  };

  return { login, loading, error };
}
