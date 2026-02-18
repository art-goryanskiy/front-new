"use client";

import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Surface } from "@/shared/ui/surface/surface";
import type { IndividualApplicantData } from "../types/individual-applicant.types";
import { PROFILE_FORM_LABELS } from "@/features/profile/ui/constants/profile-form-constants";

const LABELS = {
  lastName: PROFILE_FORM_LABELS.lastName,
  firstName: PROFILE_FORM_LABELS.firstName,
  middleName: PROFILE_FORM_LABELS.middleName,
  email: "Email",
  phone: PROFILE_FORM_LABELS.phone,
} as const;

interface IndividualApplicantSectionProps {
  data: IndividualApplicantData;
  onChange: (data: IndividualApplicantData) => void;
  /** «Обучаюсь я» — данные из профиля */
  fromProfile?: boolean;
}

export const IndividualApplicantSection = memo(
  function IndividualApplicantSection({
    data,
    onChange,
    fromProfile = false,
  }: IndividualApplicantSectionProps) {
    const set = (
      field: keyof IndividualApplicantData,
      value: string
    ) => {
      onChange({ ...data, [field]: value });
    };

    return (
      <Surface variant="floating" className="space-y-6 p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Данные заказчика (физическое лицо)
          {fromProfile && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              — подставлены из профиля
            </span>
          )}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ia-lastName">{LABELS.lastName}</Label>
            <Input
              id="ia-lastName"
              value={data.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              placeholder="Фамилия"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ia-firstName">{LABELS.firstName}</Label>
            <Input
              id="ia-firstName"
              value={data.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              placeholder="Имя"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="ia-middleName">{LABELS.middleName}</Label>
            <Input
              id="ia-middleName"
              value={data.middleName}
              onChange={(e) => set("middleName", e.target.value)}
              placeholder="Отчество"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ia-email">{LABELS.email}</Label>
            <Input
              id="ia-email"
              type="email"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ia-phone">{LABELS.phone}</Label>
            <Input
              id="ia-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+7 (999) 000-00-00"
            />
          </div>
        </div>
      </Surface>
    );
  }
);
