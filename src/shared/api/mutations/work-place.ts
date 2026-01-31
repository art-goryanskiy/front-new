import { gql } from "@apollo/client";

const WORK_PLACES_FIELDS = gql`
  fragment WorkPlacesFields on UserProfileEntity {
    workPlaces {
      organization {
        id
        type
        displayName
        inn
        kpp
        ogrn
        legalAddress
      }
      position
      isPrimary
    }
  }
`;

export const SET_MY_WORK_PLACE_BY_INN = gql`
  mutation SetMyWorkPlaceByInn($input: SetMyWorkPlaceByInnInput!) {
    setMyWorkPlaceByInn(input: $input) {
      ...WorkPlacesFields
    }
  }
  ${WORK_PLACES_FIELDS}
`;

export const SET_MY_WORK_PLACE_MANUAL = gql`
  mutation SetMyWorkPlaceManual($input: SetMyWorkPlaceManualInput!) {
    setMyWorkPlaceManual(input: $input) {
      ...WorkPlacesFields
    }
  }
  ${WORK_PLACES_FIELDS}
`;
