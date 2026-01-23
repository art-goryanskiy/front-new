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

export const CREATE_USER = gql`
  mutation AdminCreateUser($input: AdminCreateUserInput!) {
    adminCreateUser(input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const UPDATE_USER = gql`
  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {
    adminUpdateUser(id: $id, input: $input) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const DELETE_USER = gql`
  mutation AdminDeleteUser($id: ID!) {
    adminDeleteUser(id: $id)
  }
`;

export const SET_USER_BLOCKED = gql`
  mutation AdminSetUserBlocked($id: ID!, $blocked: Boolean!) {
    adminSetUserBlocked(id: $id, blocked: $blocked) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
