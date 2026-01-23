import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories($filter: CategoryFilterInput) {
    categories(filter: $filter) {
      id
      name
      slug
      description
      image
      type
      parent
      createdAt
      updatedAt
      programsCount
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      slug
      description
      image
      type
      parent
      createdAt
      updatedAt
      programsCount
    }
  }
`;
