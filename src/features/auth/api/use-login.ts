import {
  LoginInput,
  UserEntity,
} from "@/shared/api/generated/graphql";
import { ME } from "@/shared/api/queries/auth";
import { LOGIN } from "@/shared/api/mutations/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import { useMutation } from "@apollo/client/react";
import { useApolloClient } from "@apollo/client/react";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const client = useApolloClient();
  const [loginMutation, { loading, error }] = useMutation<{
    login: UserEntity;
  }>(LOGIN);

  const login = async (input: LoginInput) => {
    const result = await loginMutation({ variables: { input } });
    if (result.data?.login) {
      setUser(result.data.login);
      setLoading(false);
      try {
        const { data } = await client.query<{
          me: UserEntity | null;
        }>({
          query: ME,
          fetchPolicy: "network-only",
        });
        if (data?.me) setUser(data.me);
      } catch {
        // Оставляем пользователя из login, профиль подгрузится при следующем ME
      }
      return result.data.login;
    }
  };

  return { login, loading, error };
}
