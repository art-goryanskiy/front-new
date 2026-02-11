"use client";

import { useMemo } from "react";
import { useCategories } from "@/entities/category/api/use-categories";
import { usePrograms } from "@/entities/program/api/use-programs";
import { useMyOrders } from "@/entities/order/api/use-my-orders";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import type { CategoryType } from "@/shared/api/generated/graphql";

export interface PublicSearchResult {
  id: string;
  type: "category" | "program" | "order";
  label: string;
  path: string;
  icon: "folder" | "book" | "receipt";
  description?: string;
  parentCategoryName?: string;
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  AWAITING_PAYMENT: "Ожидает оплаты",
  PAID: "Оплачен",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

/** Сколько заявок подгружать для поиска по выпадалке (показываем до 5 после фильтрации). */
const SEARCH_ORDERS_LIMIT = 15;

/** Лимит результатов категорий и программ в подсказках поиска. */
const SEARCH_RESULTS_LIMIT = 5;

/**
 * Хук для получения результатов поиска:
 * - незарегистрированный: категории и программы;
 * - зарегистрированный: + заявки (поиск по id, email, названиям программ).
 */
export function usePublicSearchResults(
  query: string,
  options?: { isAuthenticated?: boolean }
) {
  const debouncedQuery = useDebounce(query, 300);
  const hasQuery = debouncedQuery.length > 0;
  const isAuthenticated = options?.isAuthenticated ?? false;

  const { categories, loading: categoriesLoading } = useCategories(
    hasQuery ? { search: debouncedQuery, limit: SEARCH_RESULTS_LIMIT } : undefined,
    { skip: !hasQuery }
  );

  const { categories: allCategories } = useCategories(undefined, {
    skip: !hasQuery,
  });

  const { programs, loading: programsLoading } = usePrograms(
    hasQuery ? { search: debouncedQuery, limit: SEARCH_RESULTS_LIMIT } : undefined,
    { skip: !hasQuery }
  );

  const { orders, loading: ordersLoading } = useMyOrders({
    filter: { limit: SEARCH_ORDERS_LIMIT },
    skip: !isAuthenticated || !hasQuery,
  });

  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    allCategories.forEach((cat) => {
      map.set(cat.id, cat.name);
    });
    return map;
  }, [allCategories]);

  const searchResults: PublicSearchResult[] = useMemo(() => {
    const results: PublicSearchResult[] = [];
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return results;

    if (categories.length > 0) {
      categories.forEach((category) => {
        let parentCategoryName: string | undefined;
        if (category.parent) {
          parentCategoryName = categoriesMap.get(category.parent);
        } else if (category.type) {
          parentCategoryName =
            CATEGORY_TYPE_LABELS[category.type as CategoryType];
        }
        results.push({
          id: `category-${category.id}`,
          type: "category",
          label: category.name,
          path: `/categories/${category.id}`,
          icon: "folder",
          description: category.description || undefined,
          parentCategoryName,
        });
      });
    }

    if (programs.length > 0) {
      programs.forEach((program) => {
        const programCategory = allCategories.find(
          (cat) => cat.id === program.category
        );
        let parentCategoryName: string | undefined;
        if (programCategory) {
          if (programCategory.parent) {
            parentCategoryName = categoriesMap.get(programCategory.parent);
          } else if (programCategory.type) {
            parentCategoryName =
              CATEGORY_TYPE_LABELS[
                programCategory.type as CategoryType
              ];
          }
        }
        results.push({
          id: `program-${program.id}`,
          type: "program",
          label: program.title,
          path: `/programs/${program.id}`,
          icon: "book",
          description: program.description || undefined,
          parentCategoryName,
        });
      });
    }

    if (isAuthenticated && orders.length > 0) {
      const matchesOrder = (order: {
        id: string;
        number?: string | null;
        contactEmail?: string | null;
        contactPhone?: string | null;
        status?: string;
        lines?: Array<{ programTitle?: string | null }> | null;
      }) => {
        const orderNumber = order.number ?? order.id;
        if (orderNumber.toLowerCase().includes(q)) return true;
        if (order.contactEmail?.toLowerCase().includes(q)) return true;
        if (
          order.contactPhone?.replace(/\D/g, "").includes(q.replace(/\D/g, ""))
        )
          return true;
        if (
          order.status &&
          ORDER_STATUS_LABELS[order.status]?.toLowerCase().includes(q)
        )
          return true;
        const programTitles =
          order.lines
            ?.map((l) => l.programTitle?.toLowerCase())
            .filter(Boolean) ?? [];
        if (programTitles.some((t) => t?.includes(q))) return true;
        return false;
      };

      const filteredOrders = orders.filter((order) => matchesOrder(order));

      filteredOrders.slice(0, 5).forEach((order) => {
        const statusLabel =
          order.status && ORDER_STATUS_LABELS[order.status]
            ? ORDER_STATUS_LABELS[order.status]
            : order.status ?? "";
        const programTitles =
          order.lines
            ?.map((l) => l.programTitle)
            .filter(Boolean)
            .join(", ") ?? "";
        const orderNumber = order.number ?? order.id;
        results.push({
          id: `order-${order.id}`,
          type: "order",
          label: orderNumber.length > 10 ? `Заявка ${orderNumber.slice(0, 10)}…` : `Заявка ${orderNumber}`,
          path: `/orders/${order.id}`,
          icon: "receipt",
          description: programTitles || statusLabel || undefined,
          parentCategoryName: statusLabel || undefined,
        });
      });
    }

    return results;
  }, [
    debouncedQuery,
    categories,
    programs,
    orders,
    isAuthenticated,
    categoriesMap,
    allCategories,
  ]);

  return {
    results: searchResults,
    loading:
      categoriesLoading || programsLoading || (isAuthenticated && ordersLoading),
  };
}
