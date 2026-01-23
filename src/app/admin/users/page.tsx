"use client";

import { lazy, Suspense, memo, useCallback } from "react";
import { UserTable } from "@/widgets/admin/user-table/user-table";
import { useUserModalState } from "@/shared/store/ui-store";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";

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

  const handleCreateUser = useCallback(() => {
    openCreateUserModal();
  }, [openCreateUserModal]);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <AdminPageHeader
        title="Управление пользователями"
        description="Создавайте, редактируйте и управляйте пользователями системы"
        actionButton={{
          label: "Создать пользователя",
          mobileLabel: "Создать",
          onPress: handleCreateUser,
          icon: "plus",
        }}
      />

      <div>
        <h2 className="text-xl font-bold text-default-900 sm:text-2xl dark:text-foreground">
          Все пользователи
        </h2>
      </div>

      <UserTable />

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
