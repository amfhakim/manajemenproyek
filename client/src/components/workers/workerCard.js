import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function WorkerCard({
  worker: { id, nama, alamat, noktp, notlp, email, jabatan, gaji, createdAt },
}) {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="tiny"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header as={Link} to={`/workers/${id}`}>
          {nama}
        </Card.Header>
        <Card.Meta>
          terdaftar sejak: {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          <b>email:</b> {email}
        </Card.Description>
        <Card.Description>
          <b>jabatan:</b> {jabatan}
        </Card.Description>
        <Card.Description>
          <b>gaji:</b> {gaji}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default WorkerCard;
