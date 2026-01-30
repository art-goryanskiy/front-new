import { gql } from "@apollo/client";

export const SET_MY_WORK_PLACE_BY_INN = gql`
  mutation SetMyWorkPlaceByInn($input: SetMyWorkPlaceByInnInput!) {
    setMyWorkPlaceByInn(input: $input) {
      workPlaceId
      position
      employments {
        id
        organizationId
        position
        isPrimary
      }
    }
  }
`;

export const SET_MY_WORK_PLACE_MANUAL = gql`
  mutation SetMyWorkPlaceManual($input: SetMyWorkPlaceManualInput!) {
    setMyWorkPlaceManual(input: $input) {
      workPlaceId
    }
  }
`;
