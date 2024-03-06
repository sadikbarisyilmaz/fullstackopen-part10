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