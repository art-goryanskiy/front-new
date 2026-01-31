import { gql } from "@apollo/client";

const MY_USER_PROFILE_FIELDS = gql`
  fragment MyUserProfileFields on UserProfileEntity {
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

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      id
      email
      role
      firstName
      lastName
      phone
      isBlocked
      isEmailVerified
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input)
  }
`;

export const REQUEST_EMAIL_VERIFICATION = gql`
  mutation RequestEmailVerification(
    $input: RequestEmailVerificationInput!
  ) {
    requestEmailVerification(input: $input)
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile($input: UpdateMyProfileInput!) {
    updateMyProfile(input: $input) {
      ...MyUserProfileFields
    }
  }
  ${MY_USER_PROFILE_FIELDS}
`;
