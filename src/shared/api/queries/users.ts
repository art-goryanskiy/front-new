import { gql } from "@apollo/client";

const ADMIN_USER_PROFILE_FIELDS_QUERIES = gql`
  fragment AdminUserProfileFieldsQueries on UserProfileEntity {
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
      }
      position
      isPrimary
    }
    snils
    avatar
  }
`;

const ADMIN_USER_FIELDS_QUERIES = gql`
  fragment AdminUserFieldsQueries on UserEntity {
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
      ...AdminUserProfileFieldsQueries
    }
  }
  ${ADMIN_USER_PROFILE_FIELDS_QUERIES}
`;

export const GET_USERS = gql`
  query AdminUsers($filter: AdminUserFilterInput) {
    adminUsers(filter: $filter) {
      ...AdminUserFieldsQueries
    }
  }
  ${ADMIN_USER_FIELDS_QUERIES}
`;

export const GET_USER = gql`
  query AdminUser($id: ID!) {
    adminUser(id: $id) {
      ...AdminUserFieldsQueries
    }
  }
  ${ADMIN_USER_FIELDS_QUERIES}
`;
