import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import { FETCH_POSTS_QUERY } from "../../queries/posts_query";
import MenuBar from "../../components/MenuBar";

function Posts() {
  const { user } = useContext(AuthContext);
  let posts = "";
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    posts = data.getPosts;
  }

  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
        <Grid columns={3}>
          <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <PostForm />
            </Grid.Column>
            {user && loading ? (
              <h1>Loading posts...</h1>
            ) : (
              <Transition.Group>
                {posts &&
                  posts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} />
                    </Grid.Column>
                  ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
}

export default Posts;
