import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import {
  FETCH_CUSTOMERS_QUERY,
  DELETE_CUSTOMER_MUTATION,
} from "../../queries/customers_query";
import MyPopup from "../../utils/MyPopup";

function DeleteCustomerButton({ customerId, callback }) {
  const [confirmOpen, setConfrimOpen] = useState(false);

  const mutation = DELETE_CUSTOMER_MUTATION;

  const [deleteCustomer] = useMutation(mutation, {
    update(proxy) {
      setConfrimOpen(false);

      if (customerId) {
        const data = proxy.readQuery({
          query: FETCH_CUSTOMERS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_CUSTOMERS_QUERY,
          data: {
            getCustomers: data.getCustomers.filter((c) => c.id !== customerId),
          },
        });
      }

      if (callback) callback();
    },
    variables: { customerId },
  });

  return (
    <>
      <MyPopup content="delete customer">
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
        onConfirm={deleteCustomer}
      />
    </>
  );
}

export default DeleteCustomerButton;
