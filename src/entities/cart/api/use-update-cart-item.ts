import type {
  CartEntity,
  UpdateCartItemInput,
} from "@/shared/api/generated/graphql";
import { UPDATE_CART_ITEM } from "@/shared/api/mutations/cart";
import { MY_CART } from "@/shared/api/queries/cart";
import { useMutation } from "@apollo/client/react";

export function useUpdateCartItem() {
  const [updateCartItemMutation, { loading, error }] = useMutation<{
    updateCartItem: CartEntity;
  }>(UPDATE_CART_ITEM, {
    refetchQueries: [{ query: MY_CART }],
    awaitRefetchQueries: true,
  });

  const updateCartItem = async (input: UpdateCartItemInput) => {
    const result = await updateCartItemMutation({
      variables: { input },
    });
    return result.data?.updateCartItem;
  };

  return {
    updateCartItem,
    loading,
    error,
  };
}
