import { useMutation } from "@apollo/client/react";
import type {
  CreateOrderSbpLinkMutation,
  CreateOrderSbpLinkMutationVariables,
} from "@/shared/api/generated/graphql";
import { CREATE_ORDER_SBP_LINK } from "@/shared/api/mutations/orders";

export function useCreateOrderSbpLink() {
  const [createSbpLinkMutation, { loading, error }] = useMutation<
    CreateOrderSbpLinkMutation,
    CreateOrderSbpLinkMutationVariables
  >(CREATE_ORDER_SBP_LINK);

  const createOrderSbpLink = async (
    orderId: string
  ): Promise<CreateOrderSbpLinkMutation["createOrderSbpLink"] | null> => {
    const result = await createSbpLinkMutation({ variables: { orderId } });
    return result.data?.createOrderSbpLink ?? null;
  };

  return {
    createOrderSbpLink,
    loading,
    error,
  };
}
