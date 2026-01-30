"use client";

import { Switch } from "@/components/ui/switch";
import { AddressSuggestField } from "@/shared/ui/form-fields/address-suggest-field";
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
import { useWatch } from "react-hook-form";
import { ProfileFieldPreview } from "../components/profile-field-preview";
import { formatProfileValue } from "../utils/profile-preview-utils";
import { memo, useEffect, useMemo, useState } from "react";

interface ProfileAddressesSectionProps<T extends ProfileFormData> {
  control: Control<T>;
  mode?: "view" | "edit";
  values?: ProfileFormData;
  setValue?: UseFormSetValue<ProfileFormData>;
}

export const ProfileAddressesSection = memo(
  function ProfileAddressesSection<
    T extends ProfileFormData = ProfileFormData,
  >({
    control,
    mode = "edit",
    values,
    setValue,
  }: ProfileAddressesSectionProps<T>) {
    const fieldName = <K extends keyof ProfileFormData>(
      name: K
    ): FieldPath<T> => name as unknown as FieldPath<T>;

    const registrationValue = useWatch({
      control,
      name: fieldName("passportRegistrationAddress"),
    }) as unknown as string | undefined;

    const residentialValue = useWatch({
      control,
      name: fieldName("residentialAddress"),
    }) as unknown as string | undefined;

    const initiallySame = useMemo(() => {
      const a = (registrationValue ?? "").trim();
      const b = (residentialValue ?? "").trim();
      return Boolean(a && b && a === b);
    }, [registrationValue, residentialValue]);

    const [sameAsRegistration, setSameAsRegistration] = useState(
      () => initiallySame
    );

    useEffect(() => {
      if (!sameAsRegistration) return;
      if (!setValue) return;
      const reg = registrationValue ?? "";
      const res = residentialValue ?? "";
      if (reg === res) return;
      setValue("residentialAddress", reg, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }, [
      registrationValue,
      residentialValue,
      sameAsRegistration,
      setValue,
    ]);

    if (mode === "view") {
      const passportRegistrationAddress = formatProfileValue(
        values?.passportRegistrationAddress
      );
      const residentialAddress = formatProfileValue(
        values?.residentialAddress
      );

      return (
        <div className={PROFILE_FORM_CLASSES.section}>
          <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>
            Адреса
          </h3>
          <div className={PROFILE_FORM_CLASSES.fieldGrid}>
            <ProfileFieldPreview
              className="md:col-span-2"
              label={PROFILE_FORM_LABELS.passportRegistrationAddress}
              value={passportRegistrationAddress}
            />
            <ProfileFieldPreview
              className="md:col-span-2"
              label={PROFILE_FORM_LABELS.residentialAddress}
              value={residentialAddress}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={PROFILE_FORM_CLASSES.section}>
        <h3 className={PROFILE_FORM_CLASSES.sectionTitle}>Адреса</h3>
        <div className={PROFILE_FORM_CLASSES.fieldGrid}>
          <AddressSuggestField
            control={control}
            name={fieldName("passportRegistrationAddress")}
            label={PROFILE_FORM_LABELS.passportRegistrationAddress}
            placeholder={
              PROFILE_FORM_PLACEHOLDERS.passportRegistrationAddress
            }
            className="md:col-span-2"
            debounceMs={350}
            minQueryLength={3}
            count={8}
          />

          <div className="md:col-span-2">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/10 px-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">
                  Адрес проживания совпадает с адресом регистрации
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  При включении адрес проживания заполнится
                  автоматически.
                </div>
              </div>
              <Switch
                checked={sameAsRegistration}
                onCheckedChange={(checked) => {
                  setSameAsRegistration(checked);
                  if (checked && setValue) {
                    setValue(
                      "residentialAddress",
                      registrationValue ?? "",
                      { shouldDirty: true, shouldValidate: true }
                    );
                  }
                }}
              />
            </div>
          </div>

          <AddressSuggestField
            control={control}
            name={fieldName("residentialAddress")}
            label={PROFILE_FORM_LABELS.residentialAddress}
            placeholder={PROFILE_FORM_PLACEHOLDERS.residentialAddress}
            className="md:col-span-2"
            debounceMs={350}
            minQueryLength={3}
            count={8}
            isDisabled={sameAsRegistration}
            description={
              sameAsRegistration
                ? "Отключите переключатель, чтобы указать другой адрес проживания."
                : undefined
            }
          />
        </div>
      </div>
    );
  }
);
