import type {
  CreateEducationDocumentInput,
  EducationDocumentEntity,
} from "@/shared/api/generated/graphql";
import { CREATE_EDUCATION_DOCUMENT } from "@/shared/api/mutations/education-documents";
import { GET_EDUCATION_DOCUMENTS } from "@/shared/api/queries/education-documents";
import { useMutation } from "@apollo/client/react";

export function useCreateEducationDocument() {
  const [createEducationDocument, { loading, error }] = useMutation<{
    createEducationDocument: EducationDocumentEntity;
  }>(CREATE_EDUCATION_DOCUMENT, {
    refetchQueries: [{ query: GET_EDUCATION_DOCUMENTS }],
    awaitRefetchQueries: true,
  });

  const handleCreate = async (input: CreateEducationDocumentInput) => {
    const result = await createEducationDocument({ variables: { input } });
    return result.data?.createEducationDocument;
  };

  return {
    createEducationDocument: handleCreate,
    loading,
    error,
  };
}
