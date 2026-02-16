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
import { useMyCart } from "@/entities/cart/api/use-my-cart";
import { buildOrderLinesFromCart } from "@/entities/order/api/build-order-lines-from-cart";
import { useCreateOrderFromCart } from "@/entities/order/api/use-create-order-from-cart";
import { useMe } from "@/features/auth/api/use-me";
import { cn } from "@/lib/utils";
import type {
  CartItemEntity,
  OrderLineLearnerInput,
} from "@/shared/api/generated/graphql";
import { OrderCustomerType } from "@/shared/api/generated/graphql";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { useAuthUser } from "@/shared/store/auth-store";
import { useToastState } from "@/shared/store/toast-store";
import { Surface } from "@/shared/ui/surface/surface";
import { OrganizationSuggestInput } from "@/shared/ui/form-fields/organization-suggest-input";
import type { OrganizationSuggestion } from "@/shared/ui/form-fields/organization-suggest-input";
import { CheckoutFormSkeleton } from "./checkout-form-skeleton";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  CheckoutStepper,
  type CheckoutStep,
} from "./components/checkout-stepper";
import { IndividualApplicantSection } from "./components/individual-applicant-section";
import { LearnerAccordionItem } from "./components/learner-accordion-item";
import { LearnerFieldsCard } from "./components/learner-fields-card";
import type { IndividualApplicantData } from "./types/individual-applicant.types";
import { defaultIndividualApplicantData } from "./types/individual-applicant.types";
import type { LearnerFormData } from "./types/learner-form-data.types";
import { defaultLearnerFormData } from "./types/learner-form-data.types";
import { individualApplicantFromProfile } from "./utils/individual-applicant-from-profile";
import { learnerFromProfile } from "./utils/learner-from-profile";
import {
  validateLearner,
  type LearnerFieldErrors,
} from "./utils/validate-learner";

type CheckoutFormData = {
  customerType: OrderCustomerType;
  organizationId: string;
  contactEmail: string;
  contactPhone: string;
};

