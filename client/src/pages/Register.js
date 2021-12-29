import React, { useState, useContext } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import MenuBar from "../components/MenuBar";
import { FETCH_USERS_QUERY, REGISTER_USER } from "../queries/users_query";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
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
              name="name"
              type="text"
              value={values.name}
              error={errors.name ? true : false}
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

export default Register;
