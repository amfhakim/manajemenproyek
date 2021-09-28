import gql from "graphql-tag";

export const FETCH_PROJECTS_QUERY = gql`
  {
    getProjects {
      id
      nama
      namaCostumer
      alamat
      budget
      startAt
      endAt
      namaWorkers
      pekerjaans {
        id
        nama
        pj
        startAt
        endAt
        materials {
          nama
          jenis
          satuan
          harga
          jumlah
          totalHarga
          createdAt
          username
        }
        tools {
          id
          nama
          hargaSewa
          jumlah
          totalHarga
          createdAt
          username
        }
      }
      createdAt
      username
    }
  }
`;
