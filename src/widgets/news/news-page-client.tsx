"use client";

import { NewsListContent } from "./news-list-content";
import { Newspaper } from "lucide-react";

export function NewsPageClient() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <div className="pointer-events-none absolute top-0 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary">
          <Newspaper className="h-6 w-6" aria-hidden />
        </div>
        <div className="pl-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Новости
          </h1>
          <p className="mt-2 text-muted-foreground sm:text-lg">
            Анонсы и новости от Стандарт Плюс
          </p>
        </div>
      </div>
      <NewsListContent />
    </div>
  );
}
