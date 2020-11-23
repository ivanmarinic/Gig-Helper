import React from "react";
import { IPerformer } from "../../app/models/performer";
import { Segment, Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const PerformerListItem: React.FC<{ performer: IPerformer }> = ({
  performer,
}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item as={Link} to={`/performers/${performer.id}`}>
            <Item.Content>
              <Item.Header>{performer.name}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};
