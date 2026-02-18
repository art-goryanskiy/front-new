"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderCustomerType } from "@/shared/api/generated/graphql";
import { cn } from "@/lib/utils";
import { Surface } from "@/shared/ui/surface/surface";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import type { OrganizationSuggestion } from "@/shared/ui/form-fields/organization-suggest-input";
import { IndividualApplicantSection } from "./individual-applicant-section";
import type { CheckoutFormData } from "../types/checkout-form.types";
import type { OrderLevelData } from "../types/checkout-form.types";
import { STEP_TITLES } from "../types/checkout-form.types";
import type { IndividualApplicantData } from "../types/individual-applicant.types";
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { memo } from "react";

export interface CheckoutStepCustomerProps {
  register: UseFormRegister<CheckoutFormData>;
  watch: UseFormWatch<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  customerType: OrderCustomerType;
  isOrganization: boolean;
  isIndividualOrSelf: boolean;
  isSelf: boolean;
  organizations: Array<{
    id: string;
    displayName: string;
    bankAccount?: string;
    bankName?: string;
    bik?: string;
    correspondentAccount?: string;
  }>;
  orderLevelData: OrderLevelData;
  setOrderLevelData: React.Dispatch<React.SetStateAction<OrderLevelData>>;
  organizationFromSuggest: OrganizationSuggestion | null;
  setOrganizationFromSuggest: React.Dispatch<React.SetStateAction<OrganizationSuggestion | null>>;
  organizationError: string | null;
  setOrganizationError: React.Dispatch<React.SetStateAction<string | null>>;
  showProfileSuggestion: boolean;
  individualData: IndividualApplicantData;
  setIndividualData: React.Dispatch<React.SetStateAction<IndividualApplicantData>>;
}

