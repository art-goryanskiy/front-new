"use client";

import { Button } from "@/components/ui/button";
import { useMyCart } from "@/entities/cart/api/use-my-cart";
import { useUpdateCartItem } from "@/entities/cart/api/use-update-cart-item";
import { buildOrderLinesFromCart } from "@/entities/order/api/build-order-lines-from-cart";
import { useCreateOrderFromCart } from "@/entities/order/api/use-create-order-from-cart";
import { useMe } from "@/features/auth/api/use-me";
import type {
  CartItemEntity,
  OrderLineLearnerInput,
} from "@/shared/api/generated/graphql";
import { OrderCustomerType } from "@/shared/api/generated/graphql";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { useAuthUser } from "@/shared/store/auth-store";
import { useToastState } from "@/shared/store/toast-store";
import { Surface } from "@/shared/ui/surface/surface";
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
import { CheckoutStepCustomer } from "./components/checkout-step-customer";
import { CheckoutStepLearners } from "./components/checkout-step-learners";
import { CheckoutStepConfirm } from "./components/checkout-step-confirm";
import type { IndividualApplicantData } from "./types/individual-applicant.types";
import { defaultIndividualApplicantData } from "./types/individual-applicant.types";
import type { LearnerFormData } from "./types/learner-form-data.types";
import { defaultLearnerFormData } from "./types/learner-form-data.types";
import type {
  CheckoutFormData,
  OrderLevelData,
} from "./types/checkout-form.types";
import { defaultOrderLevelData } from "./types/checkout-form.types";
import { individualApplicantFromProfile } from "./utils/individual-applicant-from-profile";
import { learnerFromProfile } from "./utils/learner-from-profile";
import {
  validateLearner,
  type LearnerFieldErrors,
} from "./utils/validate-learner";

function toIsoDateOrUndefined(
  s: string | undefined
): string | undefined {
  const t = s?.trim();
  return t ? t : undefined;
}

function normalizeDigits(s: string): string {
  return s.replace(/\D/g, "");
}

function learnerToOrderInput(
  l: LearnerFormData
): OrderLineLearnerInput {
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
    passportDepartmentCode:
      l.passportDepartmentCode?.trim() || undefined,
    snils: l.snils?.trim() || undefined,
    educationQualification:
      l.educationQualification?.trim() || undefined,
    educationDocumentIssuedAt: toIsoDateOrUndefined(
      l.educationDocumentIssuedAt
    ),
    passportRegistrationAddress:
      l.passportRegistrationAddress?.trim() || undefined,
    residentialAddress: l.residentialAddress?.trim() || undefined,
    workPlaceName: l.workPlaceName?.trim() || undefined,
    position: l.position?.trim() || undefined,
  };
}

