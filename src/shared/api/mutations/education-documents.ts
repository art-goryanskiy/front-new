import { gql } from "@apollo/client";

export const CREATE_EDUCATION_DOCUMENT = gql`
  mutation CreateEducationDocument(
    $input: CreateEducationDocumentInput!
  ) {
    createEducationDocument(input: $input) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_EDUCATION_DOCUMENT = gql`
  mutation UpdateEducationDocument(
    $id: ID!
    $input: UpdateEducationDocumentInput!
  ) {
    updateEducationDocument(id: $id, input: $input) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_EDUCATION_DOCUMENT = gql`
  mutation DeleteEducationDocument($id: ID!) {
    deleteEducationDocument(id: $id) {
      id
      name
      image
    }
  }
`;
