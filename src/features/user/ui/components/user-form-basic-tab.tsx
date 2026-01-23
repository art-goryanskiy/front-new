"use client";

import { memo } from "react";
import { Controller } from "react-hook-form";
import { Select, SelectItem, Switch } from "@heroui/react";
import type { Control } from "react-hook-form";
import type { UserFormData } from "../types/user-form.types";
import { FormField } from "@/shared/ui/form-field/form-field";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
  USER_ROLE_OPTIONS,
  EMAIL_REGEX,
} from "../constants/user-form-constants";
import type { UserRole } from "@/shared/api/generated/graphql";

interface UserFormBasicTabProps {
  control: Control<UserFormData>;
  isEditMode: boolean;
}

export const UserFormBasicTab = memo(function UserFormBasicTab({
  control,
  isEditMode,
}: UserFormBasicTabProps) {
  return (
    <div className="w-full space-y-4 py-4">
      <FormField
        control={control}
        name="email"
        label={FORM_LABELS.email}
        placeholder={FORM_PLACEHOLDERS.email}
        type="email"
        isRequired
        rules={{
          required: FORM_MESSAGES.emailRequired,
          pattern: {
            value: EMAIL_REGEX,
            message: FORM_MESSAGES.emailInvalid,
          },
        }}
      />
      {!isEditMode && (
        <FormField
          control={control}
          name="password"
          label={FORM_LABELS.password}
          placeholder={FORM_PLACEHOLDERS.password}
          type="password"
          isRequired
          rules={{
            required: FORM_MESSAGES.passwordRequired,
            minLength: {
              value: 6,
              message: FORM_MESSAGES.passwordMinLength,
            },
          }}
        />
      )}
      {isEditMode && (
        <FormField
          control={control}
          name="password"
          label={FORM_LABELS.password}
          placeholder="Оставьте пустым, чтобы не менять"
          type="password"
        />
      )}
      <Controller
        name="role"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label={FORM_LABELS.role}
            placeholder={FORM_PLACEHOLDERS.role}
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as
                | UserRole
                | undefined;
              field.onChange(selected);
            }}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            aria-label={FORM_LABELS.role}
            className="w-full"
            classNames={{
              trigger: "w-full",
              value: "w-full",
              base: "w-full",
            }}
          >
            {USER_ROLE_OPTIONS.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="isBlocked"
        control={control}
        render={({ field }) => (
          <Switch
            isSelected={field.value || false}
            onValueChange={field.onChange}
            aria-label={FORM_LABELS.isBlocked}
            className="w-full"
          >
            {FORM_LABELS.isBlocked}
          </Switch>
        )}
      />
    </div>
  );
});
