"use client";

import { memo, useCallback } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  FORM_MESSAGES,
  FORM_CLASSES,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormPricingFieldsProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormPricingFields = memo(
  function ProgramFormPricingFields({
    control,
  }: ProgramFormPricingFieldsProps) {
    const {
      fields: pricingFields,
      append: appendPricing,
      remove: removePricing,
    } = useFieldArray({
      control,
      name: "pricing",
    });

    const handleAppendPricing = useCallback(() => {
      appendPricing({ hours: 0, price: 0 });
    }, [appendPricing]);

    const handleRemovePricing = useCallback(
      (index: number) => {
        removePricing(index);
      },
      [removePricing]
    );

    return (
      <div className={FORM_CLASSES.pricingContainer}>
        {pricingFields.map((field, index) => (
          <div key={field.id} className={FORM_CLASSES.pricingRow}>
            <Controller
              name={`pricing.${index}.hours`}
              control={control}
              render={({ field }) => (
                <div className="flex-1 space-y-2">
                  <Label
                    htmlFor={`pricing-${index}-hours`}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {FORM_LABELS.hours}
                  </Label>
                  <Input
                    {...field}
                    id={`pricing-${index}-hours`}
                    type="number"
                    placeholder={FORM_PLACEHOLDERS.hours}
                    value={field.value?.toString() || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : 0);
                    }}
                    aria-label={`${FORM_LABELS.hours} ${index + 1}`}
                    className={`${FORM_CLASSES.pricingInput} h-10 bg-background/60`}
                  />
                </div>
              )}
            />
            <Controller
              name={`pricing.${index}.price`}
              control={control}
              render={({ field }) => (
                <div className="flex-1 space-y-2">
                  <Label
                    htmlFor={`pricing-${index}-price`}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {FORM_LABELS.price}
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    id={`pricing-${index}-price`}
                    placeholder={FORM_PLACEHOLDERS.price}
                    value={
                      field.value != null ? String(field.value) : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue =
                        value === "" ? 0 : Number(value);
                      field.onChange(isNaN(numValue) ? 0 : numValue);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    aria-label={`${FORM_LABELS.price} ${index + 1}`}
                    className={`${FORM_CLASSES.pricingInput} h-10 bg-background/60`}
                  />
                </div>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemovePricing(index)}
              disabled={pricingFields.length === 1}
              aria-label={`${FORM_MESSAGES.removePricing} ${index + 1}`}
              className="shrink-0"
            >
              {FORM_MESSAGES.removePricing}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAppendPricing}
          className="w-full"
        >
          {FORM_MESSAGES.addPricing}
        </Button>
      </div>
    );
  }
);
