"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNews } from "@/entities/news/api/use-news";
import type { NewsEntity } from "@/entities/news/api/news.types";
import { NewsCard, type NewsCardVariant } from "./news-card";
import { LoadingState } from "@/shared/ui/loading-state/loading-state";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;

function getBentoSpan(index: number): { colSpan: string; variant: NewsCardVariant } {
  if (index === 0) return { colSpan: "col-span-1 sm:col-span-2 lg:col-span-3", variant: "featured" };
  const i = index - 1;
  const mod = i % 5;
  if (mod === 0) return { colSpan: "col-span-1 sm:col-span-2", variant: "wide" };
  return { colSpan: "col-span-1", variant: "default" };
}

export function NewsListContent() {
  const [list, setList] = useState<NewsEntity[]>([]);
  const [pageOffset, setPageOffset] = useState(0);
  const { news, loading, error, refetch } = useNews({
    limit: PAGE_SIZE,
    offset: pageOffset,
  });

  useEffect(() => {
    if (loading || !news.length) return;
    if (pageOffset === 0) {
      setList(news);
    } else {
      setList((prev) => {
        const ids = new Set(prev.map((n) => n.id));
        const toAdd = news.filter((n) => !ids.has(n.id));
        return toAdd.length ? [...prev, ...toAdd] : prev;
      });
    }
  }, [loading, news, pageOffset]);

  const loadMore = useCallback(() => {
    setPageOffset(list.length);
  }, [list.length]);

  const hasMore = !loading && news.length === PAGE_SIZE;
  const isLoadingMore = loading && pageOffset > 0;

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

  if (!loading && list.length === 0 && news.length === 0) {
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
        {loading && pageOffset === 0 ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-12"
          >
            <LoadingState />
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
              return (
                <div key={item.id} className={cn("min-w-0", colSpan)}>
                  <NewsCard news={item} index={i} variant={variant} />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {list.length > 0 && hasMore && (
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
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
