"use client";

import { Button } from "@/components/ui/button";
import { useUpdateProfile } from "@/features/profile/api/use-update-profile";
import { uploadImage } from "@/shared/lib/upload";
import { ProfileAdditionalInfoSection } from "@/features/profile/ui/sections/profile-additional-info-section";
import { SET_MY_WORK_PLACE_BY_INN } from "@/shared/api/mutations/work-place";
import { useMutation } from "@apollo/client/react";
import { ProfileAddressesSection } from "@/features/profile/ui/sections/profile-addresses-section";
import { ProfileAvatarSection } from "@/features/profile/ui/sections/profile-avatar-section";
import { ProfileBasicInfoSection } from "@/features/profile/ui/sections/profile-basic-info-section";
import { ProfileEducationSection } from "@/features/profile/ui/sections/profile-education-section";
import { ProfilePassportSection } from "@/features/profile/ui/sections/profile-passport-section";
import type { ProfileFormData } from "@/features/profile/ui/types/profile-form.types";
import {
  createProfileInput,
  getProfileDefaultValues,
} from "@/features/profile/ui/utils/profile-form-utils";
import { UserAuthGuard } from "@/shared/lib/auth/user-auth-guard";
import { useAuthUser } from "@/shared/store/auth-store";
import { useToastState } from "@/shared/store/toast-store";
import { PublicPageLayout } from "@/shared/ui/layouts/public-page-layout";
import { Surface } from "@/shared/ui/surface/surface";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Control } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";

type ProfileSection =
  | "basic"
  | "personal"
  | "addresses"
  | "education"
  | "work"
  | "avatar";

const SIDEBAR_ITEMS: Array<{
  key: ProfileSection;
  label: string;
  description: string;
}> = [
  {
    key: "basic",
    label: "Основная информация",
    description: "Контакты и дата рождения",
  },
  {
    key: "personal",
    label: "Личные данные",
    description: "Паспортные данные",
  },
  {
    key: "addresses",
    label: "Адреса",
    description: "Регистрация и проживание",
  },
  {
    key: "education",
    label: "Образование",
    description: "Диплом и квалификация",
  },
  {
    key: "work",
    label: "Место работы",
    description: "Должность и СНИЛС",
  },
  { key: "avatar", label: "Аватар", description: "Фото" },
];

