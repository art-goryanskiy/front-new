import { useEffect } from "react";
import { useMediaQuery } from "@/shared/lib/hooks/use-media-query";
import { useSidebarStore } from "@/shared/store/sidebar-store";
import { SIDEBAR_BREAKPOINT } from "../constants/sidebar-constants";

/**
 * Хук для управления сворачиванием сайдбара на маленьких экранах
 */
export function useSidebarCollapse() {
  const isSmallScreen = useMediaQuery(SIDEBAR_BREAKPOINT);
  const setCollapsed = useSidebarStore((state) => state.setCollapsed);

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    }
  }, [isSmallScreen, setCollapsed]);
}
