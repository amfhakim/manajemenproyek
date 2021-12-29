import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { Container, Form, FormField, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

import { AuthContext } from "../../context/auth";
import {
  FETCH_CUSTOMERS_QUERY,
  CREATE_CUSTOMER_MUTATION,
} from "../../queries/customers_query";
import MenuBar from "../../components/MenuBar";

function AddCustomer(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(addCustomerCallback, {
    nama: "",
    alamat: "",
    notlp: "",
    email: "",
  });

  const [addCustomer, { loading }] = useMutation(CREATE_CUSTOMER_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_CUSTOMERS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_CUSTOMERS_QUERY,
        data: {
          getCustomers: [result.data.createCustomer, ...data.getCustomers],
        },
      });
      props.history.push("/customers");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.exception.errors
          : {}
      );
    },
    variables: values,
  });

  function addCustomerCallback() {
    addCustomer();
  }

  return (
    <Container>
      <MenuBar />
      <Container text style={{ marginTop: "5em" }}>
        <div className="form-container">
          <Form
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <h2> Create a customer: </h2>
            <FormField>
              <Form.Input
                label="Nama"
                placeholder="nama"
                name="nama"
                onChange={onChange}
                value={values.nama}
                error={errors.nama ? true : false}
              />
              <Form.Input
                label="Alamat"
                placeholder="alamat"
                name="alamat"
                onChange={onChange}
                value={values.alamat}
                error={errors.alamat ? true : false}
              />
              <Form.Input
                label="No Telepon"
                placeholder="no tlp"
                name="notlp"
                onChange={onChange}
                value={values.notlp}
                error={errors.notlp ? true : false}
              />
              <Form.Input
                label="Email"
                placeholder="email"
                name="email"
                onChange={onChange}
                value={values.email}
                error={errors.email ? true : false}
              />
              <Button type="submit" color="teal">
                Submit
              </Button>
            </FormField>
          </Form>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
}

export default AddCustomer;
