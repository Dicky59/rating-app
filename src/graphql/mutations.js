import { gql } from 'apollo-boost';

import { USER_BASE_FIELDS } from './fragments';

export const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
      user {
        ...UserBaseFields
      }
    }
  }

  ${USER_BASE_FIELDS}
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser ($username: String!, $password: String!){
    createUser(user: { username: $username, password: $password}){
      username
      createdAt
      reviewCount
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview ($id: ID!){
    deleteReview(id: $id)
  }
`;