import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
function ProjectCard({
  project: { id, nama, alamat, startAt, endAt, namaCustomer },
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header
          style={{ marginBottom: "1em" }}
          as={Link}
          to={`/projects/${id}`}
        >
          {nama}
        </Card.Header>
        <Grid.Column>
          <Image
            floated="left"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
          />
        </Grid.Column>
        <Grid.Column>
          <Card.Description>alamat : {alamat}</Card.Description>
          <Card.Description>nama customer : {namaCustomer}</Card.Description>
          <Card.Description>tanggal mulai : {startAt}</Card.Description>
          <Card.Description>tanggal selesai : {endAt}</Card.Description>
        </Grid.Column>
      </Card.Content>
    </Card>
  );
}

export default ProjectCard;
