"use client";

import { memo } from "react";
import { Controller, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEducationDocuments } from "@/entities/education-document/api/use-education-documents";
import {
  FORM_LABELS,
  FORM_CLASSES,
  FORM_PLACEHOLDERS,
} from "../constants/program-form-constants";
import type { ProgramFormData } from "../types/program-form.types";

interface ProgramFormEducationDocumentFieldProps {
  control: Control<ProgramFormData>;
}

export const ProgramFormEducationDocumentField = memo(
  function ProgramFormEducationDocumentField({
    control,
  }: ProgramFormEducationDocumentFieldProps) {
    const { educationDocuments, loading } = useEducationDocuments();

    return (
      <Controller
        name="educationDocumentId"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className={FORM_CLASSES.pricingLabel}>
              {FORM_LABELS.educationDocument}
            </Label>
            <Select
              value={field.value ?? "none"}
              onValueChange={(v) =>
                field.onChange(v === "none" ? "" : v)
              }
              disabled={loading}
            >
              <SelectTrigger className="w-full bg-background/60">
                <SelectValue
                  placeholder={FORM_PLACEHOLDERS.educationDocument}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без документа</SelectItem>
                {educationDocuments.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />
    );
  }
);
