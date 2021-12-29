import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { Container, Form, FormField, Button } from "semantic-ui-react";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";
import MenuBar from "../../components/MenuBar";
import { FETCH_WORKERS_QUERY } from "../../queries/workers_query";

function AddWorker(props) {
  //const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(addWorkerCallback, {
    nama: "",
    alamat: "",
    notlp: "",
    email: "",
  });

  const [addWorker, { loading }] = useMutation(CREATE_WORKER_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_WORKERS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_WORKERS_QUERY,
        data: {
          getWorkers: [result.data.createWorker, ...data.getWorkers],
        },
      });
      props.history.push("/workers");
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

  function addWorkerCallback() {
    addWorker();
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
            <h2> Add a worker: </h2>
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

const CREATE_WORKER_MUTATION = gql`
  mutation createWorker(
    $nama: String!
    $alamat: String!
    $notlp: String!
    $email: String!
  ) {
    createWorker(
      input: { nama: $nama, alamat: $alamat, notlp: $notlp, email: $email }
    ) {
      id
      nama
      alamat
      notlp
      email
    }
  }
`;

export default AddWorker;
