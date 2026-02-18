"use client";

import { Surface } from "@/shared/ui/surface/surface";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { OrderCustomerType } from "@/shared/api/generated/graphql";
import type { CartItemEntity } from "@/shared/api/generated/graphql";
import { STEP_TITLES } from "../types/checkout-form.types";
import type { IndividualApplicantData } from "../types/individual-applicant.types";
import { memo } from "react";

export interface CheckoutStepConfirmProps {
  customerType: OrderCustomerType;
  isIndividualOrSelf: boolean;
  individualData: IndividualApplicantData;
  items: CartItemEntity[];
}

export const CheckoutStepConfirm = memo(function CheckoutStepConfirm({
  customerType,
  isIndividualOrSelf,
  individualData,
  items,
}: CheckoutStepConfirmProps) {
  const customerLabel =
    customerType === OrderCustomerType.Self
      ? "Физ. лицо (я)"
      : customerType === OrderCustomerType.Individual
        ? "Физ. лицо"
        : customerType === OrderCustomerType.Organization
          ? "Организация"
          : "";

  const individualSuffix =
    isIndividualOrSelf && individualData.lastName
      ? ` — ${individualData.lastName} ${individualData.firstName} ${individualData.middleName ?? ""}`.trim()
      : "";
  const contactSuffix =
    isIndividualOrSelf && (individualData.email || individualData.phone)
      ? ` (${[individualData.email, individualData.phone].filter(Boolean).join(", ")})`
      : "";

  return (
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
            {customerLabel}
            {individualSuffix}
            {contactSuffix}
          </p>
        </div>
        <ul className="space-y-2">
          {items.map((item) => {
            const displayTitle = item.displayTitle ?? item.program.title;
            return (
              <li
                key={`${item.programId}-${item.pricingIndex}-${item.subProgramIndex ?? "p"}`}
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
  );
});
