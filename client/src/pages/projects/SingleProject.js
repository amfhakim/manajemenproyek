import React, { useContext, useRef, useState } from "react";
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
  TableHeaderCell,
  Tab,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import DeleteButton from "../../components/DeleteButton";
import MenuBar from "../../components/MenuBar";
import { FETCH_PROJECT_QUERY } from "../../queries/projects_query";

function SingleProject(props) {
  const projectId = props.match.params.projectId;
  const { user } = useContext(AuthContext);
  let getProject = "";

  const { data } = useQuery(FETCH_PROJECT_QUERY, {
    variables: { projectId },
  });
  if (data) {
    getProject = data.getProject;
  }

  function deleteProjectCallback() {
    props.history.push("/projects");
  }

  const current = new Date();
  const currentDate = `${current.getDate()} / ${
    current.getMonth() + 1
  } / ${current.getFullYear()}`;

  let workersTable;
  if (!getProject.workers || getProject.workers.length == 0) {
    workersTable = <Button>Tambah Pekerja</Button>;
  } else {
    workersTable = (
      <Table>
        <Table.Header>
          <Table.HeaderCell>Nama</Table.HeaderCell>
          <Table.HeaderCell>
            Kehadiran hari ini:&emsp;&emsp;{currentDate}
          </Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {getProject.workers.map((w) => (
            <Table.Row>
              <Table.Cell>{w.nama}</Table.Cell>
              <Table.Cell>tidak masuk</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }

  let tasksCards;
  if (!getProject.tasks || getProject.tasks.length == 0) {
    tasksCards = (
      <Card fluid>
        <Card.Content>
          <Card.Header textAlign="center">Daftar Pekerjaan</Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          <Button>Tambah Pekerjaan</Button>
        </Card.Content>
      </Card>
    );
  } else {
    tasksCards = (
      <Card fluid>
        <Card.Content>
          <Card.Header textAlign="center">Daftar Pekerjaan</Card.Header>
        </Card.Content>
        <Card.Content>
          {getProject.tasks.map((t) => (
            <Card fluid color="grey">
              <Card.Header style={{ padding: "1em" }}>
                <h3 style={{ marginLeft: "1em" }}>{t.nama}</h3>
              </Card.Header>
              <Card.Content>
                <Grid>
                  <Grid.Row>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Tanggal Mulai: {t.startAt}</Table.Cell>
                          <Table.Cell>Tanggal Selesai: {t.endAt}</Table.Cell>
                          <Table.Cell>Status: {t.status}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Grid.Row>

                  <Grid.Row columns="2">
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header>Tools</Card.Header>
                        <Card.Content>
                          <Table>
                            <Table.Header>
                              <Table.HeaderCell>Nama</Table.HeaderCell>
                              <Table.HeaderCell>Jumlah</Table.HeaderCell>
                              <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Header>
                            <Table.Body>
                              {t.tools.map((tool) => {
                                <Table.Row>
                                  <Table.Cell>{tool.nama}</Table.Cell>
                                  <Table.Cell>{tool.jumlah}</Table.Cell>
                                  <Table.Cell>{tool.status}</Table.Cell>
                                </Table.Row>;
                              })}
                            </Table.Body>
                          </Table>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header>Materials</Card.Header>
                        <Card.Content>
                          <Table>
                            <Table.Header>
                              <Table.HeaderCell>Nama</Table.HeaderCell>
                              <Table.HeaderCell>Jumlah</Table.HeaderCell>
                              <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Header>
                          </Table>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
      </Card>
    );
  }

  let projectMarkup;
  if (!getProject) {
    projectMarkup = <p>loading project ...</p>;
  } else {
    const {
      id,
      nama,
      namaCustomer,
      alamat,
      budget,
      startAt,
      endAt,
      progres,
      tasks,
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
                  <CardContent textAlign="center">
                    <Table basic="very" celled collapsing>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <b>Nama Customer</b>
                          </Table.Cell>
                          <Table.Cell>{namaCustomer}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Alamat Proyek</b>
                          </Table.Cell>
                          <Table.Cell>{alamat}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Tanggal Mulai</b>
                          </Table.Cell>
                          <Table.Cell>{startAt}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <b>Tanggal Selesai</b>
                          </Table.Cell>
                          <Table.Cell>{endAt}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                    <a href="">edit informasi umum</a>
                  </CardContent>
                </Card>
              </Grid.Column>

              <Grid.Column>
                <Card fluid>
                  <Card.Content textAlign="center">
                    <Card.Header>Daftar Pekerja</Card.Header>
                  </Card.Content>
                  <Card.Content textAlign="center">
                    {workersTable}
                    <a href="">edit daftar pekerja</a>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Card.Header>Total Progress</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Progress percent={progres * 100} indicating>
                    <h5>{progres * 100}%</h5>
                  </Progress>
                </Card.Content>
              </Card>
            </Grid.Row>

            <Grid.Row>{tasksCards}</Grid.Row>

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

export default SingleProject;
