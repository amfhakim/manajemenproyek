import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { Container, Form, FormField, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";

import { AuthContext } from "../../context/auth";
import { FETCH_COSTUMERS_QUERY } from "../../queries/costumers_query";
import MenuBar from "../../components/MenuBar";

function AddCostumer(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(addCostumerCallback, {
    nama: "",
    alamat: "",
    noktp: "",
    notlp: "",
    email: "",
  });

  const [addCostumer, { loading }] = useMutation(CREATE_COSTUMER_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_COSTUMERS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_COSTUMERS_QUERY,
        data: {
          getCostumers: [result.data.createCostumer, ...data.getCostumers],
        },
      });
      props.history.push("/costumers");
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

  function addCostumerCallback() {
    addCostumer();
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
            <h2> Create a costumer: </h2>
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
                label="No KTP"
                placeholder="no ktp"
                name="noktp"
                onChange={onChange}
                value={values.noktp}
                error={errors.noktp ? true : false}
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

const CREATE_COSTUMER_MUTATION = gql`
  mutation createCostumer(
    $nama: String!
    $alamat: String!
    $noktp: String!
    $notlp: String!
    $email: String!
  ) {
    createCostumer(
      costumerInput: {
        nama: $nama
        alamat: $alamat
        noktp: $noktp
        notlp: $notlp
        email: $email
      }
    ) {
      id
      nama
      alamat
      noktp
      notlp
      email
      createdAt
    }
  }
`;

export default AddCostumer;
