"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { Surface } from "@/shared/ui/surface/surface";
import { useMyCart } from "@/entities/cart/api/use-my-cart";
import { useCreateOrderFromCart } from "@/entities/order/api/use-create-order-from-cart";
import { buildOrderLinesFromCart } from "@/entities/order/api/build-order-lines-from-cart";
import type { CartItemEntity } from "@/shared/api/generated/graphql";
import type { OrderLineLearnerInput } from "@/shared/api/generated/graphql";
import { OrderCustomerType } from "@/shared/api/generated/graphql";
import { useAuthUser } from "@/shared/store/auth-store";
import { useToastState } from "@/shared/store/toast-store";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { IndividualApplicantSection } from "./components/individual-applicant-section";
import { LearnerFieldsCard } from "./components/learner-fields-card";
import type { IndividualApplicantData } from "./types/individual-applicant.types";
import {
  defaultIndividualApplicantData,
} from "./types/individual-applicant.types";
import type { LearnerFormData } from "./types/learner-form-data.types";
import { defaultLearnerFormData } from "./types/learner-form-data.types";
import { individualApplicantFromProfile } from "./utils/individual-applicant-from-profile";
import { learnerFromProfile } from "./utils/learner-from-profile";

type CheckoutFormData = {
  customerType: OrderCustomerType;
  organizationId: string;
  contactEmail: string;
  contactPhone: string;
};

function learnerToOrderInput(l: LearnerFormData): OrderLineLearnerInput {
  return {
    lastName: l.lastName,
    firstName: l.firstName,
    middleName: l.middleName?.trim() || undefined,
    email: l.email?.trim() || undefined,
    phone: l.phone?.trim() || undefined,
  };
}

function lineKey(item: CartItemEntity): string {
  return `${item.programId}-${item.pricingIndex}`;
}

