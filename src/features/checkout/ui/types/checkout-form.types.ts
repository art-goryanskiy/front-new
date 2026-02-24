import type { CheckoutStep } from "../components/checkout-stepper";
import type { OrderCustomerType } from "@/shared/api/generated/graphql";

export type CheckoutFormData = {
  customerType: OrderCustomerType;
  organizationId: string;
  contactEmail: string;
  contactPhone: string;
};

/** Дополнительные поля уровня заявки (форма, язык, руководитель, контактное лицо, банк) */
export type OrderLevelData = {
  trainingForm: string;
  trainingLanguage: string;
  headPosition: string;
  headFullName: string;
  contactPersonName: string;
  contactPersonPosition: string;
  bankAccount: string;
  bankName: string;
  bik: string;
  correspondentAccount: string;
};

export const defaultOrderLevelData = (): OrderLevelData => ({
  trainingForm: "",
  trainingLanguage: "",
  headPosition: "",
  headFullName: "",
  contactPersonName: "",
  contactPersonPosition: "",
  bankAccount: "",
  bankName: "",
  bik: "",
  correspondentAccount: "",
});

export const STEP_TITLES: Record<CheckoutStep, string> = {
  1: "Заказчик и контакты",
  2: "Данные слушателей",
  3: "Подтверждение заявки",
};
