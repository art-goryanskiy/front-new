"use client";

import { memo, useCallback, useRef } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PROFILE_FORM_CLASSES } from "../constants/profile-form-constants";
interface ProfileAvatarSectionProps {
  avatarPreview: string | null;
  userEmail?: string;
  onAvatarFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  mode?: "view" | "edit";
}

export const ProfileAvatarSection = memo(
  function ProfileAvatarSection({
    avatarPreview,
    userEmail,
    onAvatarFileChange,
    mode = "edit",
  }: ProfileAvatarSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    const initial = (userEmail || "User").charAt(0).toUpperCase();

    if (mode === "view") {
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
                Бэкенд конвертирует изображения автоматически
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
