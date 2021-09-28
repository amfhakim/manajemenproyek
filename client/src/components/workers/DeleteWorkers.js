import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { FETCH_WORKERS_QUERY } from "../../queries/workers_query";
import MyPopup from "../../utils/MyPopup";

function DeleteWorkerButton({ workerId, callback }) {
  const [confirmOpen, setConfrimOpen] = useState(false);

  const mutation = DELETE_WORKER_MUTATION;

  const [deleteWorker] = useMutation(mutation, {
    update(proxy) {
      setConfrimOpen(false);

      if (workerId) {
        const data = proxy.readQuery({
          query: FETCH_WORKERS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_WORKERS_QUERY,
          data: {
            getWorkers: data.getWorkers.filter((w) => w.id !== workerId),
          },
        });
      }

      if (callback) callback();
    },
    variables: { workerId },
  });

  return (
    <>
      <MyPopup content="hapus pekerja">
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
        onConfirm={deleteWorker}
      />
    </>
  );
}

const DELETE_WORKER_MUTATION = gql`
  mutation deleteWorker($workerId: ID!) {
    deleteWorker(workerId: $workerId)
  }
`;

export default DeleteWorkerButton;
