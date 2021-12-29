import React from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Image, Container } from "semantic-ui-react";
import moment from "moment";
import DeleteUserButton from "../../components/users/DeleteUser";
import MenuBar from "../../components/MenuBar";
import { FETCH_USER_QUERY } from "../../queries/users_query";

function SingleUser(props) {
  const userId = props.match.params.userId;
  let getUser = "";

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId },
  });
  if (data) {
    getUser = data.getUser;
  }

  function deleteUserCallback() {
    props.history.push("/users");
  }

  let userMarkup;
  if (!getUser) {
    userMarkup = <p>loading user...</p>;
  } else {
    const { username, email, name, createdAt } = getUser;

    userMarkup = (
      <Container>
        <MenuBar />
        <Container style={{ marginTop: "7em" }}>
          <Grid>
            <Grid.Row className="page-title">
              <h1>Profil User</h1>
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
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>
                      registered since : {moment(createdAt).fromNow()}
                    </Card.Meta>
                    <Card.Description>Email: {email}</Card.Description>
                    <Card.Description>Nama: {name}</Card.Description>
                  </Card.Content>
                  <hr />
                  <CardContent extra>
                    <DeleteUserButton
                      userId={userId}
                      callback={deleteUserCallback}
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
  return userMarkup;
}

export default SingleUser;
