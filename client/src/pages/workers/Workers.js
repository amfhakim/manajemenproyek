import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Grid, Transition, Button } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import { FETCH_WORKERS_QUERY } from "../../queries/workers_query";
import MenuBar from "../../components/MenuBar";
import WorkerCard from "../../components/workers/workerCard";

function Workers() {
  const { user } = useContext(AuthContext);
  let workers = "";
  const { loading, data } = useQuery(FETCH_WORKERS_QUERY);

  if (data) {
    workers = data.getWorkers;
  }

  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
        <Grid stackable columns={3}>
          <Grid.Row className="page-title">
            <h1>Daftar Pekerja</h1>
          </Grid.Row>
          <Grid.Row centered>
            <Button color="teal" as={Link} to={"/workers/addworker"}>
              Tambah Pekerja
            </Button>
          </Grid.Row>
          <Grid.Row>
            {user && loading ? (
              <h1>Loading workers list...</h1>
            ) : (
              <Transition.Group>
                {workers &&
                  workers.map((worker) => (
                    <Grid.Column key={worker.id} style={{ marginBottom: 20 }}>
                      <WorkerCard worker={worker} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
}

export default Workers;
