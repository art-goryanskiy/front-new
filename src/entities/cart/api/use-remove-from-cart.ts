import type {
  CartEntity,
  RemoveFromCartInput,
} from "@/shared/api/generated/graphql";
import { REMOVE_FROM_CART } from "@/shared/api/mutations/cart";
import { MY_CART } from "@/shared/api/queries/cart";
import { useMutation } from "@apollo/client/react";

export function useRemoveFromCart() {
  const [removeFromCartMutation, { loading, error }] = useMutation<{
    removeFromCart: CartEntity;
  }>(REMOVE_FROM_CART, {
    refetchQueries: [{ query: MY_CART }],
    awaitRefetchQueries: true,
  });

  const removeFromCart = async (input: RemoveFromCartInput) => {
    const result = await removeFromCartMutation({ variables: { input } });
    return result.data?.removeFromCart;
  };

  return {
    removeFromCart,
    loading,
    error,
  };
}
