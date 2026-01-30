/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  fragment UserProfileFields on UserProfileEntity {\n    lastName\n    firstName\n    middleName\n    dateOfBirth\n    citizenship\n    phone\n    passport {\n      series\n      number\n      issuedBy\n      issuedAt\n      departmentCode\n    }\n    passportRegistrationAddress\n    residentialAddress\n    education {\n      qualification\n      documentIssuedAt\n    }\n    workPlaceId\n    position\n    snils\n    avatar\n  }\n": typeof types.UserProfileFieldsFragmentDoc;
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n      role\n      firstName\n      lastName\n      phone\n      isBlocked\n      isEmailVerified\n    }\n  }\n": typeof types.LoginDocument;
  "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument;
  "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n": typeof types.RegisterDocument;
  "\n  mutation VerifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input)\n  }\n": typeof types.VerifyEmailDocument;
  "\n  mutation RequestEmailVerification(\n    $input: RequestEmailVerificationInput!\n  ) {\n    requestEmailVerification(input: $input)\n  }\n": typeof types.RequestEmailVerificationDocument;
  "\n  mutation UpdateMyProfile($input: UpdateMyProfileInput!) {\n    updateMyProfile(input: $input) {\n      ...UserProfileFields\n    }\n  }\n  \n": typeof types.UpdateMyProfileDocument;
  "\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n": typeof types.CreateCategoryDocument;
  "\n  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n": typeof types.UpdateCategoryDocument;
  "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteCategoryDocument;
  "\n  mutation CreateProgram($input: CreateProgramInput!) {\n    createProgram(input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateProgramDocument;
  "\n  mutation UpdateProgram($id: ID!, $input: UpdateProgramInput!) {\n    updateProgram(id: $id, input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateProgramDocument;
  "\n  mutation DeleteProgram($id: ID!) {\n    deleteProgram(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteProgramDocument;
  "\n  fragment UserFields on UserEntity {\n    id\n    email\n    role\n    isBlocked\n    isEmailVerified\n    firstName\n    lastName\n    phone\n    createdAt\n    updatedAt\n    profile {\n      ...UserProfileFields\n    }\n  }\n  \n": typeof types.UserFieldsFragmentDoc;
  "\n  mutation AdminCreateUser($input: AdminCreateUserInput!) {\n    adminCreateUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.AdminCreateUserDocument;
  "\n  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {\n    adminUpdateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.AdminUpdateUserDocument;
  "\n  mutation AdminDeleteUser($id: ID!) {\n    adminDeleteUser(id: $id)\n  }\n": typeof types.AdminDeleteUserDocument;
  "\n  mutation AdminSetUserBlocked($id: ID!, $blocked: Boolean!) {\n    adminSetUserBlocked(id: $id, blocked: $blocked) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.AdminSetUserBlockedDocument;
  "\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n  \n": typeof types.MeDocument;
  "\n  query GetCategories($filter: CategoryFilterInput) {\n    categories(filter: $filter) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n": typeof types.GetCategoriesDocument;
  "\n  query GetCategory($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n": typeof types.GetCategoryDocument;
  "\n  query GetPrograms($filter: ProgramFilterInput) {\n    programs(filter: $filter) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProgramsDocument;
  "\n  query GetTopPrograms($limit: Float) {\n    topPrograms(limit: $limit) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetTopProgramsDocument;
  "\n  query GetProgram($id: ID!) {\n    program(id: $id) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProgramDocument;
  "\n  query AdminUsers($filter: AdminUserFilterInput) {\n    adminUsers(filter: $filter) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.AdminUsersDocument;
  "\n  query AdminUser($id: ID!) {\n    adminUser(id: $id) {\n      ...UserFields\n    }\n  }\n  \n": typeof types.AdminUserDocument;
};
const documents: Documents = {
  "\n  fragment UserProfileFields on UserProfileEntity {\n    lastName\n    firstName\n    middleName\n    dateOfBirth\n    citizenship\n    phone\n    passport {\n      series\n      number\n      issuedBy\n      issuedAt\n      departmentCode\n    }\n    passportRegistrationAddress\n    residentialAddress\n    education {\n      qualification\n      documentIssuedAt\n    }\n    workPlaceId\n    position\n    snils\n    avatar\n  }\n":
    types.UserProfileFieldsFragmentDoc,
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n      role\n      firstName\n      lastName\n      phone\n      isBlocked\n      isEmailVerified\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
  "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n":
    types.RegisterDocument,
  "\n  mutation VerifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input)\n  }\n":
    types.VerifyEmailDocument,
  "\n  mutation RequestEmailVerification(\n    $input: RequestEmailVerificationInput!\n  ) {\n    requestEmailVerification(input: $input)\n  }\n":
    types.RequestEmailVerificationDocument,
  "\n  mutation UpdateMyProfile($input: UpdateMyProfileInput!) {\n    updateMyProfile(input: $input) {\n      ...UserProfileFields\n    }\n  }\n  \n":
    types.UpdateMyProfileDocument,
  "\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n":
    types.CreateCategoryDocument,
  "\n  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n":
    types.UpdateCategoryDocument,
  "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n":
    types.DeleteCategoryDocument,
  "\n  mutation CreateProgram($input: CreateProgramInput!) {\n    createProgram(input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.CreateProgramDocument,
  "\n  mutation UpdateProgram($id: ID!, $input: UpdateProgramInput!) {\n    updateProgram(id: $id, input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.UpdateProgramDocument,
  "\n  mutation DeleteProgram($id: ID!) {\n    deleteProgram(id: $id) {\n      id\n    }\n  }\n":
    types.DeleteProgramDocument,
  "\n  fragment UserFields on UserEntity {\n    id\n    email\n    role\n    isBlocked\n    isEmailVerified\n    firstName\n    lastName\n    phone\n    createdAt\n    updatedAt\n    profile {\n      ...UserProfileFields\n    }\n  }\n  \n":
    types.UserFieldsFragmentDoc,
  "\n  mutation AdminCreateUser($input: AdminCreateUserInput!) {\n    adminCreateUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n":
    types.AdminCreateUserDocument,
  "\n  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {\n    adminUpdateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n":
    types.AdminUpdateUserDocument,
  "\n  mutation AdminDeleteUser($id: ID!) {\n    adminDeleteUser(id: $id)\n  }\n":
    types.AdminDeleteUserDocument,
  "\n  mutation AdminSetUserBlocked($id: ID!, $blocked: Boolean!) {\n    adminSetUserBlocked(id: $id, blocked: $blocked) {\n      ...UserFields\n    }\n  }\n  \n":
    types.AdminSetUserBlockedDocument,
  "\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n  \n":
    types.MeDocument,
  "\n  query GetCategories($filter: CategoryFilterInput) {\n    categories(filter: $filter) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n":
    types.GetCategoriesDocument,
  "\n  query GetCategory($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n":
    types.GetCategoryDocument,
  "\n  query GetPrograms($filter: ProgramFilterInput) {\n    programs(filter: $filter) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetProgramsDocument,
  "\n  query GetTopPrograms($limit: Float) {\n    topPrograms(limit: $limit) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetTopProgramsDocument,
  "\n  query GetProgram($id: ID!) {\n    program(id: $id) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetProgramDocument,
  "\n  query AdminUsers($filter: AdminUserFilterInput) {\n    adminUsers(filter: $filter) {\n      ...UserFields\n    }\n  }\n  \n":
    types.AdminUsersDocument,
  "\n  query AdminUser($id: ID!) {\n    adminUser(id: $id) {\n      ...UserFields\n    }\n  }\n  \n":
    types.AdminUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment UserProfileFields on UserProfileEntity {\n    lastName\n    firstName\n    middleName\n    dateOfBirth\n    citizenship\n    phone\n    passport {\n      series\n      number\n      issuedBy\n      issuedAt\n      departmentCode\n    }\n    passportRegistrationAddress\n    residentialAddress\n    education {\n      qualification\n      documentIssuedAt\n    }\n    workPlaceId\n    position\n    snils\n    avatar\n  }\n"
): (typeof documents)["\n  fragment UserProfileFields on UserProfileEntity {\n    lastName\n    firstName\n    middleName\n    dateOfBirth\n    citizenship\n    phone\n    passport {\n      series\n      number\n      issuedBy\n      issuedAt\n      departmentCode\n    }\n    passportRegistrationAddress\n    residentialAddress\n    education {\n      qualification\n      documentIssuedAt\n    }\n    workPlaceId\n    position\n    snils\n    avatar\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n      role\n      firstName\n      lastName\n      phone\n      isBlocked\n      isEmailVerified\n    }\n  }\n"
): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      id\n      email\n      role\n      firstName\n      lastName\n      phone\n      isBlocked\n      isEmailVerified\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Logout {\n    logout\n  }\n"
): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n"
): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation VerifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input)\n  }\n"
): (typeof documents)["\n  mutation VerifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation RequestEmailVerification(\n    $input: RequestEmailVerificationInput!\n  ) {\n    requestEmailVerification(input: $input)\n  }\n"
): (typeof documents)["\n  mutation RequestEmailVerification(\n    $input: RequestEmailVerificationInput!\n  ) {\n    requestEmailVerification(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateMyProfile($input: UpdateMyProfileInput!) {\n    updateMyProfile(input: $input) {\n      ...UserProfileFields\n    }\n  }\n  \n"
): (typeof documents)["\n  mutation UpdateMyProfile($input: UpdateMyProfileInput!) {\n    updateMyProfile(input: $input) {\n      ...UserProfileFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {\n    updateCategory(id: $id, input: $input) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteCategory($id: ID!) {\n    deleteCategory(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateProgram($input: CreateProgramInput!) {\n    createProgram(input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateProgram($input: CreateProgramInput!) {\n    createProgram(input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateProgram($id: ID!, $input: UpdateProgramInput!) {\n    updateProgram(id: $id, input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateProgram($id: ID!, $input: UpdateProgramInput!) {\n    updateProgram(id: $id, input: $input) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DeleteProgram($id: ID!) {\n    deleteProgram(id: $id) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteProgram($id: ID!) {\n    deleteProgram(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment UserFields on UserEntity {\n    id\n    email\n    role\n    isBlocked\n    isEmailVerified\n    firstName\n    lastName\n    phone\n    createdAt\n    updatedAt\n    profile {\n      ...UserProfileFields\n    }\n  }\n  \n"
): (typeof documents)["\n  fragment UserFields on UserEntity {\n    id\n    email\n    role\n    isBlocked\n    isEmailVerified\n    firstName\n    lastName\n    phone\n    createdAt\n    updatedAt\n    profile {\n      ...UserProfileFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AdminCreateUser($input: AdminCreateUserInput!) {\n    adminCreateUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n"
): (typeof documents)["\n  mutation AdminCreateUser($input: AdminCreateUserInput!) {\n    adminCreateUser(input: $input) {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {\n    adminUpdateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n"
): (typeof documents)["\n  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {\n    adminUpdateUser(id: $id, input: $input) {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AdminDeleteUser($id: ID!) {\n    adminDeleteUser(id: $id)\n  }\n"
): (typeof documents)["\n  mutation AdminDeleteUser($id: ID!) {\n    adminDeleteUser(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AdminSetUserBlocked($id: ID!, $blocked: Boolean!) {\n    adminSetUserBlocked(id: $id, blocked: $blocked) {\n      ...UserFields\n    }\n  }\n  \n"
): (typeof documents)["\n  mutation AdminSetUserBlocked($id: ID!, $blocked: Boolean!) {\n    adminSetUserBlocked(id: $id, blocked: $blocked) {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n  \n"
): (typeof documents)["\n  query Me {\n    me {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetCategories($filter: CategoryFilterInput) {\n    categories(filter: $filter) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"
): (typeof documents)["\n  query GetCategories($filter: CategoryFilterInput) {\n    categories(filter: $filter) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetCategory($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"
): (typeof documents)["\n  query GetCategory($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      slug\n      description\n      image\n      type\n      parent\n      createdAt\n      updatedAt\n      programsCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetPrograms($filter: ProgramFilterInput) {\n    programs(filter: $filter) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  query GetPrograms($filter: ProgramFilterInput) {\n    programs(filter: $filter) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetTopPrograms($limit: Float) {\n    topPrograms(limit: $limit) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  query GetTopPrograms($limit: Float) {\n    topPrograms(limit: $limit) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetProgram($id: ID!) {\n    program(id: $id) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"
): (typeof documents)["\n  query GetProgram($id: ID!) {\n    program(id: $id) {\n      id\n      title\n      slug\n      description\n      image\n      category\n      baseHours\n      studentCategory\n      awardedQualification\n      awardedRankFrom\n      awardedRankTo\n      pricing {\n        hours\n        price\n      }\n      subPrograms {\n        title\n        description\n      }\n      views\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query AdminUsers($filter: AdminUserFilterInput) {\n    adminUsers(filter: $filter) {\n      ...UserFields\n    }\n  }\n  \n"
): (typeof documents)["\n  query AdminUsers($filter: AdminUserFilterInput) {\n    adminUsers(filter: $filter) {\n      ...UserFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query AdminUser($id: ID!) {\n    adminUser(id: $id) {\n      ...UserFields\n    }\n  }\n  \n"
): (typeof documents)["\n  query AdminUser($id: ID!) {\n    adminUser(id: $id) {\n      ...UserFields\n    }\n  }\n  \n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<
  TDocumentNode extends DocumentNode<any, any>,
> =
  TDocumentNode extends DocumentNode<infer TType, any>
    ? TType
    : never;
