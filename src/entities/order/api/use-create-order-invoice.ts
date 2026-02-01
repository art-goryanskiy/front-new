import { useMutation } from "@apollo/client/react";
import type {
  CreateOrderInvoiceMutation,
  CreateOrderInvoiceMutationVariables,
} from "@/shared/api/generated/graphql";
import { CREATE_ORDER_INVOICE } from "@/shared/api/mutations/orders";

export function useCreateOrderInvoice() {
  const [createInvoiceMutation, { loading, error }] = useMutation<
    CreateOrderInvoiceMutation,
    CreateOrderInvoiceMutationVariables
  >(CREATE_ORDER_INVOICE);

  const createOrderInvoice = async (
    variables: CreateOrderInvoiceMutationVariables
  ): Promise<CreateOrderInvoiceMutation["createOrderInvoice"] | null> => {
    const result = await createInvoiceMutation({ variables });
    return result.data?.createOrderInvoice ?? null;
  };

  return {
    createOrderInvoice,
    loading,
    error,
  };
}
