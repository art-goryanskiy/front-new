import { create } from "zustand/react";
import { useShallow } from "zustand/shallow";
import { UserEntity } from "../api/generated/graphql";

interface AuthStore {
  user: UserEntity | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: UserEntity | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === "ADMIN" || false,
    }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false,
    }),
}));

// Оптимизированные селекторы для минимизации ререндеров
export const useAuthUser = () =>
  useAuthStore(useShallow((state) => state.user));
export const useAuthStatus = () =>
  useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isAdmin: state.isAdmin,
      isLoading: state.isLoading,
    }))
  );
export const useCanSeePrice = () =>
  useAuthStore(
    useShallow((state) => state.isAuthenticated || !!state.user)
  );
