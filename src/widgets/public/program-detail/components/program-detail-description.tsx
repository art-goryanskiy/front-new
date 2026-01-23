import { memo } from "react";
import { Card, CardBody } from "@heroui/react";

interface ProgramDetailDescriptionProps {
  description: string;
}

export const ProgramDetailDescription = memo(
  function ProgramDetailDescription({
    description,
  }: ProgramDetailDescriptionProps) {
    return (
      <Card className="border-none shadow-lg">
        <CardBody className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-default-900 dark:text-foreground">
            Описание
          </h2>
          <p className="whitespace-pre-line text-default-700 dark:text-foreground">
            {description}
          </p>
        </CardBody>
      </Card>
    );
  }
);
