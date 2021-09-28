import gql from "graphql-tag";

export const FETCH_COSTUMERS_QUERY = gql`
  {
    getCostumers {
      id
      nama
      alamat
      noktp
      notlp
      email
      createdAt
    }
  }
`;
