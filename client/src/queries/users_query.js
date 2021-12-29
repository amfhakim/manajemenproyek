import gql from "graphql-tag";

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      username
      email
      createdAt
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
      name
      createdAt
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $name: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        name: $name
      }
    ) {
      id
      email
      username
      name
      createdAt
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;
