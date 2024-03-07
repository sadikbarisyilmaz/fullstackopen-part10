import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
          node {
            description
            forksCount
            fullName
            id
            name
            ownerAvatarUrl
            ownerName
            ratingAverage
            reviewCount
            url
            language
            stargazersCount
          }
        }
      }
  }
`;

export const ME = gql`
  query {
    me {
     id
     username
    }
  }
`;

export const SIGN_IN = gql`
mutation SignIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
}
`;