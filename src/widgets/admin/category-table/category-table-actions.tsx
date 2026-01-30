"use client";

import { memo } from "react";
import { TableActions } from "@/shared/ui/table-actions/table-actions";

interface CategoryTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const CategoryTableActions = memo(
  function CategoryTableActions({
    onEdit,
    onDelete,
  }: CategoryTableActionsProps) {
    return (
      <TableActions
        onEdit={onEdit}
        onDelete={onDelete}
        editLabel="Редактировать категорию"
        deleteLabel="Удалить категорию"
      />
    );
  }
);
