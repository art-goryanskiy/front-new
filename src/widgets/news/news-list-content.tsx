"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNews } from "@/entities/news/api/use-news";
import type { NewsEntity } from "@/entities/news/api/news.types";
import { NewsCard, type NewsCardVariant } from "./news-card";
import { NewsListSkeleton } from "./news-list-skeleton";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

function getBentoSpan(index: number): {
  colSpan: string;
  variant: NewsCardVariant;
} {
  if (index === 0)
    return {
      colSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
      variant: "featured",
    };
  const i = index - 1;
  const mod = i % 5;
  if (mod === 0)
    return { colSpan: "col-span-1 sm:col-span-2", variant: "wide" };
  return { colSpan: "col-span-1", variant: "default" };
}

export function NewsListContent() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [firstNewIndex, setFirstNewIndex] = useState<number | null>(
    null
  );
  const firstNewRef = useRef<HTMLDivElement | null>(null);
  const { news, loading, error, refetch } = useNews({
    limit: visibleCount,
    offset: 0,
  });
  const list = news as NewsEntity[];

  useEffect(() => {
    if (firstNewIndex !== null && !loading && firstNewRef.current) {
      firstNewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [firstNewIndex, loading, list.length]);

  const loadMore = useCallback(() => {
    setFirstNewIndex(list.length);
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, [list.length]);

  const hasMore = !loading && list.length >= visibleCount;
  const isLoadingMore = loading && visibleCount > PAGE_SIZE;

  if (error) {
    return (
      <div className="space-y-3">
        <ErrorState
          title="Не удалось загрузить новости"
          message={error.message}
        />
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Повторить
        </Button>
      </div>
    );
  }

  if (!loading && list.length === 0) {
    return (
      <EmptyState
        title="Новостей пока нет"
        description="Здесь появятся новости и анонсы."
      />
    );
  }

  return (
    <div className="space-y-10">
      <AnimatePresence mode="wait">
        {loading && visibleCount === PAGE_SIZE ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4"
          >
            <NewsListSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {list.map((item, i) => {
              const { colSpan, variant } = getBentoSpan(i);
              const isFirstNew =
                firstNewIndex !== null && i === firstNewIndex;
              return (
                <div
                  key={item.id}
                  ref={isFirstNew ? firstNewRef : undefined}
                  className={cn("min-w-0", colSpan)}
                >
                  <NewsCard
                    news={item}
                    index={i}
                    variant={variant}
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {list.length > 0 && (hasMore || isLoadingMore) && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={loadMore}
            disabled={isLoadingMore}
            className="min-w-[200px] rounded-xl border-border/60 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            {isLoadingMore ? (
              <>
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden
                />
                Загрузка…
              </>
            ) : (
              <span>Подгрузить ещё</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
