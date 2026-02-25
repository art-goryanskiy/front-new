import { gql } from "@apollo/client";

export const CREATE_PROGRAM = gql`
  mutation CreateProgram($input: CreateProgramInput!) {
    createProgram(input: $input) {
      id
      title
      slug
      educationDocumentId
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation UpdateProgram($id: ID!, $input: UpdateProgramInput!) {
    updateProgram(id: $id, input: $input) {
      id
      title
      slug
      educationDocumentId
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation DeleteProgram($id: ID!) {
    deleteProgram(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROGRAMS_BULK = gql`
  mutation UpdateProgramsBulk($input: UpdateProgramsBulkInput!) {
    updateProgramsBulk(input: $input) {
      total
      updated
      failed {
        id
        code
        message
      }
    }
  }
`;
