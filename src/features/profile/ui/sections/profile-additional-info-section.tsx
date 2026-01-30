"use client";

import { FormField } from "@/shared/ui/form-field/form-field";
import {
  PROFILE_FORM_LABELS,
  PROFILE_FORM_PLACEHOLDERS,
  PROFILE_FORM_CLASSES,
} from "../constants/profile-form-constants";
import type { ProfileFormData } from "../types/profile-form.types";
import type {
  Control,
  FieldPath,
  UseFormSetValue,
} from "react-hook-form";
import { ProfileFieldPreview } from "../components/profile-field-preview";
import { formatProfileValue } from "../utils/profile-preview-utils";
import { memo, useMemo, useState } from "react";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import { useMutation } from "@apollo/client/react";
import {
  SET_MY_WORK_PLACE_BY_INN,
  SET_MY_WORK_PLACE_MANUAL,
} from "@/shared/api/mutations/work-place";
import { ME } from "@/shared/api/queries/auth";
import { useToastState } from "@/shared/store/toast-store";
import type { FetchResult } from "@apollo/client";
import { toUserFriendlyMessage } from "@/shared/lib/graphql/error-to-user-message";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import type { ProfileEmploymentData } from "../types/profile-form.types";

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
    control,
    mode = "edit",
    values,
    setValue,
  }: ProfileAdditionalInfoSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    const { showToast } = useToastState();

    const apiWorkPlaceName = useMemo(() => {
      const items = (values?.employments ||
        []) as ProfileEmploymentData[];
      const primary =
        items.find((e) => Boolean(e?.isPrimary)) || items[0];
      const v = primary?.organization?.displayName?.trim();
      return v ? v : null;
    }, [values?.employments]);

    // Локальный оверрайд: чтобы имя появлялось сразу после выбора подсказки,
    // пока идёт refetch `ME` (серверный источник истины).
    const [workPlaceNameOverride, setWorkPlaceNameOverride] =
      useState<string | null>(null);

    const workPlaceNameRaw =
      apiWorkPlaceName ?? workPlaceNameOverride;

    const workPlaceNamePretty = useMemo(() => {
      if (!workPlaceNameRaw) return null;
      const n = workPlaceNameRaw.trim().replace(/\s+/g, " ");
      if (n.length <= 60) return n;
      return `${n.slice(0, 57)}…`;
    }, [workPlaceNameRaw]);

    const [binding, setBinding] = useState(false);
    const [manualOpen, setManualOpen] = useState(false);
    const [orgApiUnavailable, setOrgApiUnavailable] = useState(false);

    const [setMyWorkPlaceByInn] = useMutation<{
      setMyWorkPlaceByInn: {
        workPlaceId?: string | null;
        position?: string | null;
        employments?: Array<{
          id: string;
          organizationId: string;
          position?: string | null;
          isPrimary: boolean;
        }> | null;
      };
    }>(SET_MY_WORK_PLACE_BY_INN, {
      errorPolicy: "all",
    });

    const [setMyWorkPlaceManual] = useMutation<{
      setMyWorkPlaceManual: { workPlaceId?: string | null };
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
      },
      mode: "onChange",
    });

    const manualType = manualForm.watch("type");
    const actualSameAsLegal = manualForm.watch("actualSameAsLegal");

    const normalizeDigits = (s: string) => s.replace(/\D/g, "");

    const buildManualDisplayName = (data: ManualForm) => {
      const explicit = data.displayName?.trim();
      if (explicit) return explicit;
      if (data.type === "INDIVIDUAL") {
        const fio =
          data.fioFull?.trim() ||
          [data.fioLast, data.fioFirst, data.fioMiddle]
            .map((v) => v?.trim())
            .filter(Boolean)
            .join(" ");
        return fio ? `ИП ${fio}` : "ИП";
      }
      const short = data.shortName?.trim();
      const full = data.fullName?.trim();
      const opf = data.opfShort?.trim() || data.opfFull?.trim();
      const base = short || full || "Организация";
      return opf ? `${opf} ${base}` : base;
    };

    if (mode === "view") {
      const position = formatProfileValue(values?.position);
      const snils = formatProfileValue(values?.snils);
      const avatar = formatProfileValue(values?.avatar);

      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Дополнительная информация
          </h3>
          <div className={PROFILE_FORM_CLASSES.fieldGrid}>
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.position}
              value={position}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.snils}
              value={snils}
            />
            <ProfileFieldPreview
              label={PROFILE_FORM_LABELS.workPlaceId}
              value={workPlaceNamePretty}
            />
            <ProfileFieldPreview
              className="md:col-span-2"
              label={PROFILE_FORM_LABELS.avatar}
              value={avatar}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
          Дополнительная информация
        </h3>
        <div className={PROFILE_FORM_CLASSES.fieldGrid}>
          <FormField
            control={control}
            name={fieldName("position")}
            label={PROFILE_FORM_LABELS.position}
            placeholder={PROFILE_FORM_PLACEHOLDERS.position}
            type="text"
          />
          <FormField
            control={control}
            name={fieldName("snils")}
            label={PROFILE_FORM_LABELS.snils}
            placeholder={PROFILE_FORM_PLACEHOLDERS.snils}
            type="text"
          />
          <OrganizationSuggestInput
            className="md:col-span-2"
            label="Место работы"
            placeholder="Введите ИНН или название организации"
            description={
              workPlaceNamePretty
                ? `Место работы: ${workPlaceNamePretty}`
                : "Выберите организацию из подсказок — профиль привяжется автоматически."
            }
            isDisabled={binding}
            debounceMs={350}
            minQueryLength={3}
            count={8}
            onApiUnavailableChange={(v) => setOrgApiUnavailable(v)}
            onSelect={async (sug) => {
              try {
                setBinding(true);
                const input = {
                  inn: sug.inn,
                  kpp: sug.kpp ?? undefined,
                };
                const result: FetchResult<{
                  setMyWorkPlaceByInn: {
                    workPlaceId?: string | null;
                    position?: string | null;
                    employments?: Array<{
                      id: string;
                      organizationId: string;
                      position?: string | null;
                      isPrimary: boolean;
                    }> | null;
                  };
                }> = await setMyWorkPlaceByInn({
                  variables: { input },
                  refetchQueries: [{ query: ME }],
                  awaitRefetchQueries: true,
                });
                if (result.errors?.length) {
                  const msg = toUserFriendlyMessage(
                    result.errors[0]?.message || ""
                  );
                  showToast(
                    "error",
                    msg || "Не удалось привязать организацию"
                  );
                  return;
                }
                const id =
                  result.data?.setMyWorkPlaceByInn?.workPlaceId ?? "";
                if (setValue) {
                  setValue("workPlaceId", id, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }
                const pos =
                  result.data?.setMyWorkPlaceByInn?.position ?? "";
                if (setValue && pos) {
                  setValue("position", pos, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }
                if (id) {
                  setWorkPlaceNameOverride(sug.displayName);
                }
                showToast("success", "Место работы обновлено");
              } catch (e) {
                const msg =
                  e instanceof Error
                    ? toUserFriendlyMessage(e.message)
                    : "Не удалось привязать организацию";
                showToast("error", msg);
              } finally {
                setBinding(false);
              }
            }}
          />

          {orgApiUnavailable && (
            <div className="md:col-span-2">
              <Button
                type="button"
                variant="outline"
                disabled={binding}
                onClick={() => setManualOpen(true)}
                className="w-full"
              >
                Ввести организацию вручную
              </Button>
            </div>
          )}

          {orgApiUnavailable && (
            <Dialog open={manualOpen} onOpenChange={setManualOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    Место работы — ручной ввод
                  </DialogTitle>
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
                      };

                      const result: FetchResult<{
                        setMyWorkPlaceManual: {
                          workPlaceId?: string | null;
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

                      const id =
                        result.data?.setMyWorkPlaceManual
                          ?.workPlaceId ?? "";
                      if (setValue) {
                        setValue("workPlaceId", id, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }

                      setWorkPlaceNameOverride(
                        buildManualDisplayName(data)
                      );
                      showToast("success", "Место работы обновлено");
                      setManualOpen(false);
                    } catch (e) {
                      const msg =
                        e instanceof Error
                          ? toUserFriendlyMessage(e.message)
                          : "Не удалось сохранить место работы";
                      showToast("error", msg);
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
          <FormField
            control={control}
            name={fieldName("avatar")}
            label={PROFILE_FORM_LABELS.avatar}
            placeholder={PROFILE_FORM_PLACEHOLDERS.avatar}
            type="url"
            className="md:col-span-2"
          />
        </div>
      </div>
    );
  }
);
