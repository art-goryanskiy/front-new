"use client";

import { memo, useCallback, useMemo } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button, Input } from "@heroui/react";
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

    const classNames = useMemo(
      () => ({
        inputWrapper: "w-full",
        input: "w-full",
      }),
      []
    );

    return (
      <div className={FORM_CLASSES.pricingContainer}>
        {pricingFields.map((field, index) => (
          <div key={field.id} className={FORM_CLASSES.pricingRow}>
            <Controller
              name={`pricing.${index}.hours`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label={FORM_LABELS.hours}
                  placeholder={FORM_PLACEHOLDERS.hours}
                  value={field.value?.toString() || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number(value) : 0);
                  }}
                  aria-label={`${FORM_LABELS.hours} ${index + 1}`}
                  className={FORM_CLASSES.pricingInput}
                  classNames={classNames}
                />
              )}
            />
            <Controller
              name={`pricing.${index}.price`}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  step="0.01"
                  label={FORM_LABELS.price}
                  placeholder={FORM_PLACEHOLDERS.price}
                  value={
                    field.value != null ? String(field.value) : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = value === "" ? 0 : Number(value);
                    field.onChange(isNaN(numValue) ? 0 : numValue);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  aria-label={`${FORM_LABELS.price} ${index + 1}`}
                  className={FORM_CLASSES.pricingInput}
                  classNames={classNames}
                />
              )}
            />
            <Button
              type="button"
              variant="light"
              color="danger"
              onPress={() => handleRemovePricing(index)}
              isDisabled={pricingFields.length === 1}
              aria-label={`${FORM_MESSAGES.removePricing} ${index + 1}`}
              className="shrink-0"
            >
              {FORM_MESSAGES.removePricing}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="bordered"
          size="sm"
          onPress={handleAppendPricing}
          className="w-full"
        >
          {FORM_MESSAGES.addPricing}
        </Button>
      </div>
    );
  }
);
