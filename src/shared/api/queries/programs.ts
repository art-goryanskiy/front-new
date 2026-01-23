import { gql } from "@apollo/client";

export const GET_PROGRAMS = gql`
  query GetPrograms($filter: ProgramFilterInput) {
    programs(filter: $filter) {
      id
      title
      slug
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      createdAt
      updatedAt
    }
  }
`;

export const GET_TOP_PROGRAMS = gql`
  query GetTopPrograms($limit: Float) {
    topPrograms(limit: $limit) {
      id
      title
      slug
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROGRAM = gql`
  query GetProgram($id: ID!) {
    program(id: $id) {
      id
      title
      slug
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      createdAt
      updatedAt
    }
  }
`;
