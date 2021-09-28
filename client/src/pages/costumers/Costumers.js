import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Grid, Transition, Button } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import CostumerCard from "../../components/costumers/CostumerCard";
import { FETCH_COSTUMERS_QUERY } from "../../queries/costumers_query";
import MenuBar from "../../components/MenuBar";

function Costumers() {
  const { user } = useContext(AuthContext);
  let costumers = "";
  const { loading, data } = useQuery(FETCH_COSTUMERS_QUERY);

  if (data) {
    costumers = data.getCostumers;
  }
  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
      <Grid stackable columns={3}>
        <Grid.Row className="page-title">
          <h1>Daftar Costumer</h1>
        </Grid.Row>
        <Grid.Row centered>
          <Button color="teal" as={Link} to={"/costumers/addcostumer"}>
            Tambah Costumer
          </Button>
        </Grid.Row>
        <Grid.Row>
          {user && loading ? (
            <h1>Loading costumers...</h1>
          ) : (
            <Transition.Group>
              {costumers &&
                costumers
                  .map((costumer) => (
                    <Grid.Column key={costumer.id} style={{ marginBottom: 20 }}>
                      <CostumerCard costumer={costumer} />
                    </Grid.Column>
                  ))
                  .sort(costumers.nama)}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </Container>
    </Container>
  );
}

export default Costumers;
