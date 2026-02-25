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

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export const TableActions = memo(function TableActions({
  onEdit,
  onDelete,
  editLabel = "Редактировать",
  deleteLabel = "Удалить",
}: TableActionsProps) {
  return (
    <TooltipProvider>
      <div
        className="flex items-center justify-center gap-1 sm:gap-2"
        onClick={(e) => e.stopPropagation()}
        role="group"
        aria-label="Действия"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-primary transition-colors hover:bg-primary/10"
              aria-label={editLabel}
              onClick={onEdit}
            >
              <Icon name="edit" size={16} aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{editLabel}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-destructive transition-colors hover:bg-destructive/10"
              aria-label={deleteLabel}
              onClick={onDelete}
            >
              <Icon name="trash" size={16} aria-hidden="true" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-destructive text-destructive-foreground">
            {deleteLabel}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
});
