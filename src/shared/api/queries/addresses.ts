import { gql } from "@apollo/client";

export const ADDRESS_SUGGESTIONS = gql`
  query AddressSuggestions($query: String!, $count: Int) {
    addressSuggestions(query: $query, count: $count) {
      value
      unrestrictedValue
      region
      city
      street
      house
      flat
      postalCode
      fiasId
      kladrId
      geoLat
      geoLon
    }
  }
`;
