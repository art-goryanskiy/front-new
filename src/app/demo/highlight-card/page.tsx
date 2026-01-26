"use client";

import { HighlightCard } from "@/components/ui/highlight-card";
import { Rocket, BookOpen } from "lucide-react";

export default function HighlightCardDemoPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="mx-auto max-w-4xl space-y-12">
        <h1 className="text-2xl font-bold text-foreground">
          HighlightCard — демо
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <HighlightCard
            title="Space Explorer"
            description={[
              "Embark on interstellar adventures,",
              "discover new planets and galaxies,",
              "share your discoveries with friends,",
              "and reach for the stars together.",
            ]}
            icon={<Rocket className="w-8 h-8 text-white" />}
          />
          <HighlightCard
            href="/programs"
            title="Наши программы"
            description={[
              "Повышение квалификации,",
              "профессиональная переподготовка,",
              "профессиональное обучение.",
            ]}
            icon={<BookOpen className="w-8 h-8 text-white" />}
          />
        </div>
      </div>
    </div>
  );
}
