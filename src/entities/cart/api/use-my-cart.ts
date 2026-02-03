import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { MY_CART } from "@/shared/api/queries/cart";
import type { CartEntity } from "@/shared/api/generated/graphql";

const EMPTY_ITEMS: CartEntity["items"] = [];

export function useMyCart(options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<{
    myCart: CartEntity;
  }>(MY_CART, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    skip: options?.skip ?? false,
  });

  const items = useMemo(
    () => data?.myCart?.items ?? EMPTY_ITEMS,
    [data?.myCart?.items]
  );

  return {
    cart: data?.myCart ?? null,
    items,
    totalAmount: data?.myCart?.totalAmount ?? 0,
    loading,
    error,
    refetch,
  };
}
