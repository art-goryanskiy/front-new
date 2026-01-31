import type { EducationDocumentEntity } from "@/shared/api/generated/graphql";
import { DELETE_EDUCATION_DOCUMENT } from "@/shared/api/mutations/education-documents";
import { GET_EDUCATION_DOCUMENTS } from "@/shared/api/queries/education-documents";
import { useMutation } from "@apollo/client/react";

export function useDeleteEducationDocument() {
  const [deleteEducationDocument, { loading, error }] = useMutation<{
    deleteEducationDocument: EducationDocumentEntity;
  }>(DELETE_EDUCATION_DOCUMENT, {
    refetchQueries: [{ query: GET_EDUCATION_DOCUMENTS }],
    awaitRefetchQueries: true,
  });

  const handleDelete = async (id: string) => {
    const result = await deleteEducationDocument({ variables: { id } });
    return result.data?.deleteEducationDocument;
  };

  return {
    deleteEducationDocument: handleDelete,
    loading,
    error,
  };
}
