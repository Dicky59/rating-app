import { gql } from 'apollo-boost';
import { REPOSITORY_BASE_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy $orderDirection: OrderDirection $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ...RepositoryBaseFields
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
    }
  }
}

  ${REPOSITORY_BASE_FIELDS}
`;

export const GET_REPOSITORY_BY_ID = gql`
  query GetRepositoryById($id: ID!, $first: Int, $after: String, ) {
    repository(id: $id) {
      ...RepositoryBaseFields
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_BASE_FIELDS}
`; 

export const AUTHORIZED_USER = gql`
query authorizedUser ($includeReviews: Boolean = false, $first: Int, $after: String)
{
  authorizedUser {
    id
    username
    reviews( first: $first, after: $after)  @include(if: $includeReviews){
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;