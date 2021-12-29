import gql from "graphql-tag";

export const FETCH_CUSTOMERS_QUERY = gql`
  {
    getCustomers {
      id
      nama
      alamat
      notlp
      email
      createdAt
      username
    }
  }
`;

export const FETCH_CUSTOMER_QUERY = gql`
  query ($customerId: ID!) {
    getCustomer(customerId: $customerId) {
      nama
      email
      notlp
      alamat
      createdAt
      username
    }
  }
`;

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation createCustomer(
    $nama: String!
    $alamat: String!
    $notlp: String!
    $email: String!
  ) {
    createCustomer(
      input: { nama: $nama, alamat: $alamat, notlp: $notlp, email: $email }
    ) {
      id
      nama
      alamat
      notlp
      email
      createdAt
      username
    }
  }
`;

export const DELETE_CUSTOMER_MUTATION = gql`
  mutation deleteCustomer($customerId: ID!) {
    deleteCustomer(customerId: $customerId)
  }
`;
