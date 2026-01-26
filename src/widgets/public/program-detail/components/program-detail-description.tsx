import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProgramDetailDescriptionProps {
  description: string;
}

export const ProgramDetailDescription = memo(
  function ProgramDetailDescription({
    description,
  }: ProgramDetailDescriptionProps) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Описание
          </h2>
          <p className="whitespace-pre-line text-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    );
  }
);
