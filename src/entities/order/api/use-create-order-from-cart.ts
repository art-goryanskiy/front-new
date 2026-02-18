import { useMutation } from "@apollo/client/react";
import type {
  CreateOrderFromCartMutation,
  CreateOrderFromCartMutationVariables,
  OrderFieldsFragment,
} from "@/shared/api/generated/graphql";
import { MY_CART } from "@/shared/api/queries/cart";
import { CREATE_ORDER_FROM_CART } from "@/shared/api/mutations/orders";

export function useCreateOrderFromCart() {
  const [createOrderMutation, { loading, error }] = useMutation<
    CreateOrderFromCartMutation,
    CreateOrderFromCartMutationVariables
  >(CREATE_ORDER_FROM_CART, {
    refetchQueries: [{ query: MY_CART }],
    awaitRefetchQueries: true,
  });

  const createOrderFromCart = async (
    input: CreateOrderFromCartMutationVariables["input"]
  ): Promise<OrderFieldsFragment | null> => {
    const result = await createOrderMutation({
      variables: { input },
    });
    const raw = result.data?.createOrderFromCart ?? null;
    return raw as OrderFieldsFragment | null;
  };

  return {
    createOrderFromCart,
    loading,
    error,
  };
}
