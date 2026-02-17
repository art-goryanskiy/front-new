"use client";

import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { LearnerFormData } from "../types/learner-form-data.types";
import type { LearnerFieldErrors } from "../utils/validate-learner";
import { PROFILE_FORM_LABELS } from "@/features/profile/ui/constants/profile-form-constants";
import { cn } from "@/lib/utils";

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

const REQUIRED_SUFFIX = " *";

interface LearnerFieldsCardProps {
  data: LearnerFormData;
  onChange: (data: LearnerFormData) => void;
  /** Уникальный префикс для id полей (например, key + index) */
  idPrefix: string;
  /** Данные подставлены из профиля */
  fromProfile?: boolean;
  /** Ошибки валидации по полям */
  errors?: LearnerFieldErrors;
}

export const LearnerFieldsCard = memo(function LearnerFieldsCard({
  data,
  onChange,
  idPrefix,
  fromProfile = false,
  errors = {},
}: LearnerFieldsCardProps) {
  const set = (field: keyof LearnerFormData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const setSameAsRegistration = (checked: boolean) => {
    onChange({
      ...data,
      sameAsRegistration: checked,
      ...(checked
        ? { residentialAddress: data.passportRegistrationAddress }
        : {}),
    });
  };

  const id = (name: string) => `${idPrefix}-${name}`;

  const fieldClass = (field: keyof LearnerFormData) =>
    cn(errors[field] && "border-destructive focus-visible:ring-destructive/20");

  return (
    <div className="space-y-6 rounded-lg border border-border/40 bg-background/60 p-4">
      {fromProfile && (
        <p className="text-xs text-muted-foreground">
          Данные подставлены из профиля
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("lastName")}>{LABELS.lastName}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("lastName")}
            value={data.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Фамилия"
            className={fieldClass("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("firstName")}>{LABELS.firstName}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("firstName")}
            value={data.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Имя"
            className={fieldClass("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor={id("middleName")}>{LABELS.middleName}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("middleName")}
            value={data.middleName}
            onChange={(e) => set("middleName", e.target.value)}
            placeholder="Отчество"
            className={fieldClass("middleName")}
          />
          {errors.middleName && (
            <p className="text-xs text-destructive">{errors.middleName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("dateOfBirth")}>{LABELS.dateOfBirth}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("dateOfBirth")}
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => set("dateOfBirth", e.target.value)}
            className={fieldClass("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("citizenship")}>{LABELS.citizenship}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("citizenship")}
            value={data.citizenship}
            onChange={(e) => set("citizenship", e.target.value)}
            placeholder="Гражданство"
            className={fieldClass("citizenship")}
          />
          {errors.citizenship && (
            <p className="text-xs text-destructive">{errors.citizenship}</p>
          )}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">
          Паспортные данные
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={id("passportSeries")}>{LABELS.passportSeries}{REQUIRED_SUFFIX}</Label>
            <Input
              id={id("passportSeries")}
              value={data.passportSeries}
              onChange={(e) => set("passportSeries", e.target.value)}
              placeholder="00 00"
              className={fieldClass("passportSeries")}
            />
            {errors.passportSeries && (
              <p className="text-xs text-destructive">{errors.passportSeries}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("passportNumber")}>{LABELS.passportNumber}{REQUIRED_SUFFIX}</Label>
            <Input
              id={id("passportNumber")}
              value={data.passportNumber}
              onChange={(e) => set("passportNumber", e.target.value)}
              placeholder="000000"
              className={fieldClass("passportNumber")}
            />
            {errors.passportNumber && (
              <p className="text-xs text-destructive">{errors.passportNumber}</p>
            )}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={id("passportIssuedBy")}>{LABELS.passportIssuedBy}{REQUIRED_SUFFIX}</Label>
            <Input
              id={id("passportIssuedBy")}
              value={data.passportIssuedBy}
              onChange={(e) => set("passportIssuedBy", e.target.value)}
              placeholder="Кем выдан"
              className={fieldClass("passportIssuedBy")}
            />
            {errors.passportIssuedBy && (
              <p className="text-xs text-destructive">{errors.passportIssuedBy}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("passportIssuedAt")}>{LABELS.passportIssuedAt}{REQUIRED_SUFFIX}</Label>
            <Input
              id={id("passportIssuedAt")}
              type="date"
              value={data.passportIssuedAt}
              onChange={(e) => set("passportIssuedAt", e.target.value)}
              className={fieldClass("passportIssuedAt")}
            />
            {errors.passportIssuedAt && (
              <p className="text-xs text-destructive">{errors.passportIssuedAt}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("passportDepartmentCode")}>
              {LABELS.passportDepartmentCode}{REQUIRED_SUFFIX}
            </Label>
            <Input
              id={id("passportDepartmentCode")}
              value={data.passportDepartmentCode}
              onChange={(e) => set("passportDepartmentCode", e.target.value)}
              placeholder="000-000"
              className={fieldClass("passportDepartmentCode")}
            />
            {errors.passportDepartmentCode && (
              <p className="text-xs text-destructive">{errors.passportDepartmentCode}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("snils")}>{LABELS.snils}{REQUIRED_SUFFIX}</Label>
        <Input
          id={id("snils")}
          value={data.snils}
          onChange={(e) => set("snils", e.target.value)}
          placeholder="000-000-000 00"
          className={fieldClass("snils")}
        />
        {errors.snils && (
          <p className="text-xs text-destructive">{errors.snils}</p>
        )}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">
          Сведения об образовании
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={id("educationQualification")}>
              {LABELS.educationQualification}{REQUIRED_SUFFIX}
            </Label>
            <Input
              id={id("educationQualification")}
              value={data.educationQualification}
              onChange={(e) => set("educationQualification", e.target.value)}
              placeholder="Квалификация"
              className={fieldClass("educationQualification")}
            />
            {errors.educationQualification && (
              <p className="text-xs text-destructive">{errors.educationQualification}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={id("educationDocumentIssuedAt")}>
              {LABELS.educationDocumentIssuedAt}{REQUIRED_SUFFIX}
            </Label>
            <Input
              id={id("educationDocumentIssuedAt")}
              type="date"
              value={data.educationDocumentIssuedAt}
              onChange={(e) => set("educationDocumentIssuedAt", e.target.value)}
              className={fieldClass("educationDocumentIssuedAt")}
            />
            {errors.educationDocumentIssuedAt && (
              <p className="text-xs text-destructive">{errors.educationDocumentIssuedAt}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-foreground">Адреса</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={id("passportRegistrationAddress")}>
              {LABELS.passportRegistrationAddress}{REQUIRED_SUFFIX}
            </Label>
            <Input
              id={id("passportRegistrationAddress")}
              value={data.passportRegistrationAddress}
              onChange={(e) => {
                const value = e.target.value;
                onChange({
                  ...data,
                  passportRegistrationAddress: value,
                  ...(data.sameAsRegistration ? { residentialAddress: value } : {}),
                });
              }}
              placeholder="Адрес регистрации"
              className={fieldClass("passportRegistrationAddress")}
            />
            {errors.passportRegistrationAddress && (
              <p className="text-xs text-destructive">{errors.passportRegistrationAddress}</p>
            )}
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
                {LABELS.residentialAddress}{REQUIRED_SUFFIX}
              </Label>
              <Input
                id={id("residentialAddress")}
                value={data.residentialAddress}
                onChange={(e) => set("residentialAddress", e.target.value)}
                placeholder="Адрес проживания"
                className={fieldClass("residentialAddress")}
              />
              {errors.residentialAddress && (
                <p className="text-xs text-destructive">{errors.residentialAddress}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("workPlaceName")}>{LABELS.workPlaceName}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("workPlaceName")}
            value={data.workPlaceName}
            onChange={(e) => set("workPlaceName", e.target.value)}
            placeholder="Организация"
            className={fieldClass("workPlaceName")}
          />
          {errors.workPlaceName && (
            <p className="text-xs text-destructive">{errors.workPlaceName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("position")}>{LABELS.position}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("position")}
            value={data.position}
            onChange={(e) => set("position", e.target.value)}
            placeholder="Должность"
            className={fieldClass("position")}
          />
          {errors.position && (
            <p className="text-xs text-destructive">{errors.position}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("email")}>{LABELS.email}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("email")}
            type="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@example.com"
            className={fieldClass("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={id("phone")}>{LABELS.phone}{REQUIRED_SUFFIX}</Label>
          <Input
            id={id("phone")}
            type="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+7 (999) 000-00-00"
            className={fieldClass("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
});
