"use client";

import { memo } from "react";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@/shared/ui/icons/icon";
import {
  SIDEBAR_TEXTS,
  SIDEBAR_CLASSES,
  ICON_SIZES,
} from "../constants/sidebar-constants";

interface SidebarFooterProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarFooter = memo(function SidebarFooter({
  isCollapsed,
  onToggle,
}: SidebarFooterProps) {
  return (
    <div className={SIDEBAR_CLASSES.desktop.footer}>
      {!isCollapsed && (
        <Button
          variant="light"
          className={SIDEBAR_CLASSES.desktop.collapseButton}
          onPress={onToggle}
          startContent={
            <Icon
              name="chevron-left"
              className="h-5 w-5 shrink-0"
              size={ICON_SIZES.footer}
              aria-label={SIDEBAR_TEXTS.collapseMenu}
            />
          }
        >
          <span
            className={SIDEBAR_CLASSES.desktop.collapseButtonText}
          >
            {SIDEBAR_TEXTS.collapseMenu}
          </span>
        </Button>
      )}
      {isCollapsed && (
        <Tooltip content={SIDEBAR_TEXTS.expandMenu} placement="right">
          <Button
            isIconOnly
            variant="light"
            className={SIDEBAR_CLASSES.desktop.expandButton}
            onPress={onToggle}
            aria-label={SIDEBAR_TEXTS.expandMenu}
          >
            <Icon
              name="chevron-right"
              className="h-5 w-5 text-default-600 dark:text-foreground/80"
              size={ICON_SIZES.footer}
            />
          </Button>
        </Tooltip>
      )}
    </div>
  );
});
