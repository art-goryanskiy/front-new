"use client";

import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";
import { formatPriceWithCurrency } from "@/shared/lib/helpers/format-helpers";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LearnerAccordionItem } from "./learner-accordion-item";
import { LearnerFieldsCard } from "./learner-fields-card";
import { STEP_TITLES } from "../types/checkout-form.types";
import type { LearnerFormData } from "../types/learner-form-data.types";
import type { LearnerFieldErrors } from "../utils/validate-learner";
import type { CartItemEntity } from "@/shared/api/generated/graphql";
import { memo } from "react";

export interface CheckoutStepLearnersProps {
  items: CartItemEntity[];
  lineKey: (item: CartItemEntity) => string;
  linesLearners: Record<string, LearnerFormData[]>;
  learnerSlotId: (key: string, idx: number) => string;
  useMyDataForLearner: Record<string, boolean>;
  setUseMyData: (
    key: string,
    learnerIndex: number,
    checked: boolean
  ) => void;
  addLearnerToLine: (
    key: string,
    item: CartItemEntity
  ) => Promise<void>;
  updatingCart: boolean;
  showLearnerStatusDots: boolean;
  learnerErrors: Record<string, LearnerFieldErrors[]>;
  setLearnerData: (
    key: string,
    learnerIndex: number,
    data: LearnerFormData
  ) => void;
  isSelf: boolean;
  hasUserProfile: boolean;
}

export const CheckoutStepLearners = memo(
  function CheckoutStepLearners({
    items,
    lineKey,
    linesLearners,
    learnerSlotId,
    useMyDataForLearner,
    setUseMyData,
    addLearnerToLine,
    updatingCart,
    showLearnerStatusDots,
    learnerErrors,
    setLearnerData,
    isSelf,
    hasUserProfile,
  }: CheckoutStepLearnersProps) {
    return (
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
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold tracking-tight text-foreground">
                    {displayTitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} мест(а) ·{" "}
                      <span className="font-medium text-foreground">
                        {formatPriceWithCurrency(item.lineAmount)}
                      </span>
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={updatingCart}
                      onClick={() => addLearnerToLine(key, item)}
                      className="shrink-0"
                    >
                      <UserPlus
                        className="mr-1.5 h-4 w-4"
                        aria-hidden
                      />
                      Добавить слушателя
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {learners.map((learner, idx) => {
                    const slotId = learnerSlotId(key, idx);
                    const useMyData =
                      useMyDataForLearner[slotId] ?? false;
                    return (
                      <LearnerAccordionItem
                        key={idx}
                        index={idx}
                        data={learner}
                        defaultOpen={itemIndex === 0 && idx === 0}
                        showUseMyDataCheckbox={
                          !isSelf && hasUserProfile
                        }
                        useMyData={useMyData}
                        onUseMyDataChange={(checked) =>
                          setUseMyData(key, idx, checked)
                        }
                        showStatusDot={showLearnerStatusDots}
                        hasErrors={
                          Object.keys(learnerErrors[key]?.[idx] ?? {})
                            .length > 0
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
    );
  }
);
