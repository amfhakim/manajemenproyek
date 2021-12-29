import gql from "graphql-tag";

export const FETCH_WORKERS_QUERY = gql`
  {
    getWorkers {
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
