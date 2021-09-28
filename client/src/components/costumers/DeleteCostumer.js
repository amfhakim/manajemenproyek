import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { FETCH_COSTUMERS_QUERY } from "../../queries/costumers_query";
import MyPopup from "../../utils/MyPopup";

function DeleteCostumerButton({ costumerId, callback }) {
  const [confirmOpen, setConfrimOpen] = useState(false);

  const mutation = DELETE_COSTUMER_MUTATION;

  const [deleteCostumer] = useMutation(mutation, {
    update(proxy) {
      setConfrimOpen(false);

      if (costumerId) {
        const data = proxy.readQuery({
          query: FETCH_COSTUMERS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_COSTUMERS_QUERY,
          data: {
            getCostumers: data.getCostumers.filter((c) => c.id !== costumerId),
          },
        });
      }

      if (callback) callback();
    },
    variables: { costumerId },
  });

  return (
    <>
      <MyPopup content="delete costumer">
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
        onConfirm={deleteCostumer}
      />
    </>
  );
}

const DELETE_COSTUMER_MUTATION = gql`
  mutation deleteCostumer($costumerId: ID!) {
    deleteCostumer(costumerId: $costumerId)
  }
`;

export default DeleteCostumerButton;
