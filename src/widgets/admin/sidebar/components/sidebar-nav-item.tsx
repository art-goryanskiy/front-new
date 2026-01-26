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

export const SidebarNavItem = memo(function SidebarNavItem({
  item,
  isActive,
  isCollapsed,
  onNavigate,
}: SidebarNavItemProps) {
  const handleClick = useCallback(() => {
    onNavigate(item.path);
  }, [onNavigate, item.path]);

  const buttonClasses = useMemo(
    () =>
      `${SIDEBAR_CLASSES.navItem.base} ${
        isCollapsed
          ? SIDEBAR_CLASSES.navItem.collapsed
          : SIDEBAR_CLASSES.navItem.expanded
      } ${
        isActive
          ? SIDEBAR_CLASSES.navItem.active
          : SIDEBAR_CLASSES.navItem.inactive
      }`,
    [isCollapsed, isActive]
  );

  const iconClasses = useMemo(
    () =>
      `${SIDEBAR_CLASSES.navItem.icon} ${
        isActive ? SIDEBAR_CLASSES.navItem.iconActive : ""
      }`,
    [isActive]
  );

  const button = (
    <Button
      key={item.path}
      variant={isActive ? "default" : "ghost"}
      className={buttonClasses}
      onClick={handleClick}
    >
      <Icon
        name={item.icon}
        className={iconClasses}
        size={ICON_SIZES.desktop}
        aria-label={item.label}
      />
      {!isCollapsed && (
        <span className={SIDEBAR_CLASSES.navItem.label}>{item.label}</span>
      )}
    </Button>
  );

  return isCollapsed ? (
    <TooltipProvider key={item.path}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
});
