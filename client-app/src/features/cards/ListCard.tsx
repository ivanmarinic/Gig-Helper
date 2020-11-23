import React from "react";
import { Card, Image, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  verb: string;
  uri: string;
  src: string;
}

export const ListCard: React.FC<IProps> = ({ verb, uri, src }) => {
  return (
    <Card as={Link} to={`/${uri}`}>
      <Card.Content>
        <Card.Header as="h1" style={{ textAlign: "center" }}>
          List Of {verb}
        </Card.Header>

        <Divider fitted />
      </Card.Content>
      <Image
        src={src}
        wrapped
        ui={false}
        circular
        style={{ backgroundColor: "white" }}
      />
    </Card>
  );
};
