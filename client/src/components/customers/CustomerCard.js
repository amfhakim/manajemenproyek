import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function CustomerCard({
  customer: { id, nama, alamat, notlp, email, username, createdAt },
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="tiny"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header as={Link} to={`/customers/${id}`}>
          {nama}
        </Card.Header>
        <Card.Meta>
          terdaftar sejak: {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          <b>alamat:</b> {alamat}
        </Card.Description>
        <Card.Description>
          <b>no telepon:</b> {notlp}
        </Card.Description>
        <Card.Description>
          <b>email:</b> {email}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default CustomerCard;
