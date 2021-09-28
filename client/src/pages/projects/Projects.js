import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Container, Grid, Transition, Button } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import MenuBar from "../../components/MenuBar";
import ProjectCard from "../../components/projects/ProjectCard";
import { FETCH_PROJECTS_QUERY } from "../../queries/projects_query";

function Projects() {
  const { user } = useContext(AuthContext);
  let projects = "";
  const { loading, data } = useQuery(FETCH_PROJECTS_QUERY);

  if (data) {
    projects = data.getProjects;
  }

  return (
    <Container>
      <MenuBar />
      <Container style={{ marginTop: "5em" }}>
        <Grid columns={2}>
          <Grid.Row className="page-title">
            <h1>Daftar Proyek</h1>
          </Grid.Row>
          <Grid.Row centered>
            <Button color="teal" as={Link} to={"/projects/addproject"}>
              Tambah Proyek
            </Button>
          </Grid.Row>
          <Grid.Row>
            {user && loading ? (
              <h1>Loading projects list...</h1>
            ) : (
              <Transition.Group>
                {projects &&
                  projects.map((project) => (
                    <Grid.Column key={project.id} style={{ marginBottom: 20 }}>
                      <ProjectCard project={project} />
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

export default Projects;