const ProfilePageContent = memo(function ProfilePageContent() {
  const user = useAuthUser();
  const {
    updateProfile,
    loading: updating,
    error,
  } = useUpdateProfile();
  const { showToast } = useToastState();
  const [setMyWorkPlaceByInn] = useMutation<{
    setMyWorkPlaceByInn: {
      workPlaces?: Array<{
        organization: { id: string; inn?: string | null };
        position?: string | null;
        isPrimary: boolean;
      }> | null;
    };
  }>(SET_MY_WORK_PLACE_BY_INN, { errorPolicy: "all" });

  const [activeSection, setActiveSection] =
    useState<ProfileSection>("basic");
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues = useMemo(
    () => getProfileDefaultValues(user?.profile || null),
    [user?.profile]
  );

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<ProfileFormData>({
      defaultValues,
      mode: "onChange",
    });

  const values = useWatch({ control });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const previousProfileHashRef = useRef<string | null>(null);

  const avatarPreview = useMemo(
    () => filePreview || user?.profile?.avatar || null,
    [filePreview, user?.profile?.avatar]
  );

  const sectionMeta = useMemo(() => {
    const item = SIDEBAR_ITEMS.find((i) => i.key === activeSection);
    return (
      item ?? {
        key: activeSection,
        label: "Профиль",
        description: "Настройки",
      }
    );
  }, [activeSection]);

  const isBusy = updating || formState.isSubmitting;
  const isDirty = formState.isDirty || !!avatarFile;
  const mode: "view" | "edit" = isEditing ? "edit" : "view";

  useEffect(() => {
    if (!isEditing || !isDirty || isBusy) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, isBusy, isEditing]);

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
        setAvatarFile(file);
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
        const workPlaces = data.workPlaces ?? [];
        const pending = workPlaces.filter(
          (wp) =>
            !wp.organizationId?.trim() &&
            wp.organization?.inn?.trim()
        );
        let resolvedWorkPlaces = workPlaces;

        for (const wp of pending) {
          const inn = wp.organization?.inn?.trim();
          if (!inn) continue;
          const result = await setMyWorkPlaceByInn({
            variables: {
              input: {
                inn,
                kpp: wp.organization?.kpp?.trim() || undefined,
                position: wp.position?.trim() || undefined,
                isPrimary: Boolean(wp.isPrimary),
              },
            },
          });
          const list =
            result.data?.setMyWorkPlaceByInn?.workPlaces ?? [];
          const added = list.find((x) => x.organization?.inn === inn);
          if (added?.organization?.id) {
            resolvedWorkPlaces = resolvedWorkPlaces.map((item) =>
              item === wp
                ? {
                    ...item,
                    organizationId: added.organization!.id,
                    organization: item.organization
                      ? {
                          ...item.organization,
                          id: added.organization.id,
                        }
                      : item.organization,
                  }
                : item
            );
          }
        }

        let avatarUrl: string | undefined;
        if (avatarFile) {
          avatarUrl = await uploadImage(avatarFile, "avatars");
        }

        const input = createProfileInput({
          ...data,
          workPlaces: resolvedWorkPlaces,
          ...(avatarUrl && { avatar: avatarUrl }),
        });
        await updateProfile(input);
        setAvatarFile(null);
        setFilePreview(avatarUrl ?? null);
        showToast("success", "Профиль успешно обновлен");
        setIsEditing(false);
      } catch (err) {
        console.error("Ошибка при обновлении профиля:", err);
        showToast("error", "Ошибка при обновлении профиля");
      }
    },
    [updateProfile, showToast, setMyWorkPlaceByInn, avatarFile]
  );

  const handleReset = useCallback(() => {
    reset(defaultValues);
    setFilePreview(null);
    setAvatarFile(null);
    showToast("info", "Изменения сброшены");
  }, [defaultValues, reset, showToast]);

  const handleNavigate = useCallback(
    (next: ProfileSection) => {
      if (next === activeSection) return;

      if (isEditing && isDirty) {
        const ok = window.confirm(
          "Есть несохранённые изменения. Перейти без сохранения?"
        );
        if (!ok) return;
        reset(defaultValues);
        setFilePreview(null);
        setIsEditing(false);
      } else {
        setIsEditing(false);
      }

      setActiveSection(next);
    },
    [
      activeSection,
      defaultValues,
      isDirty,
      isEditing,
      reset,
      setActiveSection,
    ]
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
            <Surface variant="inset" className="rounded-xl p-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  Email
                </p>
                <p className="text-base font-semibold text-foreground">
                  {user.email}
                </p>
              </div>
            </Surface>
            <ProfileBasicInfoSection
              control={typedControl}
              mode={mode}
              values={values}
            />
          </div>
        );

      case "personal":
        return (
          <ProfilePassportSection
            control={typedControl}
            mode={mode}
            values={values}
          />
        );

      case "addresses":
        return (
          <ProfileAddressesSection
            control={typedControl}
            mode={mode}
            values={values}
            setValue={setValue}
          />
        );

      case "education":
        return (
          <ProfileEducationSection
            control={typedControl}
            mode={mode}
            values={values}
          />
        );

      case "work":
        return (
          <ProfileAdditionalInfoSection
            control={typedControl}
            mode={mode}
            values={values}
            setValue={setValue}
          />
        );

      case "avatar":
        return (
          <ProfileAvatarSection
            avatarPreview={avatarPreview}
            userEmail={user.email}
            onAvatarFileChange={handleAvatarChange}
            mode={mode}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Surface
      variant="floating"
      className="relative flex h-full min-h-[560px] w-full flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-28 -right-28 h-[360px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-28 h-[380px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="w-full border-b border-border/60 bg-background/60 backdrop-blur-xl lg:h-full lg:w-72 lg:border-r lg:border-b-0">
          <div className="border-b border-border/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">
                  {user.profile?.firstName || user.email}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {user.email}
                </div>
              </div>
              {isDirty && (
                <span className="rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                  Есть изменения
                </span>
              )}
            </div>
          </div>

          <nav className="p-3">
            <ul className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:pb-0">
              {SIDEBAR_ITEMS.map((item) => {
                const active = activeSection === item.key;
                return (
                  <li key={item.key} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.key)}
                      className={cn(
                        "w-full rounded-xl border px-4 py-2 text-left text-sm font-semibold transition-colors",
                        active
                          ? "border-border/80 bg-primary/10 text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/20 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 w-full flex-1 flex-col"
          >
            <div className="sticky top-0 z-10 border-b border-border/60 bg-background/70 px-6 py-5 backdrop-blur-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Личный кабинет
                  </div>
                  <div className="text-xl font-bold tracking-tight text-foreground">
                    {sectionMeta.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sectionMeta.description}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="min-w-40 rounded-xl font-semibold"
                    >
                      Редактировать
                    </Button>
                  ) : (
                    <>
                      {isDirty && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleReset}
                          disabled={isBusy}
                          className="rounded-xl"
                        >
                          Сбросить
                        </Button>
                      )}
                      <Button
                        type="submit"
                        disabled={isBusy || !isDirty}
                        className="min-w-40 rounded-xl font-semibold"
                      >
                        {isBusy ? "Сохранение..." : "Сохранить"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        disabled={isBusy}
                        onClick={() => {
                          if (isDirty) {
                            const ok = window.confirm(
                              "Отменить изменения в разделе?"
                            );
                            if (!ok) return;
                            handleReset();
                          }
                          setIsEditing(false);
                        }}
                        className="rounded-xl"
                      >
                        Отмена
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-6 shrink-0 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-sm font-medium text-destructive">
                  {error.message || "Ошибка при обновлении профиля"}
                </p>
              </div>
            )}

            <div className="min-h-0 w-full flex-1 overflow-y-auto p-6 lg:p-8">
              {renderContent()}
            </div>
          </form>
        </div>
      </div>
    </Surface>
  );
});

export default function ProfilePage() {
  const router = useRouter();

  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
                Личный кабинет
              </h1>
              <p className="text-sm text-muted-foreground sm:text-base">
                Управляйте личной информацией и документами.
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="self-start sm:self-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
          </div>

          <ProfilePageContent />
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
