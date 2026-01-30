"use client";

import { memo, useCallback, useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormField } from "@/shared/ui/form-field/form-field";
import { PROFILE_FORM_CLASSES } from "../constants/profile-form-constants";
import type { ProfileFormData } from "../types/profile-form.types";
import type { Control, FieldPath } from "react-hook-form";
import { ProfileFieldPreview } from "../components/profile-field-preview";
import { formatProfileValue } from "../utils/profile-preview-utils";

interface ProfileAvatarSectionProps<T extends ProfileFormData> {
  control: Control<T>;
  avatarPreview: string | null;
  userEmail?: string;
  onAvatarFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  mode?: "view" | "edit";
  values?: ProfileFormData;
}

export const ProfileAvatarSection = memo(
  function ProfileAvatarSection<
    T extends ProfileFormData = ProfileFormData,
  >({
    control,
    avatarPreview,
    userEmail,
    onAvatarFileChange,
    mode = "edit",
    values,
  }: ProfileAvatarSectionProps<T>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fieldName = useCallback(
      <K extends keyof ProfileFormData>(name: K): FieldPath<T> =>
        name as unknown as FieldPath<T>,
      []
    );

    const handleButtonClick = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    const initial = (userEmail || "User").charAt(0).toUpperCase();

    if (mode === "view") {
      const avatarUrl = formatProfileValue(values?.avatar);

      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Аватар
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-24 w-24 text-lg">
                <AvatarImage
                  src={avatarPreview || undefined}
                  alt={userEmail}
                />
                <AvatarFallback className="text-lg">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-muted-foreground">
                Чтобы изменить аватар — включите режим редактирования.
              </div>
            </div>

            <ProfileFieldPreview
              label="URL аватара"
              value={avatarUrl}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>Аватар</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="h-24 w-24 text-lg">
              <AvatarImage
                src={avatarPreview || undefined}
                alt={userEmail}
              />
              <AvatarFallback className="text-lg">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onAvatarFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleButtonClick}
              >
                Выбрать изображение
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                Рекомендуемый размер: 200x200px. Форматы: JPG, PNG
              </p>
            </div>
          </div>
          <FormField
            control={control}
            name={fieldName("avatar")}
            label="URL аватара"
            placeholder="Или введите URL изображения"
            type="url"
            description="Если вы загрузили файл, URL будет заполнен автоматически"
          />
        </div>
      </div>
    );
  }
);
