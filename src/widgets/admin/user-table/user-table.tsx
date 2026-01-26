"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import type { UserEntity } from "@/shared/api/generated/graphql";
import { useUsers } from "@/entities/user/api/use-users";
import { useUserModalState } from "@/shared/store/ui-store";
import { memo, useCallback, useMemo } from "react";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import {
  TABLE_CLASSES,
  EMPTY_STATE_ICON,
} from "./constants/user-table-constants";
import { UserTableEmailContent } from "./cells/user-table-email-content";
import { UserTableNameContent } from "./cells/user-table-name-content";
import { UserTableRoleContent } from "./cells/user-table-role-content";
import { UserTableStatusContent } from "./cells/user-table-status-content";
import { UserTableDateContent } from "./cells/user-table-date-content";
import { TableSkeleton } from "@/shared/ui/table-skeleton/table-skeleton";

export const UserTable = memo(function UserTable() {
  const { users, loading, error } = useUsers();

  const { openEditUserModal, openDeleteUserModal } =
    useUserModalState();

  const handleRowClick = useCallback(
    (user: UserEntity, e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("svg")
      ) {
        return;
      }
      openEditUserModal(user);
    },
    [openEditUserModal]
  );

  const handleEditClick = useCallback(
    (user: UserEntity) => {
      openEditUserModal(user);
    },
    [openEditUserModal]
  );

  const handleDeleteClick = useCallback(
    (user: UserEntity) => {
      openDeleteUserModal(user);
    },
    [openDeleteUserModal]
  );

  const handleKeyDown = useCallback(
    (user: UserEntity, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openEditUserModal(user);
      }
    },
    [openEditUserModal]
  );

  const tableId = useMemo(() => "user-table", []);

  if (loading) {
    return <TableSkeleton rows={5} columns={6} />;
  }

  if (error) {
    return (
      <ErrorState
        message={
          error.message ||
          "Произошла ошибка при загрузке пользователей"
        }
      />
    );
  }

  if (users.length === 0) {
    return (
      <EmptyState
        title="Пользователи не найдены"
        description="Создайте первого пользователя"
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  return (
    <Card className={`shadow-lg ${TABLE_CLASSES.wrapper}`}>
      <CardContent className="p-0">
        <Table
          id={tableId}
          aria-label="Таблица пользователей"
          aria-describedby={`${tableId}-description`}
        >
          <TableHeader>
            <TableRow>
              <TableHead className={`min-w-0 w-[40%] ${TABLE_CLASSES.th}`}>
                ПОЛЬЗОВАТЕЛЬ
              </TableHead>
              <TableHead className={`hidden min-w-0 [851px]:table-cell w-[30%] ${TABLE_CLASSES.th}`}>
                EMAIL
              </TableHead>
              <TableHead className={`hidden text-center md:table-cell w-[15%] ${TABLE_CLASSES.th}`}>
                РОЛЬ
              </TableHead>
              <TableHead className={`hidden text-center lg:table-cell w-[15%] ${TABLE_CLASSES.th}`}>
                СТАТУС
              </TableHead>
              <TableHead className={`hidden text-center xl:table-cell w-[15%] ${TABLE_CLASSES.th}`}>
                ДАТА РЕГИСТРАЦИИ
              </TableHead>
              <TableHead className={`hidden text-center md:table-cell w-[10%] ${TABLE_CLASSES.th}`}>
                ДЕЙСТВИЯ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className={`group cursor-pointer ${TABLE_CLASSES.tr}`}
                onClick={(e) => handleRowClick(user, e)}
                role="row"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(user, e)}
                aria-label={`Пользователь ${user.email}`}
                aria-describedby={`${tableId}-row-${user.id}`}
              >
                <TableCell className={`min-w-0 ${TABLE_CLASSES.td}`}>
                  <UserTableNameContent user={user} />
                </TableCell>
                <TableCell className={`hidden min-w-0 [851px]:table-cell ${TABLE_CLASSES.td}`}>
                  <UserTableEmailContent user={user} />
                </TableCell>
                <TableCell className={`hidden text-center md:table-cell ${TABLE_CLASSES.td}`}>
                  <UserTableRoleContent user={user} />
                </TableCell>
                <TableCell className={`hidden text-center lg:table-cell ${TABLE_CLASSES.td}`}>
                  <UserTableStatusContent user={user} />
                </TableCell>
                <TableCell className={`hidden text-center xl:table-cell ${TABLE_CLASSES.td}`}>
                  <UserTableDateContent user={user} field="createdAt" />
                </TableCell>
                <TableCell className={`hidden text-center md:table-cell ${TABLE_CLASSES.td}`}>
                  <TableActions
                    onEdit={() => handleEditClick(user)}
                    onDelete={() => handleDeleteClick(user)}
                    editLabel="Редактировать пользователя"
                    deleteLabel="Удалить пользователя"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});