export const CheckoutForm = memo(function CheckoutForm() {
  const router = useRouter();
  const user = useAuthUser();
  const { items, totalAmount, loading: cartLoading } = useMyCart();
  const { createOrderFromCart, loading: submitting } = useCreateOrderFromCart();
  const { showToast } = useToastState();

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
          displayName: wp.organization!.displayName ?? wp.organization!.id,
        })),
    [workPlaces]
  );

  const [individualData, setIndividualData] = useState<IndividualApplicantData>(
    () => defaultIndividualApplicantData()
  );

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

  useEffect(() => {
    setLinesLearners((prev) => {
      const next: Record<string, LearnerFormData[]> = {};
      items.forEach((item) => {
        const key = lineKey(item);
        next[key] =
          prev[key]?.length === item.quantity
            ? prev[key]
            : Array.from({ length: item.quantity }, () => defaultLearnerFormData());
      });
      return next;
    });
  }, [items]);

  const { register, handleSubmit, watch, setValue, reset, getValues, formState } =
    useForm<CheckoutFormData>({
      defaultValues: {
        customerType: OrderCustomerType.Self,
        organizationId: "",
        contactEmail: "",
        contactPhone: "",
      },
      mode: "onChange",
    });

  const customerType = watch("customerType");
  const isOrganization = customerType === OrderCustomerType.Organization;
  const isIndividualOrSelf =
    customerType === OrderCustomerType.Self ||
    customerType === OrderCustomerType.Individual;
  const isSelf = customerType === OrderCustomerType.Self;
  const totalLearners = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  // Синхронизация формы и префилл из профиля при появлении user/profile (в т.ч. при первом открытии)
  useEffect(() => {
    if (customerType !== OrderCustomerType.Self || !user?.profile) return;
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

    if (totalLearners >= 1 && items.length > 0) {
      const firstKey = lineKey(items[0]);
      const firstLearner = learnerFromProfile(user.profile, contactEmail);
      setLinesLearners((prev) => {
        const list = prev[firstKey] ?? [];
        const nextList = [...list];
        nextList[0] = firstLearner;
        return { ...prev, [firstKey]: nextList };
      });
    }
  }, [customerType, user?.profile, user?.email, setValue, reset, totalLearners, items]);

  const setLearnerData = useCallback(
    (key: string, learnerIndex: number, data: LearnerFormData) => {
      setLinesLearners((prev) => {
        const list = prev[key] ?? [];
        const next = [...list];
        next[learnerIndex] = data;
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const onSubmit = useCallback(
    async (data: CheckoutFormData) => {
      if (items.length === 0) {
        showToast("error", "Корзина пуста");
        return;
      }
      if (isOrganization && !data.organizationId?.trim()) {
        showToast("error", "Выберите организацию");
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

      const lines = buildOrderLinesFromCart(items, getLearnersForLine);

      try {
        const order = await createOrderFromCart({
          customerType: data.customerType,
          organizationId: isOrganization ? data.organizationId : undefined,
          contactEmail: contactEmailSubmit,
          contactPhone: contactPhoneSubmit,
          lines,
        });
        if (order) {
          showToast("success", "Заказ оформлен");
          router.replace(`/orders/${order.id}/pay`);
        } else {
          showToast("error", "Не удалось оформить заказ");
        }
      } catch (err) {
        const e = err as { message?: string };
        showToast("error", e?.message ?? "Не удалось оформить заказ");
      }
    },
    [
      items,
      isOrganization,
      isIndividualOrSelf,
      linesLearners,
      individualData,
      createOrderFromCart,
      showToast,
      router,
    ]
  );

  if (cartLoading && items.length === 0) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Загрузка корзины…</p>
      </Surface>
    );
  }

  if (items.length === 0) {
    return (
      <Surface variant="floating" className="p-8 text-center">
        <p className="text-muted-foreground">Корзина пуста.</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/cart")}>
          В корзину
        </Button>
      </Surface>
    );
  }

  const isBusy = submitting || formState.isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Surface variant="floating" className="space-y-6 p-6">
        <h2 className="text-lg font-semibold text-foreground">Тип заказчика</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { value: OrderCustomerType.Self, label: "Физ. лицо (я)" },
            { value: OrderCustomerType.Individual, label: "Физ. лицо" },
            { value: OrderCustomerType.Organization, label: "Организация" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                value={opt.value}
                {...register("customerType")}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>

        {isOrganization && (
          <div className="space-y-2">
            <Label htmlFor="organizationId">Организация *</Label>
            <Select
              required={isOrganization}
              value={watch("organizationId")}
              onValueChange={(v) => setValue("organizationId", v)}
            >
              <SelectTrigger id="organizationId" className="w-full">
                <SelectValue placeholder="Выберите организацию" />
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
        )}

        {!isIndividualOrSelf && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register("contactEmail")}
                className="w-full"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Телефон</Label>
              <Input
                id="contactPhone"
                type="tel"
                {...register("contactPhone")}
                className="w-full"
                placeholder="+7 (999) 000-00-00"
              />
            </div>
          </div>
        )}
      </Surface>

      {isIndividualOrSelf && (
        <IndividualApplicantSection
          data={individualData}
          onChange={setIndividualData}
          fromProfile={customerType === OrderCustomerType.Self}
        />
      )}

      <Surface variant="floating" className="space-y-4 p-6">
        <h2 className="text-lg font-semibold text-foreground">Слушатели</h2>
        <p className="text-sm text-muted-foreground">
          Укажите данные слушателей по каждой позиции: ФИО, дата рождения,
          гражданство, паспорт, СНИЛС, образование, адреса, место работы,
          должность, контакты.
        </p>
        {items.map((item, itemIndex) => {
          const key = lineKey(item);
          const learners = linesLearners[key] ?? [];
          return (
            <div
              key={key}
              className={cn(
                "rounded-xl border border-border/60 bg-muted/10 p-4",
                itemIndex > 0 && "mt-4"
              )}
            >
              <p className="font-semibold text-foreground">
                {item.program.title} — {item.quantity} мест(а)
              </p>
              <p className="text-sm text-muted-foreground">
                {formatPriceWithCurrency(item.lineAmount)}
              </p>
              <div className="mt-3 space-y-4">
                {learners.map((learner, idx) => (
                  <LearnerFieldsCard
                    key={idx}
                    idPrefix={`${key}-${idx}`}
                    data={learner}
                    onChange={(data) => setLearnerData(key, idx, data)}
                    fromProfile={
                      isSelf && itemIndex === 0 && idx === 0 && !!user?.profile
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </Surface>

      <Surface variant="floating" className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShoppingBag className="h-6 w-6 text-primary" />
          Итого: {formatPriceWithCurrency(totalAmount)}
        </div>
        <Button type="submit" size="lg" disabled={isBusy}>
          {isBusy ? "Оформление…" : "Оформить заказ"}
        </Button>
      </Surface>
    </form>
  );
});
