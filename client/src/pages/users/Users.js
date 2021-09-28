import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Grid, Transition, Button } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import { FETCH_USERS_QUERY } from "../../queries/users_query";
import UserCard from "../../components/users/UsersCard";
import MenuBar from "../../components/MenuBar";

function Users() {
  const { user } = useContext(AuthContext);
  let users = "";
  const { loading, data } = useQuery(FETCH_USERS_QUERY);

  if (data) {
    users = data.getUsers;
  }

  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
        <Grid stackable columns={3}>
          <Grid.Row className="page-title">
            <h1>Daftar Users</h1>
          </Grid.Row>
          <Grid.Row centered>
            <Button color="teal" as={Link} to={"/register"}>
              Tambah User
            </Button>
          </Grid.Row>
          <Grid.Row>
            {user && loading ? (
              <h1>Loading users...</h1>
            ) : (
              <Transition.Group>
                {users &&
                  users.map((usr) => (
                    <Grid.Column key={usr.id} style={{ marginBottom: 20 }}>
                      <UserCard user={usr} />
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

export default Users;
