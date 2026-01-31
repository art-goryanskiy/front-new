import { gql } from "@apollo/client";

export const GET_EDUCATION_DOCUMENTS = gql`
  query EducationDocuments {
    educationDocuments {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;

export const GET_EDUCATION_DOCUMENT = gql`
  query EducationDocument($id: ID!) {
    educationDocument(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`;
