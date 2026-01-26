"use client";

import {
  memo,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { useAuthUser } from "@/shared/store/auth-store";
import { useUpdateProfile } from "@/features/profile/api/use-update-profile";
import {
  getProfileDefaultValues,
  createProfileInput,
} from "@/features/profile/ui/utils/profile-form-utils";
import type { ProfileFormData } from "@/features/profile/ui/types/profile-form.types";
import { useToastState } from "@/shared/store/ui-store";
import { PublicHeader } from "@/widgets/public/header/public-header";
import { ProfileBasicInfoSection } from "@/features/profile/ui/sections/profile-basic-info-section";
import { ProfileAdditionalInfoSection } from "@/features/profile/ui/sections/profile-additional-info-section";
import { ProfileAddressesSection } from "@/features/profile/ui/sections/profile-addresses-section";
import { ProfilePassportSection } from "@/features/profile/ui/sections/profile-passport-section";
import { ProfileEducationSection } from "@/features/profile/ui/sections/profile-education-section";
import { ProfileAvatarSection } from "@/features/profile/ui/sections/profile-avatar-section";
import type { Control } from "react-hook-form";

type ProfileSection =
  | "basic"
  | "personal"
  | "addresses"
  | "education"
  | "work"
  | "avatar";

const SIDEBAR_ITEMS: Array<{ key: ProfileSection; label: string }> = [
  { key: "basic", label: "Основная информация" },
  { key: "personal", label: "Личные данные" },
  { key: "addresses", label: "Адреса" },
  { key: "education", label: "Образование" },
  { key: "work", label: "Место работы" },
  { key: "avatar", label: "Аватар" },
];

const ProfilePageContent = memo(function ProfilePageContent() {
  const user = useAuthUser();
  const {
    updateProfile,
    loading: updating,
    error,
  } = useUpdateProfile();
  const { showToast } = useToastState();

  const [activeSection, setActiveSection] =
    useState<ProfileSection>("basic");

  const defaultValues = useMemo(
    () => getProfileDefaultValues(user?.profile || null),
    [user?.profile]
  );

  const { control, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues,
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const avatarUrl = useWatch({ control, name: "avatar" });
  const previousProfileHashRef = useRef<string | null>(null);

  const avatarPreview = useMemo(
    () => filePreview || avatarUrl || user?.profile?.avatar || null,
    [filePreview, avatarUrl, user?.profile?.avatar]
  );

  useEffect(() => {
    if (user?.profile) {
      const profileHash = JSON.stringify(user.profile);
      if (previousProfileHashRef.current !== profileHash) {
        previousProfileHashRef.current = profileHash;
        const values = getProfileDefaultValues(user.profile);
        reset(values);
      }
    } else if (
      !user?.profile &&
      previousProfileHashRef.current !== null
    ) {
      previousProfileHashRef.current = null;
    }
  }, [user?.profile, reset]);

  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const input = createProfileInput(data);
        await updateProfile(input);
        showToast("success", "Профиль успешно обновлен");
      } catch (err) {
        console.error("Ошибка при обновлении профиля:", err);
        showToast("error", "Ошибка при обновлении профиля");
      }
    },
    [updateProfile, showToast]
  );

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  const typedControl = control as unknown as Control<ProfileFormData>;

  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="mb-4 rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-foreground">
                  Email
                </p>
                <p className="text-base text-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <ProfileBasicInfoSection control={typedControl} />
          </div>
        );

      case "personal":
        return <ProfilePassportSection control={typedControl} />;

      case "addresses":
        return <ProfileAddressesSection control={typedControl} />;

      case "education":
        return <ProfileEducationSection control={typedControl} />;

      case "work":
        return (
          <ProfileAdditionalInfoSection control={typedControl} />
        );

      case "avatar":
        return (
          <ProfileAvatarSection
            control={typedControl}
            avatarPreview={avatarPreview}
            userEmail={user.email}
            onAvatarFileChange={handleAvatarChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card className="flex h-full w-full flex-col shadow-lg">
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="w-full border-b border-border bg-muted/50 lg:h-full lg:w-64 lg:border-r lg:border-b-0 lg:bg-transparent">
            <nav className="p-4 lg:p-0">
              <ul className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-0">
                {SIDEBAR_ITEMS.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => setActiveSection(item.key)}
                      className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeSection === item.key
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex min-h-0 w-full flex-1 flex-col"
            >
              {error && (
                <div className="m-6 mb-0 shrink-0 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <p className="text-sm font-medium text-destructive">
                    {error.message || "Ошибка при обновлении профиля"}
                  </p>
                </div>
              )}

              <div className="min-h-0 w-full flex-1 overflow-y-auto p-6 lg:p-8">
                {renderContent()}
              </div>

              <div className="shrink-0 border-t border-border p-6">
                <div className="flex justify-end gap-3">
                  <Button
                    type="submit"
                    disabled={updating}
                    className="min-w-32 font-semibold shadow-lg transition-shadow hover:shadow-xl"
                  >
                    {updating
                      ? "Сохранение..."
                      : "Сохранить изменения"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default function ProfilePage() {
  const router = useRouter();

  return (
    <UserAuthGuard redirectTo="login">
      <div className="flex min-h-screen flex-col bg-background">
        <PublicHeader />
        <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex min-h-0 flex-1 flex-col space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="flex shrink-0 flex-col gap-3">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-2 self-start"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <div className="flex flex-col gap-3">
                <h1 className="mb-1 bg-linear-to-r from-primary to-primary/80 bg-clip-text text-2xl font-bold wrap-break-word text-transparent sm:mb-2 sm:text-3xl lg:text-4xl">
                  Личный кабинет
                </h1>
                <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
                  Управляйте своей личной информацией
                </p>
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <ProfilePageContent />
            </div>
          </div>
        </main>
      </div>
    </UserAuthGuard>
  );
}
