import type {
  EducationDocumentEntity,
  UpdateEducationDocumentInput,
} from "@/shared/api/generated/graphql";
import { UPDATE_EDUCATION_DOCUMENT } from "@/shared/api/mutations/education-documents";
import { GET_EDUCATION_DOCUMENTS } from "@/shared/api/queries/education-documents";
import { useMutation } from "@apollo/client/react";

export function useUpdateEducationDocument() {
  const [updateEducationDocument, { loading, error }] = useMutation<{
    updateEducationDocument: EducationDocumentEntity;
  }>(UPDATE_EDUCATION_DOCUMENT, {
    refetchQueries: [{ query: GET_EDUCATION_DOCUMENTS }],
    awaitRefetchQueries: true,
  });

  const handleUpdate = async (
    id: string,
    input: UpdateEducationDocumentInput
  ) => {
    const result = await updateEducationDocument({
      variables: { id, input },
    });
    return result.data?.updateEducationDocument;
  };

  return {
    updateEducationDocument: handleUpdate,
    loading,
    error,
  };
}
