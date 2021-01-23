import { gql } from 'apollo-boost';
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS, REVIEWED_REPOSITORY } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryBaseFields
        }
      }
    }
  }

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query GetRepositoryById($id: ID!) {
    repository(id: $id) {
      ...ReviewedRepository
    }
  }
  ${REVIEWED_REPOSITORY}
`; 

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      ...UserBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;