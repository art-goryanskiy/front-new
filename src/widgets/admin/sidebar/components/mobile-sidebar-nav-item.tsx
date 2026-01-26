"use client";

import { memo, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Icon } from "@/shared/ui/icons/icon";
import { SIDEBAR_CLASSES, ICON_SIZES } from "../constants/sidebar-constants";
import type { SidebarNavItemProps } from "../types/sidebar.types";

export const MobileSidebarNavItem = memo(function MobileSidebarNavItem({
  item,
  isActive,
  onNavigate,
}: Omit<SidebarNavItemProps, "isCollapsed">) {
  const handleClick = useCallback(() => {
    onNavigate(item.path);
  }, [onNavigate, item.path]);

  const buttonClasses = useMemo(
    () =>
      `${SIDEBAR_CLASSES.navItem.mobile.base} ${
        isActive
          ? SIDEBAR_CLASSES.navItem.mobile.active
          : SIDEBAR_CLASSES.navItem.mobile.inactive
      }`,
    [isActive]
  );

  const button = (
    <Button
      key={item.path}
      variant={isActive ? "default" : "ghost"}
      size="icon"
      className={buttonClasses}
      onClick={handleClick}
      aria-label={item.label}
    >
      <Icon name={item.icon} size={ICON_SIZES.mobile} aria-hidden="true" />
    </Button>
  );

  return (
    <TooltipProvider key={item.path}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">{item.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
