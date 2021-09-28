import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Label,
  Image,
  Form,
  Container,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../../components/LikeButton";
import { AuthContext } from "../../context/auth";
import DeleteButton from "../../components/DeleteButton";
import MyPopup from "../../utils/MyPopup";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  let getPost = "";
  const [comment, setComment] = useState("");

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });
  if (data) {
    getPost = data.getPost;
  }

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push("/home");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>loading post ...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Container style={{ marginTop: "7em" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                floated="right"
                size="small"
                src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <CardContent extra>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <MyPopup content="comment on post">
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log("comment on post")}
                    >
                      <Button basic color="blue">
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  </MyPopup>

                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </CardContent>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="comment.."
                          name="comment"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ""}
                          onClick={submitComment}
                        >
                          submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

export default SinglePost;
