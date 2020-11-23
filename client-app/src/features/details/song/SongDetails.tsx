import React, { useContext, useEffect } from "react";
import {
  Grid,
  GridColumn,
  Form,
  TextArea,
  Segment,
  Item,
  Button,
  Icon,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Genre } from "../../../app/models/genre";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { SongDelete } from "./SongDelete";

interface DetailParams {
  id: string;
}

const SongDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
  location,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { song, loadSong, loadingInitial } = rootStore.songStore;

  const { openModal } = rootStore.modalStore;

  const [forceRerender, setForceRerender] = React.useState(true);

  useEffect(() => {
    loadSong(match.params.id);
    setForceRerender(!forceRerender);
  }, [loadSong, match.params.id, setForceRerender]);

  if (loadingInitial) return <LoadingComponent content="Loading song..." />;

  if (!song) return <h2>Song not found</h2>;

  return (
    <Grid>
      <GridColumn width={9}>
        <Form>
          <TextArea value={song.text} style={{ minHeight: 700 }} />
        </Form>
      </GridColumn>
      <GridColumn width={7}>
        <Item as={Link} to={"/songs"} style={{ marginLeft: "40%" }}>
          <Icon name="arrow left" size="huge" color="black" />
        </Item>
        <br />
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>{song.name}</Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment secondary>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>{Genre[song.genre]}</Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment secondary>
            <Item.Group>
              <Item as={Link} to={`/sets/${song?.songSet[0]?.set?.id}`}>
                <Item.Content>
                  <Item.Header>{song?.songSet[0]?.set?.name}</Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment secondary>
            <Item.Group>
              <Item
                as={Link}
                to={`/performers/${song.songPerformer[0].performer!.id}`}
              >
                <Item.Content>
                  <Item.Header>
                    {song.songPerformer[0].performer!.name}
                  </Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment.Group>
        <Button
          content="Edit"
          color="grey"
          as={Link}
          to={`/editSong/${song.id}`}
          style={{ padding: "15px", marginBottom: "1px", width: "100%" }}
        />
        <br />
        <Button
          content="Delete"
          color="red"
          onClick={() => openModal(<SongDelete id={match.params.id} />)}
          to={`/deleteSong/${song.id}`}
          style={{ padding: "15px", marginBottom: "1px", width: "100%" }}
        />
      </GridColumn>
    </Grid>
  );
};

export default observer(SongDetails);
