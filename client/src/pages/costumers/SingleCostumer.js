import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Image, Container } from "semantic-ui-react";
import moment from "moment";
import MenuBar from "../../components/MenuBar";
import DeleteCostumerButton from "../../components/costumers/DeleteCostumer";

function SingleCostumer(props) {
  const costumerId = props.match.params.costumerId;
  let getCostumer = "";

  const { data } = useQuery(FETCH_COSTUMER_QUERY, {
    variables: { costumerId },
  });
  if (data) {
    getCostumer = data.getCostumer;
  }

  function deleteCostumerCallback() {
    props.history.push("/costumers");
  }

  let costumerMarkup;
  if (!getCostumer) {
    costumerMarkup = <p>loading costumer...</p>;
  } else {
    const { nama, email, notlp, noktp, alamat, createdAt } = getCostumer;

    costumerMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Row className="page-title">
              <h1>Profil Costumer</h1>
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
                    <Card.Description>No. KTP: {noktp}</Card.Description>
                    <Card.Description>Alamat: {alamat}</Card.Description>
                  </Card.Content>
                  <hr />
                  <CardContent extra>
                    <DeleteCostumerButton
                      costumerId={costumerId}
                      callback={deleteCostumerCallback}
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
  return costumerMarkup;
}

const FETCH_COSTUMER_QUERY = gql`
  query ($costumerId: ID!) {
    getCostumer(costumerId: $costumerId) {
      nama
      email
      notlp
      noktp
      alamat
      createdAt
    }
  }
`;

export default SingleCostumer;
