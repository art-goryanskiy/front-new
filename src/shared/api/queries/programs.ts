import { gql } from "@apollo/client";

export const GET_PROGRAMS = gql`
  query GetPrograms($filter: ProgramFilterInput) {
    programs(filter: $filter) {
      id
      title
      shortTitle
      slug
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      educationDocumentId
      educationDocument {
        id
        name
        image
      }
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      viewsRating
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROGRAMS_PAGE = gql`
  query ProgramsPage($filter: ProgramFilterInput) {
    programsPage(filter: $filter) {
      total
      items {
        id
        title
        shortTitle
        slug
        description
        image
        category
        baseHours
        studentCategory
        awardedQualification
        awardedRankFrom
        awardedRankTo
        educationDocumentId
        educationDocument {
          id
          name
          image
        }
        pricing {
          hours
          price
        }
        subPrograms {
          title
          description
        }
        views
        viewsRating
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_TOP_PROGRAMS = gql`
  query GetTopPrograms($limit: Float) {
    topPrograms(limit: $limit) {
      id
      title
      shortTitle
      slug
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      educationDocumentId
      educationDocument {
        id
        name
        image
      }
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      viewsRating
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
      shortTitle
      slug
      description
      image
      category
      baseHours
      studentCategory
      awardedQualification
      awardedRankFrom
      awardedRankTo
      educationDocumentId
      educationDocument {
        id
        name
        image
      }
      pricing {
        hours
        price
      }
      subPrograms {
        title
        description
      }
      views
      viewsRating
      createdAt
      updatedAt
    }
  }
`;
