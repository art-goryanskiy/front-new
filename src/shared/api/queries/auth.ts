import { gql } from "@apollo/client";

const ME_USER_PROFILE_FIELDS = gql`
  fragment MeUserProfileFields on UserProfileEntity {
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
    workPlaces {
      organization {
        id
        type
        displayName
        inn
        kpp
        ogrn
        legalAddress
        bankAccount
        bankName
        bik
        correspondentAccount
      }
      position
      isPrimary
    }
    snils
    avatar
  }
`;

const ME_USER_FIELDS = gql`
  fragment MeUserFields on UserEntity {
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
      ...MeUserProfileFields
    }
  }
  ${ME_USER_PROFILE_FIELDS}
`;

export const ME = gql`
  query Me {
    me {
      ...MeUserFields
    }
  }
  ${ME_USER_FIELDS}
`;
