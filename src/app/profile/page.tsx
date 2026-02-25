"use client";

import { Button } from "@/components/ui/button";
import { useMe } from "@/features/auth/api/use-me";
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
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CreditCard,
  MapPin,
  GraduationCap,
  Briefcase,
  Camera,
} from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Control } from "react-hook-form";
import { useForm } from "react-hook-form";

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
  icon: React.ElementType;
}> = [
  {
    key: "basic",
    label: "Основная информация",
    description: "Контакты и дата рождения",
    icon: User,
  },
  {
    key: "personal",
    label: "Личные данные",
    description: "Паспортные данные",
    icon: CreditCard,
  },
  {
    key: "addresses",
    label: "Адреса",
    description: "Регистрация и проживание",
    icon: MapPin,
  },
  {
    key: "education",
    label: "Образование",
    description: "Диплом и квалификация",
    icon: GraduationCap,
  },
  {
    key: "work",
    label: "Место работы",
    description: "Организации",
    icon: Briefcase,
  },
  {
    key: "avatar",
    label: "Аватар",
    description: "Фото",
    icon: Camera,
  },
];

function ProfileLoadingSkeleton() {
  return (
    <Surface
      variant="floating"
      className="relative flex h-full min-h-[560px] w-full flex-col overflow-hidden"
    >
      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="w-full border-b border-border/60 bg-background/60 backdrop-blur-xl lg:h-full lg:w-72 lg:border-r lg:border-b-0">
          <div className="border-b border-border/60 bg-muted/5 p-4">
            <div className="flex items-center gap-3">
              <Skeleton
                variant="premium"
                className="h-10 w-10 shrink-0 rounded-full"
              />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton variant="premium" className="h-4 w-32" />
                <Skeleton variant="premium" className="h-3 w-44" />
              </div>
            </div>
          </div>
          <div className="space-y-1 p-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                variant="premium"
                className="h-9 w-full rounded-xl"
              />
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="space-y-2 border-b border-border/60 px-6 py-5">
            <Skeleton variant="premium" className="h-3 w-24" />
            <Skeleton variant="premium" className="h-7 w-52" />
            <Skeleton variant="premium" className="h-4 w-36" />
          </div>
          <div className="space-y-4 p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="premium"
                  className="h-12 w-full rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

const ProfilePageContent = memo(function ProfilePageContent() {
  const { user: meUser, loading: meLoading } = useMe({ skip: false });
  const storeUser = useAuthUser();
  const user = meUser ?? storeUser;

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
  const [confirmNav, setConfirmNav] = useState<ProfileSection | null>(
    null
  );
  const [confirmCancel, setConfirmCancel] = useState(false);

  const defaultValues = useMemo(
    () => getProfileDefaultValues(user?.profile || null),
    [user?.profile]
  );

  const { control, handleSubmit, reset, setValue, formState } =
    useForm<ProfileFormData>({
      defaultValues,
      mode: "onChange",
    });

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
            !wp.organizationId?.trim() && wp.organization?.inn?.trim()
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
      } catch {
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
        setConfirmNav(next);
        return;
      }
      setIsEditing(false);
      setActiveSection(next);
    },
    [activeSection, isDirty, isEditing]
  );

  const handleConfirmNav = useCallback(() => {
    if (!confirmNav) return;
    reset(defaultValues);
    setFilePreview(null);
    setIsEditing(false);
    setActiveSection(confirmNav);
    setConfirmNav(null);
  }, [confirmNav, defaultValues, reset]);

  const handleConfirmCancel = useCallback(() => {
    handleReset();
    setIsEditing(false);
    setConfirmCancel(false);
  }, [handleReset]);

  if (!user && meLoading) {
    return <ProfileLoadingSkeleton />;
  }

  if (!user) return null;

  const typedControl = control as unknown as Control<ProfileFormData>;

  const renderContent = () => {
    switch (activeSection) {
      case "basic":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/10 px-4 py-3">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Email
              </span>
              <span className="text-sm font-medium text-foreground">
                {user.email}
              </span>
            </div>
            <ProfileBasicInfoSection
              control={typedControl}
              mode={mode}
              values={defaultValues}
            />
          </div>
        );

      case "personal":
        return (
          <ProfilePassportSection
            control={typedControl}
            mode={mode}
            values={defaultValues}
          />
        );

      case "addresses":
        return (
          <ProfileAddressesSection
            control={typedControl}
            mode={mode}
            values={defaultValues}
            setValue={setValue}
          />
        );

      case "education":
        return (
          <ProfileEducationSection
            control={typedControl}
            mode={mode}
            values={defaultValues}
          />
        );

      case "work":
        return (
          <ProfileAdditionalInfoSection
            control={typedControl}
            mode={mode}
            values={defaultValues}
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
        <div className="absolute -bottom-32 -left-28 h-[380px] w-[520px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="w-full border-b border-border/60 bg-background/60 backdrop-blur-xl lg:h-full lg:w-72 lg:border-r lg:border-b-0">
          <div className="border-b border-border/60 bg-muted/5 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 shrink-0 ring-2 ring-border/40">
                <AvatarImage
                  src={
                    filePreview || user.profile?.avatar || undefined
                  }
                  alt={user.email}
                />
                <AvatarFallback className="text-sm font-semibold">
                  {(user.profile?.firstName || user.email)
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">
                  {user.profile?.firstName
                    ? `${user.profile.firstName}${user.profile.lastName ? ` ${user.profile.lastName}` : ""}`
                    : user.email}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {user.email}
                </div>
              </div>
              {isDirty && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 rounded-full border border-primary/40 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary"
                >
                  Изменено
                </motion.span>
              )}
            </div>
          </div>

          <nav className="p-3">
            <ul className="flex scroll-px-4 flex-row gap-2 overflow-x-auto pr-1 pb-2 pl-1 lg:flex-col lg:gap-1 lg:pr-0 lg:pb-0 lg:pl-0">
              {SIDEBAR_ITEMS.map((item) => {
                const active = activeSection === item.key;
                const Icon = item.icon;
                return (
                  <li
                    key={item.key}
                    className="relative shrink-0 lg:shrink"
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigate(item.key)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors lg:px-3",
                        active
                          ? "border-border/80 bg-primary/10 text-foreground lg:border-l-4 lg:border-l-primary lg:pl-2.5"
                          : "border-transparent text-muted-foreground hover:border-border/60 hover:bg-muted/20 hover:text-foreground"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          active
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                        aria-hidden
                      />
                      <span className="truncate">{item.label}</span>
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
            <div className="sticky top-0 z-10 border-b border-border/60 bg-background/70 px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-muted-foreground">
                    Личный кабинет
                  </div>
                  <div className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {sectionMeta.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sectionMeta.description}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
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
                        className="min-w-40 rounded-xl font-semibold shadow-sm shadow-primary/20"
                      >
                        {isBusy ? "Сохранение..." : "Сохранить"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        disabled={isBusy}
                        onClick={() => {
                          if (isDirty) {
                            setConfirmCancel(true);
                          } else {
                            setIsEditing(false);
                          }
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
              <div className="mx-4 mt-4 shrink-0 rounded-xl border border-destructive/30 bg-destructive/10 p-4 sm:mx-6 sm:mt-6">
                <p className="text-sm font-medium text-destructive">
                  {error.message || "Ошибка при обновлении профиля"}
                </p>
              </div>
            )}

            <div className="min-h-0 w-full flex-1 overflow-y-auto px-4 py-5 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      <ConfirmDialog
        open={confirmNav !== null}
        onOpenChange={(open) => !open && setConfirmNav(null)}
        title="Несохранённые изменения"
        description="Есть несохранённые изменения. Перейти без сохранения?"
        confirmLabel="Перейти"
        cancelLabel="Остаться"
        onConfirm={handleConfirmNav}
      />

      <ConfirmDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title="Отменить изменения"
        description="Все несохранённые изменения в этом разделе будут потеряны."
        confirmLabel="Отменить изменения"
        cancelLabel="Продолжить редактирование"
        onConfirm={handleConfirmCancel}
      />
    </Surface>
  );
});

export default function ProfilePage() {
  return (
    <UserAuthGuard redirectTo="login">
      <PublicPageLayout>
        <div className="flex min-h-0 flex-1 flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
              Личный кабинет
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Управляйте личной информацией и документами.
            </p>
          </div>

          <ProfilePageContent />
        </div>
      </PublicPageLayout>
    </UserAuthGuard>
  );
}
