"use client";

import { useMutation } from "@apollo/client/react";
import { LOGOUT } from "@/shared/api/mutations/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import { useRouter } from "next/navigation";

export function useLogout() {
  const logoutStore = useAuthStore((state) => state.logout);
  const router = useRouter();

  const [logoutMutation, { loading }] = useMutation(LOGOUT);

  const logout = async () => {
    try {
      await logoutMutation();
      logoutStore();
      router.push("/login");
    } catch {
      // Выходим даже при ошибке
      logoutStore();
      router.push("/login");
    }
  };

  return {
    logout,
    loading,
  };
}
