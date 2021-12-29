import gql from "graphql-tag";

export const FETCH_PROJECTS_QUERY = gql`
  {
    getProjects {
      id
      nama
      namaCustomer
      customer {
        id
        nama
      }
      alamat
      startAt
      endAt
      namaWorkers
      workers {
        id
        nama
        notlp
      }
      createdAt
      username
    }
  }
`;

export const FETCH_PROJECT_QUERY = gql`
  query ($projectId: ID!) {
    getProject(projectId: $projectId) {
      id
      nama
      startAt
      endAt
      alamat
      progres
      namaCustomer
      customer {
        id
        nama
        notlp
        email
      }
      workers {
        id
        nama
        presences {
          tanggal
          kehadiran
        }
      }
      tasks {
        id
        nama
        startAt
        endAt
        status
        materials {
          id
          nama
          jumlah
          status
        }
        tools {
          id
          nama
          jumlah
          status
        }
      }
      createdAt
      username
    }
  }
`;
