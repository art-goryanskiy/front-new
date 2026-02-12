import { useMutation } from "@apollo/client/react";
import {
  AdminUpdateOrderDocumentDateDocument,
  AdminGenerateOrderContractDocument,
  AdminGenerateOrderActDocument,
  AdminGenerateOrderTrainingApplicationDocument,
  AdminOrderDocumentsDocument,
  type AdminUpdateOrderDocumentDateMutation,
  type AdminUpdateOrderDocumentDateMutationVariables,
  type AdminGenerateOrderContractMutation,
  type AdminGenerateOrderContractMutationVariables,
  type AdminGenerateOrderActMutation,
  type AdminGenerateOrderActMutationVariables,
  type AdminGenerateOrderTrainingApplicationMutation,
  type AdminGenerateOrderTrainingApplicationMutationVariables,
  type OrderDocument,
} from "@/shared/api/generated/graphql";

const refetchDoc = (orderId: string) => [
  { query: AdminOrderDocumentsDocument, variables: { orderId } },
];

export function useAdminUpdateOrderDocumentDate(orderId: string) {
  const [mutate, { loading, error }] = useMutation<
    AdminUpdateOrderDocumentDateMutation,
    AdminUpdateOrderDocumentDateMutationVariables
  >(AdminUpdateOrderDocumentDateDocument, {
    refetchQueries: () => refetchDoc(orderId),
  });

  const adminUpdateOrderDocumentDate = async (
    orderDocumentId: string,
    documentDate: string
  ): Promise<OrderDocument | null> => {
    const result = await mutate({
      variables: { input: { orderDocumentId, documentDate } },
    });
    return result.data?.adminUpdateOrderDocumentDate ?? null;
  };

  return { adminUpdateOrderDocumentDate, loading, error };
}

export function useAdminGenerateOrderContract(orderId: string) {
  const [mutate, { loading, error }] = useMutation<
    AdminGenerateOrderContractMutation,
    AdminGenerateOrderContractMutationVariables
  >(AdminGenerateOrderContractDocument, {
    refetchQueries: () => refetchDoc(orderId),
  });

  const adminGenerateOrderContract = async (
    documentDate?: string
  ): Promise<OrderDocument | null> => {
    const result = await mutate({
      variables: { input: { orderId, documentDate: documentDate ?? undefined } },
    });
    return result.data?.adminGenerateOrderContract ?? null;
  };

  return { adminGenerateOrderContract, loading, error };
}

export function useAdminGenerateOrderAct(orderId: string) {
  const [mutate, { loading, error }] = useMutation<
    AdminGenerateOrderActMutation,
    AdminGenerateOrderActMutationVariables
  >(AdminGenerateOrderActDocument, {
    refetchQueries: () => refetchDoc(orderId),
  });

  const adminGenerateOrderAct = async (
    documentDate?: string
  ): Promise<OrderDocument | null> => {
    const result = await mutate({
      variables: { input: { orderId, documentDate: documentDate ?? undefined } },
    });
    return result.data?.adminGenerateOrderAct ?? null;
  };

  return { adminGenerateOrderAct, loading, error };
}

export function useAdminGenerateOrderTrainingApplication(orderId: string) {
  const [mutate, { loading, error }] = useMutation<
    AdminGenerateOrderTrainingApplicationMutation,
    AdminGenerateOrderTrainingApplicationMutationVariables
  >(AdminGenerateOrderTrainingApplicationDocument, {
    refetchQueries: () => refetchDoc(orderId),
  });

  const adminGenerateOrderTrainingApplication = async (): Promise<OrderDocument | null> => {
    const result = await mutate({ variables: { orderId } });
    return result.data?.adminGenerateOrderTrainingApplication ?? null;
  };

  return { adminGenerateOrderTrainingApplication, loading, error };
}
