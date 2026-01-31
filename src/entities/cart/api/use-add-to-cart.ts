import type { AddToCartInput, CartEntity } from "@/shared/api/generated/graphql";
import { ADD_TO_CART } from "@/shared/api/mutations/cart";
import { MY_CART } from "@/shared/api/queries/cart";
import { useMutation } from "@apollo/client/react";

export function useAddToCart() {
  const [addToCartMutation, { loading, error }] = useMutation<{
    addToCart: CartEntity;
  }>(ADD_TO_CART, {
    refetchQueries: [{ query: MY_CART }],
    awaitRefetchQueries: true,
  });

  const addToCart = async (input: AddToCartInput) => {
    const result = await addToCartMutation({ variables: { input } });
    return result.data?.addToCart;
  };

  return {
    addToCart,
    loading,
    error,
  };
}
