import React from "react";
import { Card, Image, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  verb: string;
  src: string;
  uri: string;
}

export const AddCard: React.FC<IProps> = ({ verb, src, uri }) => {
  return (
    <div>
      <Card as={Link} to={`/${uri}`}>
        <Card.Content>
          {verb === "Performers" ? (
            <Card.Header as="h1" style={{ textAlign: "center" }}>
              List Of {verb}
            </Card.Header>
          ) : (
            <Card.Header as="h1" style={{ textAlign: "center" }}>
              Add A {verb}
            </Card.Header>
          )}
          <Divider fitted />
        </Card.Content>
        <Image
          style={{ backgroundColor: "white" }}
          src={src}
          wrapped
          ui={false}
          className="addButton"
        />
      </Card>
    </div>
  );
};
