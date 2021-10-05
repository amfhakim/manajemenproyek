import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Image,
  Container,
  Progress,
  Table,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import DeleteButton from "../../components/DeleteButton";
import MenuBar from "../../components/MenuBar";

function SingleProject(props) {
  const projectId = props.match.params.projectId;
  const { user } = useContext(AuthContext);
  let getProject = "";
  let getWorkersInProject = "";

  const { data } = useQuery(FETCH_PROJECT_QUERY, {
    variables: { projectId },
  });
  if (data) {
    getProject = data.getProject;
    getWorkersInProject = data.getWorkersInProject;
  }

  function deleteProjectCallback() {
    props.history.push("/projects");
  }

  let workersTable;
  if (!getWorkersInProject) {
    workersTable = <Button>Tambah Pekerja</Button>;
  } else {
    workersTable = (
      <Table>
        <Table.Header>
          <Table.HeaderCell>Nama</Table.HeaderCell>
          <Table.HeaderCell>Jabatan</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {getWorkersInProject.map((w) => (
            <Table.Row>
              <Table.Cell>{w.nama}</Table.Cell>
              <Table.Cell>{w.jabatan}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  let projectMarkup;
  if (!getProject) {
    projectMarkup = <p>loading project ...</p>;
  } else {
    const {
      id,
      nama,
      namaCostumer,
      alamat,
      budget,
      startAt,
      endAt,
      namaWorkers,
      pekerjaans,
      username,
      createdAt,
    } = getProject;

    projectMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "5em" }}>
          <Grid>
            <Grid.Row className="page-title" style={{ marginTop: "1em" }}>
              <h1>{nama}</h1>
            </Grid.Row>

            <Grid.Row columns="2">
              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Informasi Umum</Card.Header>
                  </Card.Content>
                  <CardContent>
                    <Card.Description>
                      <p>
                        <b>nama costumer</b>&emsp;:&ensp;{namaCostumer}
                        <br />
                        <b>alamat</b>&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;:&ensp;
                        {alamat}
                        <br />
                        <b>budget</b>&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;:&ensp;
                        {budget}
                        <br />
                      </p>
                    </Card.Description>
                  </CardContent>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Progress</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <h4>Total Progress</h4>
                    <Progress percent="75" indicating>
                      75%
                    </Progress>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="2">
              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Daftar Pekerja</Card.Header>
                  </Card.Content>
                  <Card.Content>{workersTable}</Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Keuangan</Card.Header>
                  </Card.Content>
                  <Card.Content></Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Card fluid>
                <Card.Content>
                  <Card.Header textAlign="center">Daftar Pekerjaan</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Table celled selectable>
                    <Table.Header>
                      <Table.HeaderCell>Nama</Table.HeaderCell>
                      <Table.HeaderCell>Penanggung Jawab</Table.HeaderCell>
                      <Table.HeaderCell>Tanggal Mulai</Table.HeaderCell>
                      <Table.HeaderCell>Tanggal Selesai</Table.HeaderCell>
                      <Table.HeaderCell>Progress</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                      {pekerjaans &&
                        pekerjaans.map((p) => (
                          <Table.Row>
                            <Table.Cell></Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </Card.Content>
              </Card>
            </Grid.Row>

            <Grid.Row>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Card.Header>Galeri</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Image
                    floated="center"
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                  />
                  <Image
                    floated="center"
                    size="medium"
                    src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                  />
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    );
  }
  return projectMarkup;
}

const FETCH_PROJECT_QUERY = gql`
  query ($projectId: ID!) {
    getProject(projectId: $projectId) {
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

    getWorkersInProject(projectId: $projectId) {
      id
      nama
      jabatan
    }
  }
`;

export default SingleProject;
