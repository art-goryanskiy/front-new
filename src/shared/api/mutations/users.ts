import { gql } from "@apollo/client";

const ADMIN_USER_PROFILE_FIELDS_MUTATIONS = gql`
  fragment AdminUserProfileFieldsMutations on UserProfileEntity {
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

const ADMIN_USER_FIELDS_MUTATIONS = gql`
  fragment AdminUserFieldsMutations on UserEntity {
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
      ...AdminUserProfileFieldsMutations
    }
  }
  ${ADMIN_USER_PROFILE_FIELDS_MUTATIONS}
`;

export const CREATE_USER = gql`
  mutation AdminCreateUser($input: AdminCreateUserInput!) {
    adminCreateUser(input: $input) {
      ...AdminUserFieldsMutations
    }
  }
  ${ADMIN_USER_FIELDS_MUTATIONS}
`;

export const UPDATE_USER = gql`
  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {
    adminUpdateUser(id: $id, input: $input) {
      ...AdminUserFieldsMutations
    }
  }
  ${ADMIN_USER_FIELDS_MUTATIONS}
`;

export const DELETE_USER = gql`
  mutation AdminDeleteUser($id: ID!) {
    adminDeleteUser(id: $id)
  }
`;

export const SET_USER_BLOCKED = gql`
  mutation AdminSetUserBlocked($id: ID!, $blocked: Boolean!) {
    adminSetUserBlocked(id: $id, blocked: $blocked) {
      ...AdminUserFieldsMutations
    }
  }
  ${ADMIN_USER_FIELDS_MUTATIONS}
`;
