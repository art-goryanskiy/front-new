import { useMutation } from "@apollo/client/react";
import {
  AdminSetOrderTrainingDatesDocument,
  AdminOrderDocument,
  type AdminSetOrderTrainingDatesMutation,
  type AdminSetOrderTrainingDatesMutationVariables,
} from "@/shared/api/generated/graphql";

export function useAdminSetOrderTrainingDates(orderId: string) {
  const [mutate, { loading, error }] = useMutation<
    AdminSetOrderTrainingDatesMutation,
    AdminSetOrderTrainingDatesMutationVariables
  >(AdminSetOrderTrainingDatesDocument, {
    refetchQueries: [
      { query: AdminOrderDocument, variables: { id: orderId } },
    ],
  });

  const adminSetOrderTrainingDates = async (input: {
    trainingStartDate?: string;
    trainingEndDate?: string;
  }) => {
    const result = await mutate({
      variables: { orderId, input },
    });
    return result.data?.adminSetOrderTrainingDates ?? null;
  };

  return { adminSetOrderTrainingDates, loading, error };
}
