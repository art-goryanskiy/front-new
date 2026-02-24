"use client";

import {
  PROFILE_FORM_LABELS,
  PROFILE_FORM_CLASSES,
} from "../constants/profile-form-constants";
import type {
  ProfileFormData,
  WorkPlaceFormData,
} from "../types/profile-form.types";
import type { Control, UseFormSetValue } from "react-hook-form";
import { memo, useState } from "react";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import { useMutation } from "@apollo/client/react";
import { SET_MY_WORK_PLACE_MANUAL } from "@/shared/api/mutations/work-place";
import { ME } from "@/shared/api/queries/auth";
import { useToastState } from "@/shared/store/toast-store";
import type { FetchResult } from "@apollo/client";
import { toUserFriendlyMessage } from "@/shared/lib/graphql/error-to-user-message";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, Trash2 } from "lucide-react";

const MAX_WORK_PLACES = 5;

interface ProfileAdditionalInfoSectionProps<
  T extends ProfileFormData,
> {
  control: Control<T>;
  mode?: "view" | "edit";
  values?: ProfileFormData;
  setValue?: UseFormSetValue<ProfileFormData>;
}

export const ProfileAdditionalInfoSection = memo(
  function ProfileAdditionalInfoSection<
    T extends ProfileFormData = ProfileFormData,
  >({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- required by interface
    control,
    mode = "edit",
    values,
    setValue,
  }: ProfileAdditionalInfoSectionProps<T>) {
    const { showToast } = useToastState();
    const workPlaces = (values?.workPlaces ??
      []) as WorkPlaceFormData[];
    const hasReachedMax = workPlaces.length >= MAX_WORK_PLACES;

    const [binding, setBinding] = useState(false);
    const [manualOpen, setManualOpen] = useState(false);
    const [orgApiUnavailable, setOrgApiUnavailable] = useState(false);
    const [addPosition, setAddPosition] = useState("");
    const [addIsPrimary, setAddIsPrimary] = useState(false);

    const [setMyWorkPlaceManual] = useMutation<{
      setMyWorkPlaceManual: {
        workPlaces?: Array<{
          organization: { id: string; displayName?: string | null };
          position?: string | null;
          isPrimary: boolean;
        }> | null;
      };
    }>(SET_MY_WORK_PLACE_MANUAL, {
      errorPolicy: "all",
    });

    type ManualType = "LEGAL" | "INDIVIDUAL";
    type ManualForm = {
      type: ManualType;
      inn: string;
      ogrn: string;
      kpp?: string;
      displayName?: string;
      fullName?: string;
      shortName?: string;
      opfFull?: string;
      opfShort?: string;
      fioLast?: string;
      fioFirst?: string;
      fioMiddle?: string;
      fioFull?: string;
      legalAddress?: string;
      actualAddress?: string;
      actualSameAsLegal?: boolean;
      email?: string;
      phone?: string;
      position?: string;
      isPrimary?: boolean;
      bankAccount?: string;
      bankName?: string;
      bik?: string;
      correspondentAccount?: string;
    };

    const manualForm = useForm<ManualForm>({
      defaultValues: {
        type: "LEGAL",
        inn: "",
        ogrn: "",
        kpp: "",
        displayName: "",
        fullName: "",
        shortName: "",
        opfFull: "",
        opfShort: "",
        fioLast: "",
        fioFirst: "",
        fioMiddle: "",
        fioFull: "",
        legalAddress: "",
        actualAddress: "",
        actualSameAsLegal: true,
        email: "",
        phone: "",
        position: "",
        isPrimary: false,
        bankAccount: "",
        bankName: "",
        bik: "",
        correspondentAccount: "",
      },
      mode: "onChange",
    });

    const manualType = manualForm.watch("type");
    const actualSameAsLegal = manualForm.watch("actualSameAsLegal");

    const normalizeDigits = (s: string) => s.replace(/\D/g, "");

    const setWorkPlacePrimary = (index: number) => {
      if (!setValue) return;
      const next = workPlaces.map((wp, i) => ({
        ...wp,
        isPrimary: i === index,
      }));
      setValue("workPlaces", next, {
        shouldDirty: true,
        shouldValidate: true,
      });
    };

    const removeWorkPlace = (index: number) => {
      if (!setValue) return;
      const next = workPlaces.filter((_, i) => i !== index);
      if (next.length > 0 && !next.some((wp) => wp.isPrimary)) {
        next[0].isPrimary = true;
      }
      setValue("workPlaces", next, {
        shouldDirty: true,
        shouldValidate: true,
      });
    };

    const updateWorkPlacePosition = (
      index: number,
      position: string
    ) => {
      if (!setValue) return;
      const next = [...workPlaces];
      next[index] = {
        ...next[index],
        position: position || undefined,
      };
      setValue("workPlaces", next, {
        shouldDirty: true,
        shouldValidate: true,
      });
    };

    if (mode === "view") {
      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Места работы
          </h3>
          <div className={PROFILE_FORM_CLASSES.fieldGrid}>
            <div className="space-y-3 md:col-span-2">
              {workPlaces.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Места работы не указаны
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Добавьте организации при редактировании профиля
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {workPlaces.map((wp, i) => (
                    <Card
                      key={i}
                      className="overflow-hidden transition-colors hover:bg-muted/30"
                    >
                      <CardContent className="flex flex-col gap-2 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Building2 className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-foreground">
                                {wp.organization?.displayName ||
                                  "Организация"}
                              </p>
                              {wp.position && (
                                <p className="text-xs text-muted-foreground">
                                  {wp.position}
                                </p>
                              )}
                            </div>
                          </div>
                          {wp.isPrimary && (
                            <Badge
                              variant="secondary"
                              className="shrink-0 gap-1 bg-primary/10 text-primary"
                            >
                              <Star className="h-3 w-3 fill-current" />
                              Основное
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Места работы
        </h3>
        <div className={PROFILE_FORM_CLASSES.fieldGrid}>
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-baseline justify-between">
              <Label className="text-sm font-medium">
                {PROFILE_FORM_LABELS.workPlaces}
              </Label>
              {workPlaces.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  {workPlaces.length} из {MAX_WORK_PLACES}
                </span>
              )}
            </div>
            {workPlaces.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {workPlaces.map((wp, i) => (
                  <Card
                    key={i}
                    className="overflow-hidden transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="truncate text-sm font-medium">
                                {wp.organization?.displayName ||
                                  "Организация"}
                              </span>
                              {wp.isPrimary && (
                                <Badge
                                  variant="secondary"
                                  className="shrink-0 gap-1 bg-primary/10 text-primary"
                                >
                                  <Star className="h-3 w-3 fill-current" />
                                  Основное
                                </Badge>
                              )}
                            </div>
                            <Input
                              placeholder="Должность"
                              value={wp.position ?? ""}
                              onChange={(e) =>
                                updateWorkPlacePosition(
                                  i,
                                  e.target.value
                                )
                              }
                              className="h-9 text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          {!wp.isPrimary && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => setWorkPlacePrimary(i)}
                            >
                              Основное
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:text-destructive"
                            onClick={() => removeWorkPlace(i)}
                            aria-label="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!hasReachedMax && (
              <Card className="overflow-visible border-dashed">
                <CardContent className="space-y-4 p-4">
                  <p className="text-xs text-muted-foreground">
                    Добавленные места работы сохранятся при нажатии
                    «Сохранить»
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      <OrganizationSuggestInput
                        label="Добавить организацию"
                        placeholder="Введите ИНН или название"
                        clearAfterSelect
                        description={
                          workPlaces.length === 0
                            ? "Выберите организацию из подсказок"
                            : undefined
                        }
                        isDisabled={binding}
                        debounceMs={350}
                        minQueryLength={3}
                        count={15}
                        onApiUnavailableChange={(v) =>
                          setOrgApiUnavailable(v)
                        }
                        onSelect={(sug) => {
                          if (!setValue) return;
                          const isFirst = workPlaces.length === 0;
                          const newEntry: WorkPlaceFormData = {
                            organizationId: "",
                            organization: {
                              displayName: sug.displayName,
                              inn: sug.inn,
                              kpp: sug.kpp ?? undefined,
                            },
                            position: addPosition.trim() || undefined,
                            isPrimary: addIsPrimary || isFirst,
                          };
                          setValue(
                            "workPlaces",
                            [...workPlaces, newEntry],
                            {
                              shouldDirty: true,
                              shouldValidate: true,
                            }
                          );
                          setAddPosition("");
                          setAddIsPrimary(false);
                        }}
                      />
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                      <Input
                        placeholder="Должность (опц.)"
                        value={addPosition}
                        onChange={(e) =>
                          setAddPosition(e.target.value)
                        }
                        className="h-9 w-full sm:w-36"
                      />
                      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-muted/50">
                        <input
                          type="checkbox"
                          checked={addIsPrimary}
                          onChange={(e) =>
                            setAddIsPrimary(e.target.checked)
                          }
                          className="rounded border-border"
                        />
                        <span className="text-muted-foreground">
                          Основное
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {hasReachedMax && (
              <p className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                Максимум {MAX_WORK_PLACES} мест работы. Удалите одно,
                чтобы добавить новое.
              </p>
            )}

            {orgApiUnavailable && !hasReachedMax && (
              <Button
                type="button"
                variant="outline"
                disabled={binding}
                onClick={() => setManualOpen(true)}
                className="w-full border-dashed"
              >
                Ввести организацию вручную
              </Button>
            )}
          </div>

          {orgApiUnavailable && (
            <Dialog open={manualOpen} onOpenChange={setManualOpen}>
              <DialogContent className="max-w-2xl gap-6">
                <DialogHeader className="space-y-1.5">
                  <DialogTitle className="text-lg">
                    Место работы — ручной ввод
                  </DialogTitle>
                  <DialogDescription asChild>
                    <p className="text-sm text-muted-foreground">
                      Заполните данные организации, если она не
                      найдена по ИНН
                    </p>
                  </DialogDescription>
                </DialogHeader>

                <form
                  onSubmit={manualForm.handleSubmit(async (data) => {
                    try {
                      setBinding(true);

                      const inn = normalizeDigits(data.inn);
                      const ogrn = normalizeDigits(data.ogrn);
                      const kpp = normalizeDigits(data.kpp || "");

                      const expectedOgrnLen =
                        data.type === "LEGAL" ? 13 : 15;

                      if (!(inn.length === 10 || inn.length === 12)) {
                        showToast(
                          "error",
                          "ИНН должен быть 10 или 12 цифр"
                        );
                        return;
                      }
                      if (ogrn.length !== expectedOgrnLen) {
                        showToast(
                          "error",
                          data.type === "LEGAL"
                            ? "ОГРН должен быть 13 цифр"
                            : "ОГРНИП должен быть 15 цифр"
                        );
                        return;
                      }
                      if (
                        data.type === "LEGAL" &&
                        kpp &&
                        kpp.length !== 9
                      ) {
                        showToast("error", "КПП должен быть 9 цифр");
                        return;
                      }

                      const bankAccountRaw = data.bankAccount?.trim();
                      const bikRaw = data.bik?.trim();
                      const correspondentAccountRaw =
                        data.correspondentAccount?.trim();
                      const bankAccount = bankAccountRaw
                        ? normalizeDigits(bankAccountRaw)
                        : "";
                      const bik = bikRaw
                        ? normalizeDigits(bikRaw)
                        : "";
                      const correspondentAccount =
                        correspondentAccountRaw
                          ? normalizeDigits(correspondentAccountRaw)
                          : "";

                      if (bankAccount && bankAccount.length !== 20) {
                        showToast(
                          "error",
                          "Расчётный счёт (р/с) должен содержать 20 цифр"
                        );
                        return;
                      }
                      if (bik && bik.length !== 9) {
                        showToast(
                          "error",
                          "БИК должен содержать 9 цифр"
                        );
                        return;
                      }
                      if (
                        correspondentAccount &&
                        correspondentAccount.length !== 20
                      ) {
                        showToast(
                          "error",
                          "Корреспондентский счёт (к/с) должен содержать 20 цифр"
                        );
                        return;
                      }

                      const bankName = data.bankName?.trim();
                      const bankNameLimited = bankName
                        ? bankName.slice(0, 300)
                        : undefined;

                      const isFirst = workPlaces.length === 0;
                      const input = {
                        type: data.type,
                        inn,
                        ogrn,
                        kpp:
                          data.type === "LEGAL" && kpp
                            ? kpp
                            : undefined,
                        displayName:
                          data.displayName?.trim() || undefined,
                        fullName: data.fullName?.trim() || undefined,
                        shortName:
                          data.shortName?.trim() || undefined,
                        opfFull: data.opfFull?.trim() || undefined,
                        opfShort: data.opfShort?.trim() || undefined,
                        fioLast: data.fioLast?.trim() || undefined,
                        fioFirst: data.fioFirst?.trim() || undefined,
                        fioMiddle:
                          data.fioMiddle?.trim() || undefined,
                        fioFull: data.fioFull?.trim() || undefined,
                        legalAddress:
                          data.legalAddress?.trim() || undefined,
                        actualSameAsLegal: Boolean(
                          data.actualSameAsLegal
                        ),
                        actualAddress: data.actualSameAsLegal
                          ? undefined
                          : data.actualAddress?.trim() || undefined,
                        email: data.email?.trim() || undefined,
                        phone: data.phone?.trim() || undefined,
                        position: data.position?.trim() || undefined,
                        isPrimary:
                          data.isPrimary || isFirst
                            ? true
                            : undefined,
                        bankAccount: bankAccount || undefined,
                        bankName: bankNameLimited,
                        bik: bik || undefined,
                        correspondentAccount:
                          correspondentAccount || undefined,
                      };

                      const result: FetchResult<{
                        setMyWorkPlaceManual: {
                          workPlaces?: Array<{
                            organization: {
                              id: string;
                              displayName?: string | null;
                            };
                            position?: string | null;
                            isPrimary: boolean;
                          }> | null;
                        };
                      }> = await setMyWorkPlaceManual({
                        variables: { input },
                        refetchQueries: [{ query: ME }],
                        awaitRefetchQueries: true,
                      });

                      if (result.errors?.length) {
                        showToast(
                          "error",
                          toUserFriendlyMessage(
                            result.errors[0]?.message || ""
                          ) || "Не удалось сохранить место работы"
                        );
                        return;
                      }

                      manualForm.reset({
                        ...manualForm.getValues(),
                        inn: "",
                        ogrn: "",
                        kpp: "",
                        displayName: "",
                        position: "",
                        isPrimary: false,
                      });
                      showToast("success", "Место работы добавлено");
                      setManualOpen(false);
                    } catch (e) {
                      showToast(
                        "error",
                        e instanceof Error
                          ? toUserFriendlyMessage(e.message)
                          : "Не удалось сохранить место работы"
                      );
                    } finally {
                      setBinding(false);
                    }
                  })}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Тип</Label>
                      <Controller
                        control={manualForm.control}
                        name="type"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(v) => {
                              field.onChange(v as ManualType);
                              if (v === "INDIVIDUAL") {
                                manualForm.setValue("kpp", "");
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LEGAL">
                                Юр. лицо
                              </SelectItem>
                              <SelectItem value="INDIVIDUAL">
                                ИП
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>ИНН</Label>
                      <Input
                        {...manualForm.register("inn")}
                        inputMode="numeric"
                        placeholder="10 или 12 цифр"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        {manualType === "LEGAL" ? "ОГРН" : "ОГРНИП"}
                      </Label>
                      <Input
                        {...manualForm.register("ogrn")}
                        inputMode="numeric"
                        placeholder={
                          manualType === "LEGAL"
                            ? "13 цифр"
                            : "15 цифр"
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>КПП (только для юр. лица)</Label>
                      <Input
                        {...manualForm.register("kpp")}
                        inputMode="numeric"
                        placeholder="9 цифр"
                        disabled={manualType !== "LEGAL"}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Короткое наименование</Label>
                      <Input
                        {...manualForm.register("displayName")}
                        placeholder="Можно оставить пустым — бэк сгенерирует"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Должность (опционально)</Label>
                      <Input
                        {...manualForm.register("position")}
                        placeholder="Менеджер"
                      />
                    </div>

                    <div className="flex items-center gap-2 space-y-2">
                      <Label>Сделать основным</Label>
                      <Controller
                        control={manualForm.control}
                        name="isPrimary"
                        render={({ field }) => (
                          <Switch
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    {manualType === "LEGAL" ? (
                      <>
                        <div className="space-y-2">
                          <Label>ОПФ (коротко)</Label>
                          <Input
                            {...manualForm.register("opfShort")}
                            placeholder="ООО"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>ОПФ (полностью)</Label>
                          <Input
                            {...manualForm.register("opfFull")}
                            placeholder="Общество с ограниченной ответственностью"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Краткое наименование</Label>
                          <Input
                            {...manualForm.register("shortName")}
                            placeholder="Сбербанк"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Полное наименование</Label>
                          <Input
                            {...manualForm.register("fullName")}
                            placeholder="ПАО Сбербанк"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label>Фамилия</Label>
                          <Input
                            {...manualForm.register("fioLast")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Имя</Label>
                          <Input
                            {...manualForm.register("fioFirst")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Отчество</Label>
                          <Input
                            {...manualForm.register("fioMiddle")}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>ФИО (полностью)</Label>
                          <Input
                            {...manualForm.register("fioFull")}
                            placeholder="Можно оставить пустым"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2 md:col-span-2">
                      <Label>Юридический адрес</Label>
                      <Input
                        {...manualForm.register("legalAddress")}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/10 px-4 py-3 md:col-span-2">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">
                          Фактический адрес совпадает с юридическим
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          Если выключить — можно указать фактический
                          адрес отдельно.
                        </div>
                      </div>
                      <Controller
                        control={manualForm.control}
                        name="actualSameAsLegal"
                        render={({ field }) => (
                          <Switch
                            checked={Boolean(field.value)}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Фактический адрес</Label>
                      <Input
                        {...manualForm.register("actualAddress")}
                        disabled={Boolean(actualSameAsLegal)}
                        placeholder={
                          Boolean(actualSameAsLegal)
                            ? "Совпадает с юридическим"
                            : ""
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Эл. почта</Label>
                      <Input
                        {...manualForm.register("email")}
                        inputMode="email"
                        placeholder="info@example.ru"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Телефон</Label>
                      <Input
                        {...manualForm.register("phone")}
                        inputMode="tel"
                        placeholder="+7..."
                      />
                    </div>

                    <div className="border-t border-border/60 pt-4 md:col-span-2">
                      <p className="mb-3 text-sm font-medium text-foreground">
                        Банковские реквизиты (опционально)
                      </p>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Расчётный счёт (р/с)</Label>
                          <Controller
                            control={manualForm.control}
                            name="bankAccount"
                            render={({ field }) => (
                              <Input
                                {...field}
                                inputMode="numeric"
                                maxLength={20}
                                placeholder="20 цифр"
                                className="rounded-xl"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 20)
                                  )
                                }
                              />
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Наименование банка</Label>
                          <Input
                            {...manualForm.register("bankName")}
                            maxLength={300}
                            placeholder="Название банка"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>БИК</Label>
                          <Controller
                            control={manualForm.control}
                            name="bik"
                            render={({ field }) => (
                              <Input
                                {...field}
                                inputMode="numeric"
                                maxLength={9}
                                placeholder="9 цифр"
                                className="rounded-xl"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 9)
                                  )
                                }
                              />
                            )}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Корреспондентский счёт (к/с)</Label>
                          <Controller
                            control={manualForm.control}
                            name="correspondentAccount"
                            render={({ field }) => (
                              <Input
                                {...field}
                                inputMode="numeric"
                                maxLength={20}
                                placeholder="20 цифр"
                                className="rounded-xl"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 20)
                                  )
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setManualOpen(false)}
                      disabled={binding}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" disabled={binding}>
                      {binding ? "Сохранение..." : "Сохранить"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    );
  }
);
