"use client";

import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { LearnerFormData } from "../types/learner-form-data.types";
import { PROFILE_FORM_LABELS } from "@/features/profile/ui/constants/profile-form-constants";

const LABELS = {
  lastName: PROFILE_FORM_LABELS.lastName,
  firstName: PROFILE_FORM_LABELS.firstName,
  middleName: PROFILE_FORM_LABELS.middleName,
  dateOfBirth: PROFILE_FORM_LABELS.dateOfBirth,
  citizenship: PROFILE_FORM_LABELS.citizenship,
  passportSeries: PROFILE_FORM_LABELS.passportSeries,
  passportNumber: PROFILE_FORM_LABELS.passportNumber,
  passportIssuedBy: PROFILE_FORM_LABELS.passportIssuedBy,
  passportIssuedAt: PROFILE_FORM_LABELS.passportIssuedAt,
  passportDepartmentCode: PROFILE_FORM_LABELS.passportDepartmentCode,
  snils: PROFILE_FORM_LABELS.snils,
  educationQualification: PROFILE_FORM_LABELS.educationQualification,
  educationDocumentIssuedAt: PROFILE_FORM_LABELS.educationDocumentIssuedAt,
  passportRegistrationAddress: PROFILE_FORM_LABELS.passportRegistrationAddress,
  residentialAddress: PROFILE_FORM_LABELS.residentialAddress,
  sameAsRegistration: "Совпадает с адресом регистрации",
  workPlaceName: "Место работы",
  position: PROFILE_FORM_LABELS.position,
  email: "Email",
  phone: PROFILE_FORM_LABELS.phone,
} as const;

interface LearnerFieldsCardProps {
  data: LearnerFormData;
  onChange: (data: LearnerFormData) => void;
  /** Уникальный префикс для id полей (например, key + index) */
  idPrefix: string;
  /** Данные подставлены из профиля */
  fromProfile?: boolean;
}

export const LearnerFieldsCard = memo(function LearnerFieldsCard({
  data,
  onChange,
  idPrefix,
  fromProfile = false,
}: LearnerFieldsCardProps) {
  const set = (field: keyof LearnerFormData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const setSameAsRegistration = (checked: boolean) => {
    set("sameAsRegistration", checked);
    if (checked) set("residentialAddress", data.passportRegistrationAddress);
  };

  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <div className="space-y-6 rounded-lg border border-border/40 bg-background/60 p-4">
      {fromProfile && (
        <p className="text-xs text-muted-foreground">
          Данные подставлены из профиля
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("lastName")}>{LABELS.lastName}</Label>
          <Input
            id={id("lastName")}
            value={data.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Фамилия"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("firstName")}>{LABELS.firstName}</Label>
          <Input
            id={id("firstName")}
            value={data.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Имя"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={id("middleName")}>{LABELS.middleName}</Label>
          <Input
            id={id("middleName")}
            value={data.middleName}
            onChange={(e) => set("middleName", e.target.value)}
            placeholder="Отчество"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("dateOfBirth")}>{LABELS.dateOfBirth}</Label>
          <Input
            id={id("dateOfBirth")}
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => set("dateOfBirth", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("citizenship")}>{LABELS.citizenship}</Label>
          <Input
            id={id("citizenship")}
            value={data.citizenship}
            onChange={(e) => set("citizenship", e.target.value)}
            placeholder="Гражданство"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">
          Паспортные данные
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={id("passportSeries")}>{LABELS.passportSeries}</Label>
            <Input
              id={id("passportSeries")}
              value={data.passportSeries}
              onChange={(e) => set("passportSeries", e.target.value)}
              placeholder="00 00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("passportNumber")}>{LABELS.passportNumber}</Label>
            <Input
              id={id("passportNumber")}
              value={data.passportNumber}
              onChange={(e) => set("passportNumber", e.target.value)}
              placeholder="000000"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={id("passportIssuedBy")}>{LABELS.passportIssuedBy}</Label>
            <Input
              id={id("passportIssuedBy")}
              value={data.passportIssuedBy}
              onChange={(e) => set("passportIssuedBy", e.target.value)}
              placeholder="Кем выдан"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("passportIssuedAt")}>{LABELS.passportIssuedAt}</Label>
            <Input
              id={id("passportIssuedAt")}
              type="date"
              value={data.passportIssuedAt}
              onChange={(e) => set("passportIssuedAt", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("passportDepartmentCode")}>
              {LABELS.passportDepartmentCode}
            </Label>
            <Input
              id={id("passportDepartmentCode")}
              value={data.passportDepartmentCode}
              onChange={(e) => set("passportDepartmentCode", e.target.value)}
              placeholder="000-000"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("snils")}>{LABELS.snils}</Label>
        <Input
          id={id("snils")}
          value={data.snils}
          onChange={(e) => set("snils", e.target.value)}
          placeholder="000-000-000 00"
        />
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">
          Сведения об образовании
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={id("educationQualification")}>
              {LABELS.educationQualification}
            </Label>
            <Input
              id={id("educationQualification")}
              value={data.educationQualification}
              onChange={(e) => set("educationQualification", e.target.value)}
              placeholder="Квалификация"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("educationDocumentIssuedAt")}>
              {LABELS.educationDocumentIssuedAt}
            </Label>
            <Input
              id={id("educationDocumentIssuedAt")}
              type="date"
              value={data.educationDocumentIssuedAt}
              onChange={(e) => set("educationDocumentIssuedAt", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">Адреса</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={id("passportRegistrationAddress")}>
              {LABELS.passportRegistrationAddress}
            </Label>
            <Input
              id={id("passportRegistrationAddress")}
              value={data.passportRegistrationAddress}
              onChange={(e) => {
                set("passportRegistrationAddress", e.target.value);
                if (data.sameAsRegistration) {
                  set("residentialAddress", e.target.value);
                }
              }}
              placeholder="Адрес регистрации"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id={id("sameAsRegistration")}
              checked={data.sameAsRegistration}
              onCheckedChange={setSameAsRegistration}
            />
            <Label htmlFor={id("sameAsRegistration")} className="cursor-pointer">
              {LABELS.sameAsRegistration}
            </Label>
          </div>
          {!data.sameAsRegistration && (
            <div className="space-y-2">
              <Label htmlFor={id("residentialAddress")}>
                {LABELS.residentialAddress}
              </Label>
              <Input
                id={id("residentialAddress")}
                value={data.residentialAddress}
                onChange={(e) => set("residentialAddress", e.target.value)}
                placeholder="Адрес проживания"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("workPlaceName")}>{LABELS.workPlaceName}</Label>
          <Input
            id={id("workPlaceName")}
            value={data.workPlaceName}
            onChange={(e) => set("workPlaceName", e.target.value)}
            placeholder="Организация"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("position")}>{LABELS.position}</Label>
          <Input
            id={id("position")}
            value={data.position}
            onChange={(e) => set("position", e.target.value)}
            placeholder="Должность"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("email")}>{LABELS.email}</Label>
          <Input
            id={id("email")}
            type="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("phone")}>{LABELS.phone}</Label>
          <Input
            id={id("phone")}
            type="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+7 (999) 000-00-00"
          />
        </div>
      </div>
    </div>
  );
});
