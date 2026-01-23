"use client";

import { memo } from "react";
import { Button, Tooltip } from "@heroui/react";
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
    <div
      className="flex items-center justify-center gap-1 sm:gap-2"
      onClick={(e) => e.stopPropagation()}
      role="group"
      aria-label="Действия"
    >
      <Tooltip
        content={editLabel}
        classNames={{ content: "bg-default-900 text-white" }}
      >
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color="primary"
          className="hover:bg-primary-100 hover:scale-110 transition-all min-w-8 h-8 shrink-0"
          aria-label={editLabel}
          onPress={onEdit}
        >
          <Icon name="edit" size={16} aria-hidden="true" />
        </Button>
      </Tooltip>
      <Tooltip
        content={deleteLabel}
        color="danger"
        classNames={{ content: "bg-danger text-white" }}
      >
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color="danger"
          className="hover:bg-danger-100 hover:scale-110 transition-all min-w-8 h-8 shrink-0"
          aria-label={deleteLabel}
          onPress={onDelete}
        >
          <Icon name="trash" size={16} aria-hidden="true" />
        </Button>
      </Tooltip>
    </div>
  );
});
