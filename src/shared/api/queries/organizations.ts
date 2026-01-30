import { gql } from "@apollo/client";

export const ORGANIZATION_SUGGESTIONS = gql`
  query OrganizationSuggestions($query: String!, $count: Int) {
    organizationSuggestions(query: $query, count: $count) {
      type
      inn
      kpp
      ogrn
      displayName
      legalAddress
    }
  }
`;