export const CheckoutStepCustomer = memo(function CheckoutStepCustomer({
  register,
  watch,
  setValue,
  customerType,
  isOrganization,
  isIndividualOrSelf,
  isSelf,
  organizations,
  orderLevelData,
  setOrderLevelData,
  organizationFromSuggest,
  setOrganizationFromSuggest,
  organizationError,
  setOrganizationError,
  showProfileSuggestion,
  individualData,
  setIndividualData,
}: CheckoutStepCustomerProps) {
  const router = useRouter();

  return (
    <Surface variant="floating" className="space-y-6 p-6">
      <h2 className="text-lg font-semibold text-foreground">
        {STEP_TITLES[1]}
      </h2>
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Тип заказчика
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { value: OrderCustomerType.Self, label: "Физ. лицо (я)" },
              { value: OrderCustomerType.Individual, label: "Физ. лицо" },
              { value: OrderCustomerType.Organization, label: "Организация" },
            ].map((opt) => (
              <label
                key={opt.value}
                htmlFor={`customerType-${opt.value}`}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  id={`customerType-${opt.value}`}
                  value={opt.value}
                  {...register("customerType")}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium text-foreground">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {showProfileSuggestion && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
            <p className="font-medium text-foreground">
              Чтобы данные подставлялись автоматически, заполните профиль.
            </p>
            <Button
              type="button"
              variant="link"
              className="mt-2 h-auto p-0 text-primary underline"
              onClick={() => router.push("/profile")}
            >
              Перейти в профиль
            </Button>
          </div>
        )}

        {isOrganization && (
          <div className="space-y-4">
            <div className="space-y-2">
              <OrganizationSuggestInput
                label="Организация *"
                placeholder="Введите ИНН или название организации"
                description="Введите ИНН или название — выберите из списка. Либо выберите организацию из профиля ниже."
                onSelect={(suggestion) => {
                  setOrganizationFromSuggest(suggestion);
                  setValue("organizationId", "");
                  setOrganizationError(null);
                  setOrderLevelData((prev) => ({
                    ...prev,
                    bankAccount: "",
                    bankName: "",
                    bik: "",
                    correspondentAccount: "",
                  }));
                }}
                clearAfterSelect={false}
              />
              {organizationFromSuggest && (
                <p className="text-sm text-muted-foreground">
                  Выбрано: {organizationFromSuggest.displayName}
                  {organizationFromSuggest.inn && ` (ИНН ${organizationFromSuggest.inn})`}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Или выберите из добавленных в профиле
              </p>
              <Select
                value={watch("organizationId")}
                onValueChange={(v) => {
                  setValue("organizationId", v);
                  setOrganizationFromSuggest(null);
                  setOrganizationError(null);
                  const org = organizations.find((o) => o.id === v);
                  if (org) {
                    setOrderLevelData((prev) => ({
                      ...prev,
                      bankAccount: org.bankAccount ?? "",
                      bankName: org.bankName ?? "",
                      bik: org.bik ?? "",
                      correspondentAccount: org.correspondentAccount ?? "",
                    }));
                  }
                }}
              >
                <SelectTrigger
                  id="organizationId"
                  className={cn(
                    "w-full rounded-xl",
                    organizationError && "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Выберите организацию из профиля" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {organizations.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Добавьте организацию в профиле (раздел «Место работы»).
                </p>
              )}
            </div>
            {organizationError && (
              <p className="text-xs text-destructive">{organizationError}</p>
            )}
          </div>
        )}

        {!isIndividualOrSelf && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">
                Email {isOrganization && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id="contactEmail"
                type="email"
                {...register("contactEmail", { required: isOrganization })}
                className="w-full"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">
                Телефон {isOrganization && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                {...register("contactPhone", { required: isOrganization })}
                className="w-full"
                placeholder="+7 (999) 000-00-00"
              />
            </div>
          </div>
        )}

        {isIndividualOrSelf && (
          <IndividualApplicantSection
            data={individualData}
            onChange={setIndividualData}
            fromProfile={customerType === OrderCustomerType.Self}
          />
        )}

        <div className="rounded-2xl border border-border/50 bg-muted/5 p-5 dark:border-white/10">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Данные заявки
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="trainingForm">
                Форма обучения {isOrganization && <span className="text-destructive">*</span>}
              </Label>
              <Select
                value={orderLevelData.trainingForm || "none"}
                onValueChange={(v) =>
                  setOrderLevelData((p) => ({
                    ...p,
                    trainingForm: v === "none" ? "" : v,
                  }))
                }
              >
                <SelectTrigger id="trainingForm" className="rounded-xl">
                  <SelectValue placeholder="Выберите форму" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Не указано</SelectItem>
                  <SelectItem value="очная">Очная</SelectItem>
                  <SelectItem value="очно-заочная">Очно-заочная</SelectItem>
                  <SelectItem value="заочная">Заочная</SelectItem>
                  <SelectItem value="дистанционная">Дистанционная</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="trainingLanguage">
                Язык обучения {isOrganization && <span className="text-destructive">*</span>}
              </Label>
              <Select
                value={orderLevelData.trainingLanguage || "none"}
                onValueChange={(v) =>
                  setOrderLevelData((p) => ({
                    ...p,
                    trainingLanguage: v === "none" ? "" : v,
                  }))
                }
              >
                <SelectTrigger id="trainingLanguage" className="rounded-xl">
                  <SelectValue placeholder="Выберите язык" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Не указано</SelectItem>
                  <SelectItem value="русский">Русский</SelectItem>
                  <SelectItem value="крымскотатарский">Крымскотатарский</SelectItem>
                  <SelectItem value="украинский">Украинский</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isOrganization && (
              <>
                <div className="space-y-2 sm:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Руководитель
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headPosition">
                    Должность руководителя <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="headPosition"
                    value={orderLevelData.headPosition}
                    onChange={(e) =>
                      setOrderLevelData((p) => ({
                        ...p,
                        headPosition: e.target.value,
                      }))
                    }
                    placeholder="Должность"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="headFullName">
                    ФИО руководителя <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="headFullName"
                    value={orderLevelData.headFullName}
                    onChange={(e) =>
                      setOrderLevelData((p) => ({
                        ...p,
                        headFullName: e.target.value,
                      }))
                    }
                    placeholder="ФИО"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Контактное лицо
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPersonPosition">
                    Должность контактного лица <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactPersonPosition"
                    value={orderLevelData.contactPersonPosition}
                    onChange={(e) =>
                      setOrderLevelData((p) => ({
                        ...p,
                        contactPersonPosition: e.target.value,
                      }))
                    }
                    placeholder="Должность"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPersonName">
                    ФИО контактного лица <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactPersonName"
                    value={orderLevelData.contactPersonName}
                    onChange={(e) =>
                      setOrderLevelData((p) => ({
                        ...p,
                        contactPersonName: e.target.value,
                      }))
                    }
                    placeholder="ФИО"
                    className="rounded-xl"
                  />
                </div>
                <div className="border-t border-border/60 pt-4 sm:col-span-2">
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    Банковские реквизиты (опционально)
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Расчётный счёт (р/с)</Label>
                      <Input
                        id="bankAccount"
                        inputMode="numeric"
                        maxLength={20}
                        value={orderLevelData.bankAccount}
                        onChange={(e) =>
                          setOrderLevelData((p) => ({
                            ...p,
                            bankAccount: e.target.value.replace(/\D/g, "").slice(0, 20),
                          }))
                        }
                        placeholder="20 цифр"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Наименование банка</Label>
                      <Input
                        id="bankName"
                        maxLength={300}
                        value={orderLevelData.bankName}
                        onChange={(e) =>
                          setOrderLevelData((p) => ({
                            ...p,
                            bankName: e.target.value.slice(0, 300),
                          }))
                        }
                        placeholder="Название банка"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bik">БИК</Label>
                      <Input
                        id="bik"
                        inputMode="numeric"
                        maxLength={9}
                        value={orderLevelData.bik}
                        onChange={(e) =>
                          setOrderLevelData((p) => ({
                            ...p,
                            bik: e.target.value.replace(/\D/g, "").slice(0, 9),
                          }))
                        }
                        placeholder="9 цифр"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="correspondentAccount">Корреспондентский счёт (к/с)</Label>
                      <Input
                        id="correspondentAccount"
                        inputMode="numeric"
                        maxLength={20}
                        value={orderLevelData.correspondentAccount}
                        onChange={(e) =>
                          setOrderLevelData((p) => ({
                            ...p,
                            correspondentAccount: e.target.value.replace(/\D/g, "").slice(0, 20),
                          }))
                        }
                        placeholder="20 цифр"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Surface>
  );
});
