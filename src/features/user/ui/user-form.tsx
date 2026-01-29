"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useCreateUser } from "@/entities/user/api/use-create-user";
import { useUpdateUser } from "@/entities/user/api/use-update-user";
import { useUserModalState } from "@/shared/store/modal-store";
import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { UserFormBasicTab } from "./components/user-form-basic-tab";
import { UserFormError } from "./components/user-form-error";
import { UserFormProfileTab } from "./components/user-form-profile-tab";
import {
  FORM_CLASSES,
  FORM_MESSAGES,
} from "./constants/user-form-constants";
import type {
  UserFormData,
  UserFormProps,
} from "./types/user-form.types";
import {
  createUserInput,
  getDefaultValues,
  updateUserInput,
} from "./utils/user-form-utils";

export const UserForm = memo(function UserForm({
  editingUser,
}: UserFormProps) {
  const isEditMode = !!editingUser;
  const {
    createUser,
    loading: creating,
    error: createError,
  } = useCreateUser();
  const {
    updateUser,
    loading: updating,
    error: updateError,
  } = useUpdateUser();

  const { closeUserModal: closeModal } = useUserModalState();

  const loading = creating || updating;
  const error = createError || updateError;

  const defaultValues = useMemo(
    () => getDefaultValues(editingUser),
    [editingUser]
  );

  const { control, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        if (isEditMode && editingUser) {
          const input = updateUserInput(data);
          await updateUser(editingUser.id, input);
          closeModal();
        } else {
          const input = createUserInput(data);
          await createUser(input);
          closeModal();
        }

        reset();
      } catch (err) {
        console.error(
          `Ошибка при ${isEditMode ? "обновлении" : "создании"} пользователя:`,
          err
        );
      }
    },
    [
      isEditMode,
      editingUser,
      updateUser,
      createUser,
      closeModal,
      reset,
    ]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${FORM_CLASSES.form} w-full`}
    >
      <UserFormError error={error} isEditMode={isEditMode} />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex-1">
            Основная информация
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex-1">
            Профиль
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <UserFormBasicTab
            control={control}
            isEditMode={isEditMode}
          />
        </TabsContent>
        <TabsContent value="profile">
          <UserFormProfileTab control={control} />
        </TabsContent>
      </Tabs>

      <div className={FORM_CLASSES.actions}>
        <Button
          type="button"
          variant="ghost"
          onClick={closeModal}
          disabled={loading}
          className="min-w-24"
        >
          {FORM_MESSAGES.cancel}
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
        >
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" size={16} />
              {isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create}
            </>
          ) : isEditMode ? (
            FORM_MESSAGES.save
          ) : (
            FORM_MESSAGES.create
          )}
        </Button>
      </div>
    </form>
  );
});
