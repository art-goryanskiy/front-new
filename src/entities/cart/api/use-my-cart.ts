import { useQuery } from "@apollo/client/react";
import { MY_CART } from "@/shared/api/queries/cart";
import type { CartEntity } from "@/shared/api/generated/graphql";

export function useMyCart(options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<{
    myCart: CartEntity;
  }>(MY_CART, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    skip: options?.skip ?? false,
  });

  return {
    cart: data?.myCart ?? null,
    items: data?.myCart?.items ?? [],
    totalAmount: data?.myCart?.totalAmount ?? 0,
    loading,
    error,
    refetch,
  };
}
