import React from "react";
import { ISong } from "../../app/models/songs";
import { Segment, Item, Button } from "semantic-ui-react";
import { Genre } from "../../app/models/genre";
import { Link } from "react-router-dom";

export const SongListItem: React.FC<{ song: ISong }> = ({ song }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular />
            <Item.Content as={Link} to={`/songs/${song.id}`}>
              <Item.Header>{song.name}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary>
        {Genre[song.genre]}{" "}
        <Button
          floated="right"
          content="Details"
          color="blue"
          as={Link}
          to={`/songs/${song.id}`}
          style={{ marginTop: "-0.7%" }}
        />
      </Segment>
    </Segment.Group>
  );
};
