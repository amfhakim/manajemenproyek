import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { Form, FormField, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../queries/posts_query";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      //data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    errorPolicy: "all",
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2> Create a post: </h2>
        <FormField>
          <Form.Input
            placeholder="cobain world"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </FormField>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export default PostForm;
