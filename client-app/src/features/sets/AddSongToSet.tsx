import React, { Fragment, useContext, useEffect } from "react";
import {
  Grid,
  GridColumn,
  Form,
  Segment,
  Item,
  Button,
} from "semantic-ui-react";
import { set } from "mobx";
import { Link, RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface DetailParams {
  id: string;
}

const AddSongToSet: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadSongs,
    loadSong,
    songsByName,
    loadingInitial,
  } = rootStore.songStore;
  const { loadSet, set } = rootStore.setStore;

  useEffect(() => {
    loadSongs();
    loadSet(match.params.id);
  }, [loadSongs, loadSet, match.params.id]);

  /*const getSongsWithoutSet = () => {
    songsByName.filter((song, i) => {
      song.songSet[i].set!.name === "None" 
    });
    console.log(songsByName);
    return songsByName;
  };*/

  if (loadingInitial) return <LoadingComponent content="Loading set..." />;

  if (!set) return <h2>Set not found</h2>;

  return (
    <Grid>
      <GridColumn width={10}>
        <Form>
          List of available songs: <br />
        </Form>

        <Segment.Group>
          <Segment>
            {songsByName
              .filter((song) => song?.songSet[0]?.set?.name.includes("None"))
              .map((s) => (
                <Item.Group>
                  <Item key={s.id} as={Link} to={`/songs/${s.id}`}>
                    <Item.Content>
                      <Item.Header>{s.name}</Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              ))}
          </Segment>
        </Segment.Group>
        
      </GridColumn>
      <GridColumn width={6}>
        <Button
          content="Cancel"
          color="grey"
          as={Link}
          to={`/sets/${set.id}`}
        />

        <Button
          content="Save songs"
          color="green"
          as={Link}
          to={`/sets/${set.id}`}
        />
      </GridColumn>
    </Grid>
  );
};

export default observer(AddSongToSet);
