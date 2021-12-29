import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import {
  FETCH_USERS_QUERY,
  DELETE_USER_MUTATION,
} from "../../queries/users_query";
import MyPopup from "../../utils/MyPopup";

function DeleteUserButton({ userId, callback }) {
  const [confirmOpen, setConfrimOpen] = useState(false);

  const mutation = DELETE_USER_MUTATION;

  const [deleteUser] = useMutation(mutation, {
    update(proxy) {
      setConfrimOpen(false);

      if (userId) {
        const data = proxy.readQuery({
          query: FETCH_USERS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_USERS_QUERY,
          data: {
            getUsers: data.getUsers.filter((u) => u.id !== userId),
          },
        });
      }

      if (callback) callback();
    },
    variables: { userId },
  });

  return (
    <>
      <MyPopup content="hapus pengguna">
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfrimOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfrimOpen(false)}
        onConfirm={deleteUser}
      />
    </>
  );
}

export default DeleteUserButton;
