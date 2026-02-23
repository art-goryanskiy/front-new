"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/entities/user/api/use-users";
import { cn } from "@/lib/utils";
import type {
  UserEntity,
  UserRole,
} from "@/shared/api/generated/graphql";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { useUserModalState } from "@/shared/store/modal-store";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Surface } from "@/shared/ui/surface/surface";
import { TableActions } from "@/shared/ui/table-actions/table-actions";
import { TableSkeleton } from "@/shared/ui/table-skeleton/table-skeleton";
import { memo, useCallback, useEffect, useMemo } from "react";
import { UserTableDateContent } from "./cells/user-table-date-content";
import { UserTableEmailContent } from "./cells/user-table-email-content";
import { UserTableNameContent } from "./cells/user-table-name-content";
import { UserTableRoleContent } from "./cells/user-table-role-content";
import { UserTableStatusContent } from "./cells/user-table-status-content";
import {
  EMPTY_STATE_ICON,
  TABLE_CLASSES,
} from "./constants/user-table-constants";

export const UserTable = memo(function UserTable({
  searchQuery = "",
  roleFilter = "all",
  statusFilter = "all",
  onCountsChange,
}: {
  searchQuery?: string;
  roleFilter?: UserRole | "all";
  statusFilter?: "all" | "active" | "unverified" | "blocked";
  onCountsChange?: (c: { shown: number; total: number }) => void;
}) {
  // Дебаунс поискового запроса перед отправкой на сервер
  const debouncedSearch = useDebounce(searchQuery.trim(), 300);

  // search и isBlocked обрабатываются сервером; role и isEmailVerified — на клиенте
  const { users, loading, error } = useUsers({
    search: debouncedSearch || undefined,
    isBlocked: statusFilter === "blocked" ? true : undefined,
  });
  const { openEditUserModal, openDeleteUserModal } =
    useUserModalState();

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Роль — только клиентская фильтрация (сервер не поддерживает)
      if (roleFilter !== "all" && u.role !== roleFilter) return false;

      // active/unverified фильтры — клиентские (isBlocked=blocked уже на сервере)
      if (statusFilter === "active") {
        if (u.isBlocked || !u.isEmailVerified) return false;
      }
      if (statusFilter === "unverified") {
        if (u.isBlocked || u.isEmailVerified) return false;
      }

      return true;
    });
  }, [users, roleFilter, statusFilter]);

  useEffect(() => {
    onCountsChange?.({
      shown: filteredUsers.length,
      total: users.length,
    });
  }, [onCountsChange, filteredUsers.length, users.length]);

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
    (user: UserEntity) => openEditUserModal(user),
    [openEditUserModal]
  );

  const handleDeleteClick = useCallback(
    (user: UserEntity) => openDeleteUserModal(user),
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

  const getDisplayName = useCallback((u: UserEntity) => {
    const firstName = u.firstName || u.profile?.firstName;
    const lastName = u.lastName || u.profile?.lastName;
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    return u.email;
  }, []);

  if (loading) return <TableSkeleton rows={5} columns={6} />;

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

  if (filteredUsers.length === 0) {
    return (
      <EmptyState
        title="Ничего не найдено"
        description={`По запросу “${searchQuery}” нет результатов`}
        icon={EMPTY_STATE_ICON}
      />
    );
  }

  return (
    <>
      {/* MOBILE (<md): cards */}
      <div className={TABLE_CLASSES.cardsWrap}>
        {filteredUsers.map((user) => (
          <Surface
            key={user.id}
            className={cn(
              TABLE_CLASSES.card,
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            )}
            role="button"
            tabIndex={0}
            onClick={() => openEditUserModal(user)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEditUserModal(user);
              }
            }}
            aria-label={`Открыть пользователя ${user.email}`}
          >
            <div className={TABLE_CLASSES.cardHeader}>
              <div className={TABLE_CLASSES.cardMain}>
                <div
                  className={TABLE_CLASSES.cardTitle}
                  title={getDisplayName(user)}
                >
                  {getDisplayName(user)}
                </div>
                <div
                  className={TABLE_CLASSES.cardSub}
                  title={user.email}
                >
                  {user.email}
                </div>

                <div className={TABLE_CLASSES.cardMeta}>
                  <UserTableRoleContent user={user} />
                  <UserTableStatusContent user={user} />
                  <span className={TABLE_CLASSES.cardMetaPill}>
                    <UserTableDateContent
                      user={user}
                      field="createdAt"
                    />
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <TableActions
                  onEdit={() => handleEditClick(user)}
                  onDelete={() => handleDeleteClick(user)}
                  editLabel="Редактировать пользователя"
                  deleteLabel="Удалить пользователя"
                />
              </div>
            </div>
          </Surface>
        ))}
      </div>

      {/* DESKTOP (md+): premium table */}
      <div className="hidden md:block">
        <Surface variant="floating" className={TABLE_CLASSES.wrapper}>
          <Table
            id={tableId}
            aria-label="Таблица пользователей"
            aria-describedby={`${tableId}-description`}
          >
            <TableHeader className={TABLE_CLASSES.thead}>
              <TableRow>
                <TableHead
                  className={`w-[40%] min-w-0 ${TABLE_CLASSES.th}`}
                >
                  ПОЛЬЗОВАТЕЛЬ
                </TableHead>
                <TableHead
                  className={`hidden w-[30%] min-w-0 [851px]:table-cell ${TABLE_CLASSES.th}`}
                >
                  EMAIL
                </TableHead>
                <TableHead
                  className={`hidden w-[15%] text-center md:table-cell ${TABLE_CLASSES.th}`}
                >
                  РОЛЬ
                </TableHead>
                <TableHead
                  className={`hidden w-[15%] text-center lg:table-cell ${TABLE_CLASSES.th}`}
                >
                  СТАТУС
                </TableHead>
                <TableHead
                  className={`hidden w-[15%] text-center xl:table-cell ${TABLE_CLASSES.th}`}
                >
                  ДАТА РЕГИСТРАЦИИ
                </TableHead>
                <TableHead
                  className={`hidden w-[10%] text-center md:table-cell ${TABLE_CLASSES.th}`}
                >
                  ДЕЙСТВИЯ
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="[&_tr:nth-child(even)]:bg-muted/10">
              {filteredUsers.map((user) => (
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
                  <TableCell
                    className={`min-w-0 ${TABLE_CLASSES.td}`}
                  >
                    <UserTableNameContent user={user} />
                  </TableCell>

                  <TableCell
                    className={`hidden min-w-0 [851px]:table-cell ${TABLE_CLASSES.td}`}
                  >
                    <UserTableEmailContent user={user} />
                  </TableCell>

                  <TableCell
                    className={`hidden text-center md:table-cell ${TABLE_CLASSES.td}`}
                  >
                    <UserTableRoleContent user={user} />
                  </TableCell>

                  <TableCell
                    className={`hidden text-center lg:table-cell ${TABLE_CLASSES.td}`}
                  >
                    <UserTableStatusContent user={user} />
                  </TableCell>

                  <TableCell
                    className={`hidden text-center xl:table-cell ${TABLE_CLASSES.td}`}
                  >
                    <UserTableDateContent
                      user={user}
                      field="createdAt"
                    />
                  </TableCell>

                  <TableCell
                    className={`hidden text-center md:table-cell ${TABLE_CLASSES.td}`}
                  >
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

            <TableCaption className={TABLE_CLASSES.caption}>
              Показано {filteredUsers.length} из {users.length}
              {debouncedSearch ? ` • фильтр: "${debouncedSearch}"` : ""}
              {roleFilter !== "all" ? ` • роль: ${roleFilter}` : ""}
              {statusFilter !== "all"
                ? ` • статус: ${statusFilter}`
                : ""}
            </TableCaption>
          </Table>
        </Surface>
      </div>
    </>
  );
});
