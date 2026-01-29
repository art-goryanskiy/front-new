"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/shared/api/generated/graphql";
import { useUserModalState } from "@/shared/store/modal-store";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import { UserTable } from "@/widgets/admin/user-table/user-table";
import { Suspense, lazy, memo, useCallback, useState } from "react";

const UserModal = lazy(() =>
  import("@/widgets/user/user-modal/user-modal").then((mod) => ({
    default: mod.UserModal,
  }))
);

const DeleteUserModal = lazy(() =>
  import("@/widgets/user/delete-user-modal/delete-user-modal").then(
    (mod) => ({
      default: mod.DeleteUserModal,
    })
  )
);

const AdminUsersPage = memo(function AdminUsersPage() {
  const { openCreateUserModal } = useUserModalState();

  const [q, setQ] = useState("");
  const [role, setRole] = useState<UserRole | "all">("all");
  const [status, setStatus] = useState<
    "all" | "active" | "unverified" | "blocked"
  >("all");
  const [counts, setCounts] = useState({ shown: 0, total: 0 });

  const handleCreateUser = useCallback(() => {
    openCreateUserModal();
  }, [openCreateUserModal]);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <AdminPageHeader
        variant="default"
        title="Управление пользователями"
        description="Создавайте, редактируйте и управляйте пользователями системы"
        actionButton={{
          label: "Создать пользователя",
          mobileLabel: "Создать",
          onPress: handleCreateUser,
          icon: "plus",
        }}
      />

      <div className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Все пользователи
          </h2>
        </div>

        <DataToolbar
          searchValue={q}
          onSearchValueChange={setQ}
          searchPlaceholder="Поиск по имени, email или телефону…"
          rightSlot={
            <div className="flex items-center gap-2">
              {/* Счётчик — “дорогая” деталь (скрыт на мобиле) */}
              <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
                {counts.shown} / {counts.total}
              </span>

              <Select
                value={role}
                onValueChange={(v) => setRole(v as UserRole | "all")}
              >
                <SelectTrigger className="h-9 w-[170px] bg-background/60">
                  <SelectValue placeholder="Роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все роли</SelectItem>
                  <SelectItem value="ADMIN">Администратор</SelectItem>
                  <SelectItem value="USER">Пользователь</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={status}
                onValueChange={(v) =>
                  setStatus(
                    v as "all" | "active" | "unverified" | "blocked"
                  )
                }
              >
                <SelectTrigger className="h-9 w-[190px] bg-background/60">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="unverified">
                    Не подтвержден
                  </SelectItem>
                  <SelectItem value="blocked">
                    Заблокирован
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
      </div>

      <UserTable
        searchQuery={q}
        roleFilter={role}
        statusFilter={status}
        onCountsChange={setCounts}
      />

      <Suspense fallback={null}>
        <UserModal />
      </Suspense>
      <Suspense fallback={null}>
        <DeleteUserModal />
      </Suspense>
    </div>
  );
});

export default AdminUsersPage;
