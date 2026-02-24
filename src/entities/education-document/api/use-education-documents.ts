import { useQuery } from "@apollo/client/react";
import { GET_EDUCATION_DOCUMENTS } from "@/shared/api/queries/education-documents";
import type { EducationDocumentEntity } from "@/shared/api/generated/graphql";

export function useEducationDocuments(options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<{
    educationDocuments: EducationDocumentEntity[];
  }>(GET_EDUCATION_DOCUMENTS, {
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: false,
    skip: options?.skip ?? false,
  });
  return {
    educationDocuments: (data?.educationDocuments ??
      []) as EducationDocumentEntity[],
    loading,
    error,
    refetch,
  };
}