/** Дополнительные поля уровня заявки (форма, язык, руководитель, контактное лицо, банк) */
type OrderLevelData = {
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

const defaultOrderLevelData = (): OrderLevelData => ({
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

function toIsoDateOrUndefined(s: string | undefined): string | undefined {
  const t = s?.trim();
  return t ? t : undefined;
}

function normalizeDigits(s: string): string {
  return s.replace(/\D/g, "");
}

function learnerToOrderInput(l: LearnerFormData): OrderLineLearnerInput {
  return {
    lastName: l.lastName,
    firstName: l.firstName,
    middleName: l.middleName?.trim() || undefined,
    email: l.email?.trim() || undefined,
    phone: l.phone?.trim() || undefined,
    dateOfBirth: toIsoDateOrUndefined(l.dateOfBirth),
    citizenship: l.citizenship?.trim() || undefined,
    passportSeries: l.passportSeries?.trim() || undefined,
    passportNumber: l.passportNumber?.trim() || undefined,
    passportIssuedBy: l.passportIssuedBy?.trim() || undefined,
    passportIssuedAt: toIsoDateOrUndefined(l.passportIssuedAt),
    passportDepartmentCode: l.passportDepartmentCode?.trim() || undefined,
    snils: l.snils?.trim() || undefined,
    educationQualification: l.educationQualification?.trim() || undefined,
    educationDocumentIssuedAt: toIsoDateOrUndefined(l.educationDocumentIssuedAt),
    passportRegistrationAddress: l.passportRegistrationAddress?.trim() || undefined,
    residentialAddress: l.residentialAddress?.trim() || undefined,
    workPlaceName: l.workPlaceName?.trim() || undefined,
    position: l.position?.trim() || undefined,
  };
}

function lineKey(item: CartItemEntity): string {
  return `${item.programId}-${item.pricingIndex}-${item.subProgramIndex ?? "p"}`;
}

const STEP_TITLES: Record<CheckoutStep, string> = {
  1: "Заказчик и контакты",
  2: "Данные слушателей",
  3: "Подтверждение заявки",
};

export interface CheckoutFormProps {
  /** Опционально: вызывается при смене шага (для заголовка страницы) */
  onStepChange?: (step: CheckoutStep) => void;
}

export const CheckoutForm = memo(function CheckoutForm({
  onStepChange,
}: CheckoutFormProps) {
  const router = useRouter();
  const storeUser = useAuthUser();
  const { user: meUser, refetch: refetchMe } = useMe({ skip: false });
  const user = meUser ?? storeUser;
  const { items, totalAmount, loading: cartLoading } = useMyCart();

  useEffect(() => {
    refetchMe({ fetchPolicy: "network-only" });
  }, [refetchMe]);
  const { createOrderFromCart, loading: submitting } =
    useCreateOrderFromCart();
  const { showToast } = useToastState();

  const [step, setStep] = useState<CheckoutStep>(1);

  const workPlaces = useMemo(
    () => user?.profile?.workPlaces ?? [],
    [user?.profile?.workPlaces]
  );
  const organizations = useMemo(
    () =>
      workPlaces
        .filter((wp) => wp.organization?.id)
        .map((wp) => ({
          id: wp.organization!.id,
          displayName:
            wp.organization!.displayName ?? wp.organization!.id,
          bankAccount: wp.organization?.bankAccount ?? undefined,
          bankName: wp.organization?.bankName ?? undefined,
          bik: wp.organization?.bik ?? undefined,
          correspondentAccount: wp.organization?.correspondentAccount ?? undefined,
        })),
    [workPlaces]
  );

  const [individualData, setIndividualData] =
    useState<IndividualApplicantData>(() =>
      defaultIndividualApplicantData()
    );

  const [orderLevelData, setOrderLevelData] =
    useState<OrderLevelData>(defaultOrderLevelData);

  const [linesLearners, setLinesLearners] = useState<
    Record<string, LearnerFormData[]>
  >(() => {
    const init: Record<string, LearnerFormData[]> = {};
    items.forEach((item) => {
      init[lineKey(item)] = Array.from(
        { length: item.quantity },
        () => defaultLearnerFormData()
      );
    });
    return init;
  });

  /** Для типа заказчика «не я»: какие слоты слушателей заполнены из профиля («Это я») */
  const [useMyDataForLearner, setUseMyDataForLearner] = useState<
    Record<string, boolean>
  >({});

  /** Ошибки валидации по полям слушателей: key линии -> массив ошибок по индексу слушателя */
  const [learnerErrors, setLearnerErrors] = useState<
    Record<string, LearnerFieldErrors[]>
  >({});

  /** Ошибка валидации поля «Организация» (только при типе заказчика «Организация») */
  const [organizationError, setOrganizationError] = useState<string | null>(
    null
  );

  /** Организация, выбранная по ИНН/названию через OrganizationSuggestInput (приоритет над organizationId) */
  const [organizationFromSuggest, setOrganizationFromSuggest] =
    useState<OrganizationSuggestion | null>(null);

  /** Показывать точки статуса у слушателей только после первой попытки валидации */
  const [showLearnerStatusDots, setShowLearnerStatusDots] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      customerType: OrderCustomerType.Self,
      organizationId: "",
      contactEmail: "",
      contactPhone: "",
    },
    mode: "onChange",
  });

  const customerType = watch("customerType");
  const isOrganization =
    customerType === OrderCustomerType.Organization;
  const isIndividualOrSelf =
    customerType === OrderCustomerType.Self ||
    customerType === OrderCustomerType.Individual;
  const isSelf = customerType === OrderCustomerType.Self;
  const totalLearners = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  const profileLearner = useMemo(() => {
    if (!user?.profile) return null;
    return learnerFromProfile(user.profile, user?.email ?? "");
  }, [user?.profile, user?.email]);

  /** При типе «я»: показывать предложение заполнить профиль, если он не заполнен для подстановки */
  const showProfileSuggestion = useMemo(() => {
    if (!isSelf) return false;
    if (!profileLearner) return true;
    const errors = validateLearner(profileLearner);
    return Object.keys(errors).length > 0;
  }, [isSelf, profileLearner]);

  useEffect(() => {
    const isSelf = customerType === OrderCustomerType.Self;
    const fillLearner =
      isSelf && profileLearner
        ? () => ({ ...profileLearner })
        : defaultLearnerFormData;
    setLinesLearners((prev) => {
      const next: Record<string, LearnerFormData[]> = {};
      items.forEach((item) => {
        const key = lineKey(item);
        const keepPrev =
          isSelf && prev[key]?.length === item.quantity;
        next[key] = keepPrev
          ? prev[key]
          : Array.from({ length: item.quantity }, fillLearner);
      });
      return next;
    });
    if (!isSelf) setUseMyDataForLearner({});
  }, [items, customerType, profileLearner]);

  useLayoutEffect(() => {
    if (customerType !== OrderCustomerType.Self || !user?.profile)
      return;
    const contactEmail = user?.email ?? "";
    const contactPhone = user.profile?.phone ?? "";

    setIndividualData(
      individualApplicantFromProfile(user.profile, contactEmail)
    );
    reset({
      ...getValues(),
      contactEmail,
      contactPhone,
    });
    setValue("contactEmail", contactEmail);
    setValue("contactPhone", contactPhone);

    if (totalLearners >= 1 && items.length > 0 && profileLearner) {
      setLinesLearners((prev) => {
        const next = { ...prev };
        items.forEach((item) => {
          const key = lineKey(item);
          next[key] = Array.from(
            { length: item.quantity },
            () => ({ ...profileLearner })
          );
        });
        return next;
      });
    }
  }, [
    customerType,
    user?.profile,
    user?.email,
    setValue,
    reset,
    totalLearners,
    items,
    profileLearner,
  ]);

  const setLearnerData = useCallback(
    (key: string, learnerIndex: number, data: LearnerFormData) => {
      setLinesLearners((prev) => {
        const list = prev[key] ?? [];
        const next = [...list];
        next[learnerIndex] = data;
        return { ...prev, [key]: next };
      });
      setLearnerErrors((prev) => {
        const list = prev[key];
        if (!list?.length) return prev;
        const next = [...list];
        next[learnerIndex] = {};
        const hasAny = next.some((e) => Object.keys(e).length > 0);
        if (!hasAny) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const learnerSlotId = useCallback((key: string, idx: number) => `${key}-${idx}`, []);

  const setUseMyData = useCallback(
    (key: string, learnerIndex: number, checked: boolean) => {
      const id = learnerSlotId(key, learnerIndex);
      if (checked) {
        if (!profileLearner) {
          showToast(
            "error",
            "Заполните профиль перед подстановкой данных"
          );
          router.push("/profile");
          return;
        }
        const profileErrors = validateLearner(profileLearner);
        if (Object.keys(profileErrors).length > 0) {
          showToast(
            "error",
            "Заполните все обязательные поля в профиле перед подстановкой данных"
          );
          router.push("/profile");
          return;
        }
      }
      setUseMyDataForLearner((prev) => ({ ...prev, [id]: checked }));
      if (profileLearner) {
        setLearnerData(
          key,
          learnerIndex,
          checked ? { ...profileLearner } : defaultLearnerFormData()
        );
      }
    },
    [profileLearner, setLearnerData, learnerSlotId, showToast, router]
  );

  /** Валидирует всех слушателей. Возвращает объект ошибок по ключам линий или null, если ошибок нет. */
  const validateAllLearners = useCallback(
    (): Record<string, LearnerFieldErrors[]> | null => {
      const nextErrors: Record<string, LearnerFieldErrors[]> = {};
      let hasAny = false;
      items.forEach((item) => {
        const key = lineKey(item);
        const learners = linesLearners[key] ?? [];
        const errs = learners.map((learner) => {
          const e = validateLearner(learner);
          if (Object.keys(e).length > 0) hasAny = true;
          return e;
        });
        nextErrors[key] = errs;
      });
      return hasAny ? nextErrors : null;
    },
    [items, linesLearners]
  );

  const goNext = useCallback(() => {
    if (step < 3) {
      if (step === 1 && isOrganization) {
        const hasOrgFromSuggest = !!organizationFromSuggest;
        const orgId = getValues("organizationId")?.trim();
        if (hasOrgFromSuggest) {
          setOrganizationError(null);
        } else {
          if (organizations.length === 0) {
            showToast(
              "error",
              "Добавьте организацию в профиле (раздел «Место работы»)."
            );
            return;
          }
          if (!orgId) {
            setOrganizationError("Выберите организацию");
            showToast("error", "Выберите организацию");
            return;
          }
          setOrganizationError(null);
        }
      }
      if (step === 2) {
        setShowLearnerStatusDots(true);
        const errors = validateAllLearners();
        if (errors != null) {
          setLearnerErrors(errors);
          showToast("error", "Заполните все обязательные поля слушателей");
          return;
        }
        setLearnerErrors({});
      }
      const next = (step + 1) as CheckoutStep;
      setStep(next);
      onStepChange?.(next);
    }
  }, [
    step,
    onStepChange,
    validateAllLearners,
    showToast,
    isOrganization,
    organizations.length,
    getValues,
    organizationFromSuggest,
  ]);

  const goBack = useCallback(() => {
    if (step > 1) {
      if (step === 3) setLearnerErrors({});
      if (step === 2) setOrganizationError(null);
      const prev = (step - 1) as CheckoutStep;
      setStep(prev);
      onStepChange?.(prev);
    }
  }, [step, onStepChange]);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  useEffect(() => {
    if (!isOrganization) {
      setOrganizationError(null);
      setOrganizationFromSuggest(null);
    }
  }, [isOrganization]);

  const onSubmit = useCallback(
    async (data: CheckoutFormData) => {
      if (items.length === 0) {
        showToast("error", "Корзина пуста");
        return;
      }
      const hasOrgFromSuggest = !!organizationFromSuggest;
      const hasOrgId = !!data.organizationId?.trim();
      if (isOrganization && !hasOrgFromSuggest && !hasOrgId) {
        setOrganizationError("Укажите организацию: введите ИНН/название или выберите из профиля");
        setStep(1);
        onStepChange?.(1);
        showToast("error", "Укажите организацию");
        return;
      }

      if (isOrganization) {
        const hasEmail = !!data.contactEmail?.trim();
        const hasPhone = !!data.contactPhone?.trim();
        const hasTrainingForm = !!orderLevelData.trainingForm?.trim();
        const hasTrainingLanguage = !!orderLevelData.trainingLanguage?.trim();
        const hasHeadPosition = !!orderLevelData.headPosition?.trim();
        const hasHeadFullName = !!orderLevelData.headFullName?.trim();
        const hasContactPersonName = !!orderLevelData.contactPersonName?.trim();
        const hasContactPersonPosition = !!orderLevelData.contactPersonPosition?.trim();
        if (
          !hasEmail ||
          !hasPhone ||
          !hasTrainingForm ||
          !hasTrainingLanguage ||
          !hasHeadPosition ||
          !hasHeadFullName ||
          !hasContactPersonName ||
          !hasContactPersonPosition
        ) {
          setStep(1);
          onStepChange?.(1);
          showToast("error", "Заполните все обязательные поля заявки от организации");
          return;
        }
      }

      const learnerValidationErrors = validateAllLearners();
      if (learnerValidationErrors != null) {
        setShowLearnerStatusDots(true);
        setLearnerErrors(learnerValidationErrors);
        setStep(2);
        onStepChange?.(2);
        showToast("error", "Заполните все обязательные поля слушателей");
        return;
      }

      const getLearnersForLine = (
        item: CartItemEntity
      ): OrderLineLearnerInput[] => {
        const key = lineKey(item);
        const stored = linesLearners[key] ?? [];
        return stored.map(learnerToOrderInput);
      };

      const contactEmailSubmit = isIndividualOrSelf
        ? individualData.email?.trim() || undefined
        : data.contactEmail?.trim() || undefined;
      const contactPhoneSubmit = isIndividualOrSelf
        ? individualData.phone?.trim() || undefined
        : data.contactPhone?.trim() || undefined;

      const lines = buildOrderLinesFromCart(
        items,
        getLearnersForLine
      );

      let bankAccount: string | undefined;
      let bankName: string | undefined;
      let bik: string | undefined;
      let correspondentAccount: string | undefined;
      if (isOrganization) {
        const bankAccountRaw = orderLevelData.bankAccount?.trim();
        const bikRaw = orderLevelData.bik?.trim();
        const correspondentAccountRaw = orderLevelData.correspondentAccount?.trim();
        bankAccount = bankAccountRaw ? normalizeDigits(bankAccountRaw) : undefined;
        bik = bikRaw ? normalizeDigits(bikRaw) : undefined;
        correspondentAccount = correspondentAccountRaw
          ? normalizeDigits(correspondentAccountRaw)
          : undefined;
        bankName = orderLevelData.bankName?.trim();
        if (bankName) bankName = bankName.slice(0, 300);

        if (bankAccount && bankAccount.length !== 20) {
          setStep(1);
          onStepChange?.(1);
          showToast("error", "Расчётный счёт (р/с) должен содержать 20 цифр");
          return;
        }
        if (bik && bik.length !== 9) {
          setStep(1);
          onStepChange?.(1);
          showToast("error", "БИК должен содержать 9 цифр");
          return;
        }
        if (correspondentAccount && correspondentAccount.length !== 20) {
          setStep(1);
          onStepChange?.(1);
          showToast("error", "Корреспондентский счёт (к/с) должен содержать 20 цифр");
          return;
        }
      }

      try {
        const order = await createOrderFromCart({
          customerType: data.customerType,
          organizationId: isOrganization && !organizationFromSuggest ? data.organizationId : undefined,
          organizationQuery: isOrganization && organizationFromSuggest ? organizationFromSuggest.inn : undefined,
          contactEmail: contactEmailSubmit,
          contactPhone: contactPhoneSubmit,
          lines,
          trainingForm: orderLevelData.trainingForm?.trim() || undefined,
          trainingLanguage: orderLevelData.trainingLanguage?.trim() || undefined,
          headPosition: orderLevelData.headPosition?.trim() || undefined,
          headFullName: orderLevelData.headFullName?.trim() || undefined,
          contactPersonName: orderLevelData.contactPersonName?.trim() || undefined,
          contactPersonPosition: orderLevelData.contactPersonPosition?.trim() || undefined,
          bankAccount: bankAccount || undefined,
          bankName: bankName || undefined,
          bik: bik || undefined,
          correspondentAccount: correspondentAccount || undefined,
        });
        if (order) {
          showToast("success", "Заявка оформлена");
          router.replace(`/orders/${order.id}/pay`);
        } else {
          showToast("error", "Не удалось оформить заявку");
        }
      } catch (err) {
        const e = err as { message?: string };
        showToast("error", e?.message ?? "Не удалось оформить заявку");
      }
    },
    [
      items,
      isOrganization,
      isIndividualOrSelf,
      linesLearners,
      individualData,
      orderLevelData,
      createOrderFromCart,
      showToast,
      router,
      validateAllLearners,
      onStepChange,
      organizationFromSuggest,
    ]
  );

  if (cartLoading && items.length === 0) {
    return <CheckoutFormSkeleton />;
  }

  if (items.length === 0) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Корзина пуста.</p>
        <Button
          variant="link"
          className="mt-2"
          onClick={() => router.push("/cart")}
        >
          В корзину
        </Button>
      </Surface>
    );
  }

  const isBusy = submitting || formState.isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Surface variant="floating" className="p-6">
        <CheckoutStepper currentStep={step} />
      </Surface>

      {/* Step 1: Заказчик и контакты */}
      {step === 1 && (
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
                  {
                    value: OrderCustomerType.Self,
                    label: "Физ. лицо (я)",
                  },
                  {
                    value: OrderCustomerType.Individual,
                    label: "Физ. лицо",
                  },
                  {
                    value: OrderCustomerType.Organization,
                    label: "Организация",
                  },
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

            {/* Дополнительные данные заявки: форма, язык; для организации — руководитель и контактное лицо */}
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
      )}

      {/* Step 2: Слушатели (аккордеон по каждому) */}
      {step === 2 && (
        <Surface variant="floating" className="space-y-6 p-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {STEP_TITLES[2]}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Укажите данные слушателей по каждой позиции: ФИО, дата
              рождения, гражданство, паспорт, СНИЛС, образование,
              адреса, место работы, должность, контакты.
            </p>
          </div>
          <div className="space-y-6">
            {items.map((item, itemIndex) => {
              const key = lineKey(item);
              const learners = linesLearners[key] ?? [];
              const displayTitle =
                item.displayTitle ?? item.program.title;
              return (
                <div
                  key={key}
                  className={cn(
                    "rounded-2xl border border-border/50 bg-background/95 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md",
                    "dark:border-white/10 dark:bg-muted/5",
                    itemIndex > 0 && "mt-5"
                  )}
                >
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold tracking-tight text-foreground">
                      {displayTitle}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} мест(а) ·{" "}
                      <span className="font-medium text-foreground">
                        {formatPriceWithCurrency(item.lineAmount)}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-3">
                    {learners.map((learner, idx) => {
                      const slotId = learnerSlotId(key, idx);
                      const useMyData = useMyDataForLearner[slotId] ?? false;
                      return (
                        <LearnerAccordionItem
                          key={idx}
                          index={idx}
                          data={learner}
                          defaultOpen={itemIndex === 0 && idx === 0}
                          showUseMyDataCheckbox={
                            !isSelf && !!user?.profile
                          }
                          useMyData={useMyData}
                          onUseMyDataChange={(checked) =>
                            setUseMyData(key, idx, checked)
                          }
                          showStatusDot={showLearnerStatusDots}
                          hasErrors={
                            Object.keys(
                              learnerErrors[key]?.[idx] ?? {}
                            ).length > 0
                          }
                        >
                          <LearnerFieldsCard
                            idPrefix={`${key}-${idx}`}
                            data={learner}
                            onChange={(data) =>
                              setLearnerData(key, idx, data)
                            }
                            fromProfile={isSelf || useMyData}
                            errors={learnerErrors[key]?.[idx]}
                          />
                        </LearnerAccordionItem>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Surface>
      )}

      {/* Step 3: Итог и отправка */}
      {step === 3 && (
        <Surface variant="floating" className="space-y-6 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            {STEP_TITLES[3]}
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Заказчик
              </p>
              <p className="mt-1 text-sm text-foreground">
                {customerType === OrderCustomerType.Self &&
                  "Физ. лицо (я)"}
                {customerType === OrderCustomerType.Individual &&
                  "Физ. лицо"}
                {customerType === OrderCustomerType.Organization &&
                  "Организация"}
                {isIndividualOrSelf &&
                  individualData.lastName &&
                  ` — ${individualData.lastName} ${individualData.firstName} ${individualData.middleName ?? ""}`.trim()}
                {isIndividualOrSelf &&
                  (individualData.email || individualData.phone) &&
                  ` (${[individualData.email, individualData.phone].filter(Boolean).join(", ")})`}
              </p>
            </div>
            <ul className="space-y-2">
              {items.map((item) => {
                const key = lineKey(item);
                const displayTitle =
                  item.displayTitle ?? item.program.title;
                return (
                  <li
                    key={key}
                    className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm"
                  >
                    <span className="font-medium text-foreground">
                      {displayTitle}
                    </span>
                    <span className="text-muted-foreground">
                      {item.quantity} мест(а) ·{" "}
                      {formatPriceWithCurrency(item.lineAmount)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Surface>
      )}

      {/* Нижняя панель: Назад / Далее или Итого + Оформить */}
      <Surface
        variant="floating"
        className="sticky bottom-0 z-10 flex flex-col gap-4 border-t p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShoppingBag className="h-6 w-6 shrink-0 text-primary" aria-hidden />
          <span>Итого: {formatPriceWithCurrency(totalAmount)}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={goBack}>
              Назад
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={goNext}>
              Далее
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              disabled={isBusy}
              className="min-w-[180px]"
            >
              {isBusy ? "Оформление…" : "Оформить заявку"}
            </Button>
          )}
        </div>
      </Surface>
    </form>
  );
});
