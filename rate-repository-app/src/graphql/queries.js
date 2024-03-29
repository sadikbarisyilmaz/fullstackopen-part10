import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first){
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
        edges {
          cursor
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

export const GET_REPOSITORY = gql`
query($repositoryId: ID!, $after: String, $first: Int) {
  repository(id: $repositoryId) {
    id
    fullName
    url
    description
    forksCount
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    reviews(after: $after, first: $first) {
      totalCount
      edges {
        node {
          id
          text
          rating
          createdAt
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
        hasNextPage
      }
    }
  }
}
`;

export const ME = gql`
  query {
    me {
      createdAt
      id
      reviewCount
      username
      reviews {
        edges {
          node {
            repository {
              name
              ownerName
              url
            }
            createdAt
            id
            rating
            text
            repositoryId
            userId
          }
        }
      }
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

export const POST_REVIEW = gql`
mutation ($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId
  }
}
`;

export const DELETE_REVIEW = gql`
mutation ($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;

export const CREATE_USER = gql`
mutation ($user: CreateUserInput) {
  createUser(user: $user) {
    username
  }
}
`;