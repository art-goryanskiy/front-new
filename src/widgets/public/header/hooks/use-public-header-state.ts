import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/shared/store/auth-store";
import { useLogout } from "@/features/auth/api/use-logout";
import { HEADER_MENU_BUTTON_ID } from "../constants/public-header-constants";
import type { PublicSearchResult } from "../hooks/use-public-search-results";
import { startTransition } from "react";

interface PublicHeaderState {
  searchValue: string;
  isSearchOpen: boolean;
  isSearchExpanded: boolean;
  isMobileMenuOpen: boolean;
  isMounted: boolean;
}

export function usePublicHeaderState() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthUser();
  const { logout } = useLogout();

  const [state, setState] = useState<PublicHeaderState>({
    searchValue: "",
    isSearchOpen: false,
    isSearchExpanded: false,
    isMobileMenuOpen: false,
    isMounted: false,
  });

  const searchValueRef = useRef(state.searchValue);
  const prevPathnameRef = useRef(pathname);

  // Инициализация mounted
  useEffect(() => {
    queueMicrotask(() => {
      setState((prev) => ({ ...prev, isMounted: true }));
    });
  }, []);

  // Синхронизация searchValueRef
  useEffect(() => {
    searchValueRef.current = state.searchValue;
  }, [state.searchValue]);

  // Закрытие мобильного меню при смене пути
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (state.isMobileMenuOpen) {
        startTransition(() => {
          setState((prev) => ({ ...prev, isMobileMenuOpen: false }));
        });
      }
    }
  }, [pathname, state.isMobileMenuOpen]);

  // Управление overflow body при открытии мобильного меню
  useEffect(() => {
    if (state.isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isMobileMenuOpen]);

  // Возврат фокуса на кнопку меню при закрытии
  const prevMenuOpenRef = useRef(state.isMobileMenuOpen);
  useEffect(() => {
    if (prevMenuOpenRef.current && !state.isMobileMenuOpen) {
      const t = setTimeout(
        () => document.getElementById(HEADER_MENU_BUTTON_ID)?.focus(),
        0
      );
      return () => clearTimeout(t);
    }
    prevMenuOpenRef.current = state.isMobileMenuOpen;
  }, [state.isMobileMenuOpen]);

  // Обработчики
  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
  }, [logout, router]);

  const handleSearchIconClick = useCallback(() => {
    setState((prev) => ({ ...prev, isSearchExpanded: true }));
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      searchValue: value,
      isSearchOpen: value.length > 0,
    }));
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchValueRef.current.length > 0) {
      setState((prev) => ({ ...prev, isSearchOpen: true }));
    }
  }, []);

  const handleSearchSelect = useCallback(
    (result: PublicSearchResult) => {
      router.push(result.path);
      setState((prev) => ({
        ...prev,
        searchValue: "",
        isSearchOpen: false,
        isSearchExpanded: false,
      }));
    },
    [router]
  );

  const handleSearchClose = useCallback(() => {
    setState((prev) => {
      const newState = {
        ...prev,
        isSearchOpen: false,
      };
      if (searchValueRef.current.length === 0) {
        newState.isSearchExpanded = false;
      }
      return newState;
    });
  }, []);

  /** Закрыть панель поиска полностью (с кнопки «Закрыть») */
  const handleSearchPanelClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSearchExpanded: false,
      isSearchOpen: false,
    }));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen,
    }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isMobileMenuOpen: false }));
  }, []);

  const handleLoginClick = useCallback(() => {
    router.push("/login");
  }, [router]);

  // Закрытие поиска при клике вне
  useEffect(() => {
    if (!state.isSearchExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        target &&
        "closest" in target &&
        (target as Element).closest?.("[data-user-menu]")
      ) {
        return;
      }
      if (searchValueRef.current.length === 0) {
        setState((prev) => ({
          ...prev,
          isSearchExpanded: false,
          isSearchOpen: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.isSearchExpanded]);

  return {
    state,
    user,
    handleLogout,
    handleSearchIconClick,
    handleSearchChange,
    handleSearchFocus,
    handleSearchSelect,
    handleSearchClose,
    handleSearchPanelClose,
    toggleMobileMenu,
    closeMobileMenu,
    handleLoginClick,
  };
}
