import React from "react";
import { ISet } from "../../app/models/set";
import { Segment, Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const SetListItem: React.FC<{ set: ISet }> = ({ set }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item as={Link} to={`/sets/${set.id}`}>
            <Item.Content>
              <Item.Header>{set.name}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};
