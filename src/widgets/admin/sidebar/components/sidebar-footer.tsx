"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
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
          variant="ghost"
          className={SIDEBAR_CLASSES.desktop.collapseButton}
          onClick={onToggle}
        >
          <Icon
            name="chevron-left"
            className="mr-2 h-5 w-5 shrink-0"
            size={ICON_SIZES.footer}
            aria-label={SIDEBAR_TEXTS.collapseMenu}
          />
          <span className={SIDEBAR_CLASSES.desktop.collapseButtonText}>
            {SIDEBAR_TEXTS.collapseMenu}
          </span>
        </Button>
      )}
      {isCollapsed && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={SIDEBAR_CLASSES.desktop.expandButton}
                onClick={onToggle}
                aria-label={SIDEBAR_TEXTS.expandMenu}
              >
                <Icon
                  name="chevron-right"
                  className="h-5 w-5 text-muted-foreground"
                  size={ICON_SIZES.footer}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{SIDEBAR_TEXTS.expandMenu}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});
