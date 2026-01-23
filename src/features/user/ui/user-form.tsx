"use client";

import { memo, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Tabs, Tab } from "@heroui/react";
import { useUserModalState } from "@/shared/store/ui-store";
import { useCreateUser } from "@/entities/user/api/use-create-user";
import { useUpdateUser } from "@/entities/user/api/use-update-user";
import {
  getDefaultValues,
  createUserInput,
  updateUserInput,
} from "./utils/user-form-utils";
import {
  FORM_CLASSES,
  FORM_MESSAGES,
} from "./constants/user-form-constants";
import type {
  UserFormData,
  UserFormProps,
} from "./types/user-form.types";
import { UserFormBasicTab } from "./components/user-form-basic-tab";
import { UserFormProfileTab } from "./components/user-form-profile-tab";
import { UserFormError } from "./components/user-form-error";

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
    <Form
      onSubmit={handleSubmit(onSubmit)}
      validationBehavior="native"
      className={`${FORM_CLASSES.form} w-full`}
    >
      <UserFormError error={error} isEditMode={isEditMode} />

      <Tabs
        aria-label="Форма пользователя"
        className="w-full"
        classNames={{
          base: "w-full",
          tabList: "w-full",
          panel: "w-full",
        }}
      >
        <Tab key="basic" title="Основная информация">
          <UserFormBasicTab
            control={control}
            isEditMode={isEditMode}
          />
        </Tab>

        <Tab key="profile" title="Профиль">
          <UserFormProfileTab control={control} />
        </Tab>
      </Tabs>

      <div className={FORM_CLASSES.actions}>
        <Button
          type="button"
          variant="light"
          onPress={closeModal}
          isDisabled={loading}
          className="min-w-24"
        >
          {FORM_MESSAGES.cancel}
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={loading}
          className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
        >
          {isEditMode ? FORM_MESSAGES.save : FORM_MESSAGES.create}
        </Button>
      </div>
    </Form>
  );
});
