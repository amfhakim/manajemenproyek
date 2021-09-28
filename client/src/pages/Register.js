import React, { useState, useContext } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import MenuBar from "../components/MenuBar";
import { FETCH_USERS_QUERY } from "../queries/users_query";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nama: "",
    jabatan: "",
    notlp: "",
    noktp: "",
    alamat: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USERS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_USERS_QUERY,
        data: {
          getUsers: [result.data.register, ...data.getUsers],
        },
      });
      props.history.push("/users");
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

  function registerUser() {
    addUser();
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
            <h1>Register New User</h1>
            <Form.Input
              label="Username"
              placeholder="Username.."
              name="username"
              type="text"
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Email"
              placeholder="Email.."
              name="email"
              type="email"
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Password"
              placeholder="Password.."
              name="password"
              type="password"
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="ConfirmPassword"
              placeholder="Confirm Password.."
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              error={errors.password ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Nama Lengkap"
              placeholder="Nama Lengkap.."
              name="nama"
              type="text"
              value={values.nama}
              error={errors.nama ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Jabatan"
              placeholder="Jabatan.."
              name="jabatan"
              type="text"
              value={values.jabatan}
              error={errors.jabatan ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Nomor Telepon"
              placeholder="nomor telepon.."
              name="notlp"
              type="text"
              value={values.notlp}
              error={errors.notlp ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Nomor KTP"
              placeholder="nomor KTP.."
              name="noktp"
              type="text"
              value={values.noktp}
              error={errors.noktp ? true : false}
              onChange={onChange}
            />
            <Form.Input
              label="Alamat"
              placeholder="alamat.."
              name="alamat"
              type="text"
              value={values.alamat}
              error={errors.alamat ? true : false}
              onChange={onChange}
            />
            <Button type="submit" primary>
              Register
            </Button>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $nama: String!
    $jabatan: String!
    $notlp: String!
    $noktp: String!
    $alamat: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        nama: $nama
        jabatan: $jabatan
        notlp: $notlp
        noktp: $noktp
        alamat: $alamat
      }
    ) {
      id
      email
      username
      nama
      jabatan
      notlp
      noktp
      alamat
      createdAt
      token
    }
  }
`;

export default Register;
