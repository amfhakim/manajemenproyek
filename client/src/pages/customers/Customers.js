import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Grid, Transition, Button } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import CustomerCard from "../../components/customers/CustomerCard";
import { FETCH_CUSTOMERS_QUERY } from "../../queries/customers_query";
import MenuBar from "../../components/MenuBar";

function Customers() {
  const { user } = useContext(AuthContext);
  let customers = "";
  const { loading, data } = useQuery(FETCH_CUSTOMERS_QUERY);

  if (data) {
    customers = data.getCustomers;
  }
  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
        <Grid stackable columns={3}>
          <Grid.Row className="page-title">
            <h1>Daftar Customer</h1>
          </Grid.Row>
          <Grid.Row centered>
            <Button color="teal" as={Link} to={"/customers/addcustomer"}>
              Tambah Customer
            </Button>
          </Grid.Row>
          <Grid.Row>
            {user && loading ? (
              <h1>Loading customers...</h1>
            ) : (
              <Transition.Group>
                {customers &&
                  customers
                    .map((customer) => (
                      <Grid.Column
                        key={customer.id}
                        style={{ marginBottom: 20 }}
                      >
                        <CustomerCard customer={customer} />
                      </Grid.Column>
                    ))
                    .sort(customers.nama)}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
}

export default Customers;
