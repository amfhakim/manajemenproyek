import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Image, Container } from "semantic-ui-react";
import moment from "moment";
import MenuBar from "../../components/MenuBar";
import DeleteCustomerButton from "../../components/customers/DeleteCustomer";
import { FETCH_CUSTOMER_QUERY } from "../../queries/customers_query";

function SingleCustomer(props) {
  const customerId = props.match.params.customerId;
  let getCustomer = "";

  const { data } = useQuery(FETCH_CUSTOMER_QUERY, {
    variables: { customerId },
  });
  if (data) {
    getCustomer = data.getCustomer;
  }

  function deleteCustomerCallback() {
    props.history.push("/customers");
  }

  let customerMarkup;
  if (!getCustomer) {
    customerMarkup = <p>loading customer...</p>;
  } else {
    const { nama, email, notlp, noktp, alamat, createdAt } = getCustomer;

    customerMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Row className="page-title">
              <h1>Profil Customer</h1>
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
                    <DeleteCustomerButton
                      customerId={customerId}
                      callback={deleteCustomerCallback}
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
  return customerMarkup;
}

export default SingleCustomer;