function lineKey(item: CartItemEntity): string {
  return `${item.programId}-${item.pricingIndex}-${item.subProgramIndex ?? "p"}`;
}

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
  const { updateCartItem, loading: updatingCart } =
    useUpdateCartItem();

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
          correspondentAccount:
            wp.organization?.correspondentAccount ?? undefined,
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
  const [organizationError, setOrganizationError] = useState<
    string | null
  >(null);

  /** Организация, выбранная по ИНН/названию через OrganizationSuggestInput (приоритет над organizationId) */
  const [organizationFromSuggest, setOrganizationFromSuggest] =
    useState<OrganizationSuggestion | null>(null);

  /** Показывать точки статуса у слушателей только после первой попытки валидации */
  const [showLearnerStatusDots, setShowLearnerStatusDots] =
    useState(false);

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
    setLinesLearners((prev) => {
      const next: Record<string, LearnerFormData[]> = {};
      items.forEach((item) => {
        const key = lineKey(item);
        const currentList = prev[key];
        const currentLen = currentList?.length ?? 0;

        if (!isSelf) {
          // Заказчик не «Я»: каждый слот — либо из профиля (если включено «Подставить мои данные»), либо пустая форма
          next[key] = Array.from(
            { length: item.quantity },
            (_, idx) => {
              const slotId = `${key}-${idx}`;
              return useMyDataForLearner[slotId] && profileLearner
                ? { ...profileLearner }
                : defaultLearnerFormData();
            }
          );
        } else {
          const fillLearner = profileLearner
            ? () => ({ ...profileLearner })
            : defaultLearnerFormData;
          if (currentLen === item.quantity) {
            next[key] = currentList!;
          } else if (currentList && item.quantity > currentLen) {
            next[key] = [
              ...currentList,
              ...Array.from(
                { length: item.quantity - currentLen },
                fillLearner
              ),
            ];
          } else if (currentList && item.quantity < currentLen) {
            next[key] = currentList.slice(0, item.quantity);
          } else {
            next[key] = Array.from(
              { length: item.quantity },
              fillLearner
            );
          }
        }
      });
      return next;
    });
    if (!isSelf && Object.keys(useMyDataForLearner).length > 0) {
      setUseMyDataForLearner({});
    }
  }, [items, customerType, profileLearner, useMyDataForLearner]);

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
          next[key] = Array.from({ length: item.quantity }, () => ({
            ...profileLearner,
          }));
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
    getValues,
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit key from rest
          const { [key]: _omit, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const learnerSlotId = useCallback(
    (key: string, idx: number) => `${key}-${idx}`,
    []
  );

  /** Добавить слот слушателя по линии: обновить корзину (quantity+1) и локально добавить пустую форму */
  const addLearnerToLine = useCallback(
    async (key: string, item: CartItemEntity) => {
      const fillLearner =
        isSelf && profileLearner
          ? () => ({ ...profileLearner })
          : defaultLearnerFormData;
      setLinesLearners((prev) => ({
        ...prev,
        [key]: [...(prev[key] ?? []), fillLearner()],
      }));
      try {
        await updateCartItem({
          programId: item.programId,
          pricingIndex: item.pricingIndex,
          quantity: item.quantity + 1,
          subProgramIndex: item.subProgramIndex ?? undefined,
        });
      } catch {
        showToast("error", "Не удалось добавить место");
        setLinesLearners((prev) => {
          const list = prev[key] ?? [];
          if (list.length <= item.quantity) return prev;
          return { ...prev, [key]: list.slice(0, item.quantity) };
        });
      }
    },
    [isSelf, profileLearner, updateCartItem, showToast]
  );

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
  const validateAllLearners = useCallback((): Record<
    string,
    LearnerFieldErrors[]
  > | null => {
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
  }, [items, linesLearners]);

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
          showToast(
            "error",
            "Заполните все обязательные поля слушателей"
          );
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
        setOrganizationError(
          "Укажите организацию: введите ИНН/название или выберите из профиля"
        );
        setStep(1);
        onStepChange?.(1);
        showToast("error", "Укажите организацию");
        return;
      }

      if (isOrganization) {
        const hasEmail = !!data.contactEmail?.trim();
        const hasPhone = !!data.contactPhone?.trim();
        const hasTrainingForm = !!orderLevelData.trainingForm?.trim();
        const hasTrainingLanguage =
          !!orderLevelData.trainingLanguage?.trim();
        const hasHeadPosition = !!orderLevelData.headPosition?.trim();
        const hasHeadFullName = !!orderLevelData.headFullName?.trim();
        const hasContactPersonName =
          !!orderLevelData.contactPersonName?.trim();
        const hasContactPersonPosition =
          !!orderLevelData.contactPersonPosition?.trim();
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
          showToast(
            "error",
            "Заполните все обязательные поля заявки от организации"
          );
          return;
        }
      }

      const learnerValidationErrors = validateAllLearners();
      if (learnerValidationErrors != null) {
        setShowLearnerStatusDots(true);
        setLearnerErrors(learnerValidationErrors);
        setStep(2);
        onStepChange?.(2);
        showToast(
          "error",
          "Заполните все обязательные поля слушателей"
        );
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
        const correspondentAccountRaw =
          orderLevelData.correspondentAccount?.trim();
        bankAccount = bankAccountRaw
          ? normalizeDigits(bankAccountRaw)
          : undefined;
        bik = bikRaw ? normalizeDigits(bikRaw) : undefined;
        correspondentAccount = correspondentAccountRaw
          ? normalizeDigits(correspondentAccountRaw)
          : undefined;
        bankName = orderLevelData.bankName?.trim();
        if (bankName) bankName = bankName.slice(0, 300);

        if (bankAccount && bankAccount.length !== 20) {
          setStep(1);
          onStepChange?.(1);
          showToast(
            "error",
            "Расчётный счёт (р/с) должен содержать 20 цифр"
          );
          return;
        }
        if (bik && bik.length !== 9) {
          setStep(1);
          onStepChange?.(1);
          showToast("error", "БИК должен содержать 9 цифр");
          return;
        }
        if (
          correspondentAccount &&
          correspondentAccount.length !== 20
        ) {
          setStep(1);
          onStepChange?.(1);
          showToast(
            "error",
            "Корреспондентский счёт (к/с) должен содержать 20 цифр"
          );
          return;
        }
      }

      try {
        const order = await createOrderFromCart({
          customerType: data.customerType,
          organizationId:
            isOrganization && !organizationFromSuggest
              ? data.organizationId
              : undefined,
          organizationQuery:
            isOrganization && organizationFromSuggest
              ? organizationFromSuggest.inn
              : undefined,
          contactEmail: contactEmailSubmit,
          contactPhone: contactPhoneSubmit,
          lines,
          trainingForm:
            orderLevelData.trainingForm?.trim() || undefined,
          trainingLanguage:
            orderLevelData.trainingLanguage?.trim() || undefined,
          headPosition:
            orderLevelData.headPosition?.trim() || undefined,
          headFullName:
            orderLevelData.headFullName?.trim() || undefined,
          contactPersonName:
            orderLevelData.contactPersonName?.trim() || undefined,
          contactPersonPosition:
            orderLevelData.contactPersonPosition?.trim() || undefined,
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
        showToast(
          "error",
          e?.message ?? "Не удалось оформить заявку"
        );
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

      {step === 1 && (
        <CheckoutStepCustomer
          register={register}
          watch={watch}
          setValue={setValue}
          customerType={customerType}
          isOrganization={isOrganization}
          isIndividualOrSelf={isIndividualOrSelf}
          isSelf={isSelf}
          organizations={organizations}
          orderLevelData={orderLevelData}
          setOrderLevelData={setOrderLevelData}
          organizationFromSuggest={organizationFromSuggest}
          setOrganizationFromSuggest={setOrganizationFromSuggest}
          organizationError={organizationError}
          setOrganizationError={setOrganizationError}
          showProfileSuggestion={showProfileSuggestion}
          individualData={individualData}
          setIndividualData={setIndividualData}
        />
      )}

      {step === 2 && (
        <CheckoutStepLearners
          items={items}
          lineKey={lineKey}
          linesLearners={linesLearners}
          learnerSlotId={learnerSlotId}
          useMyDataForLearner={useMyDataForLearner}
          setUseMyData={setUseMyData}
          addLearnerToLine={addLearnerToLine}
          updatingCart={updatingCart}
          showLearnerStatusDots={showLearnerStatusDots}
          learnerErrors={learnerErrors}
          setLearnerData={setLearnerData}
          isSelf={isSelf}
          hasUserProfile={!!user?.profile}
        />
      )}

      {step === 3 && (
        <CheckoutStepConfirm
          customerType={customerType}
          isIndividualOrSelf={isIndividualOrSelf}
          individualData={individualData}
          items={items}
        />
      )}

      {/* Нижняя панель: Назад / Далее или Итого + Оформить */}
      <Surface
        variant="floating"
        className="sticky bottom-0 z-10 flex flex-col gap-4 border-t p-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShoppingBag
            className="h-6 w-6 shrink-0 text-primary"
            aria-hidden
          />
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
