import { gql } from 'apollo-boost';
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy $orderDirection: OrderDirection $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ...RepositoryBaseFields
        }
        cursor
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
  query GetRepositoryById($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(after: $after, first: $first) {
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
          cursor
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

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      ...UserBaseFields
    }
  }

  ${USER_BASE_FIELDS}
`;