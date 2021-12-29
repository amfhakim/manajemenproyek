import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Image, Container } from "semantic-ui-react";
import moment from "moment";
import DeleteWorkerButton from "../../components/workers/DeleteWorkers";
import MenuBar from "../../components/MenuBar";

function SingleWorker(props) {
  const workerId = props.match.params.workerId;
  let getWorker = "";

  const { data } = useQuery(FETCH_WORKER_QUERY, {
    variables: { workerId },
  });
  if (data) {
    getWorker = data.getWorker;
  }

  function deleteWorkerCallback() {
    props.history.push("/workers");
  }

  let Markup;
  if (!getWorker) {
    Markup = <p>loading worker...</p>;
  } else {
    const { email, nama, notlp, alamat, createdAt } = getWorker;

    Markup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Row className="page-title">
              <h1>Profil Pekerja</h1>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}>
                <Image
                  floated="right"
                  size="small"
                  src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{nama}</Card.Header>
                    <Card.Meta>
                      registered since : {moment(createdAt).fromNow()}
                    </Card.Meta>
                    <Card.Description>Email: {email}</Card.Description>
                    <Card.Description>No. Telepon: {notlp}</Card.Description>
                    <Card.Description>Alamat: {alamat}</Card.Description>
                  </Card.Content>
                  <hr />
                  <CardContent extra>
                    <DeleteWorkerButton
                      workerId={workerId}
                      callback={deleteWorkerCallback}
                    />
                  </CardContent>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
    );
  }
  return Markup;
}

const FETCH_WORKER_QUERY = gql`
  query ($workerId: ID!) {
    getWorker(workerId: $workerId) {
      id
      nama
      alamat
      notlp
      email
      createdAt
    }
  }
`;

export default SingleWorker;
