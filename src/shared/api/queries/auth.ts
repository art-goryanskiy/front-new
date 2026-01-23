import { gql } from "@apollo/client";

const USER_PROFILE_FIELDS = gql`
  fragment UserProfileFields on UserProfileEntity {
    lastName
    firstName
    middleName
    dateOfBirth
    citizenship
    phone
    passport {
      series
      number
      issuedBy
      issuedAt
      departmentCode
    }
    passportRegistrationAddress
    residentialAddress
    education {
      qualification
      documentIssuedAt
    }
    workPlaceId
    position
    snils
    avatar
  }
`;

const USER_FIELDS = gql`
  fragment UserFields on UserEntity {
    id
    email
    role
    isBlocked
    isEmailVerified
    firstName
    lastName
    phone
    createdAt
    updatedAt
    profile {
      ...UserProfileFields
    }
  }
  ${USER_PROFILE_FIELDS}
`;

export const ME = gql`
  query Me {
    me {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
