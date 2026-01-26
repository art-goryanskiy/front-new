"use client";

import { memo } from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
          <div className="space-y-2">
            <Label htmlFor="role">{FORM_LABELS.role}</Label>
            <Select
              value={field.value ?? ""}
              onValueChange={(v) => field.onChange(v as UserRole)}
            >
              <SelectTrigger id="role" aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={FORM_PLACEHOLDERS.role} />
              </SelectTrigger>
              <SelectContent>
                {USER_ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error?.message && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name="isBlocked"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Switch
              id="isBlocked"
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              aria-label={FORM_LABELS.isBlocked}
            />
            <Label htmlFor="isBlocked" className="cursor-pointer">
              {FORM_LABELS.isBlocked}
            </Label>
          </div>
        )}
      />
    </div>
  );
});
