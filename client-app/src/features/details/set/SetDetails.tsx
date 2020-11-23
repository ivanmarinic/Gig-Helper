import React, { useContext, useEffect, Fragment } from "react";
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
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { SetDelete } from "./SetDelete";

interface DetailParams {
  id: string;
}

const SetDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);

  const { set, loadSet, loadingInitial } = rootStore.setStore;

  const { openModal } = rootStore.modalStore;

  useEffect(() => {
    loadSet(match.params.id);
  }, [loadSet, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading sets..." />;

  if (!set) return <h2>Set not found</h2>;

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size="tiny" circular />
                <Item.Content>
                  <Item.Header as="a">
                    List of songs in {set.name} set: <br />
                  </Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment.Group>

        <Fragment>
          <Segment.Group>
            {set.songSet.map((ss) => (
              <Segment key={ss.song!.id}>
                <Item.Group>
                  <Item as={Link} to={`/songs/${ss.song!.id}`}>
                    <Item.Content>
                      <Item.Header>{ss.song!.name}</Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            ))}
          </Segment.Group>
        </Fragment>
      </GridColumn>
      <GridColumn width={6}>
        <Item as={Link} to={"/sets"} style={{marginLeft: "40%"}}>
          <Icon name="arrow left" size="huge" color="black" />
        </Item>
        <br />
        <Button
          content="Edit"
          color="grey"
          as={Link}
          to={`/editSet/${set.id}`}
          style={{ padding: "15px", marginBottom: "1px", width:"100%" }}
        />
        <br />
        <Button
          content="Add Songs to this Set"
          color="grey"
          as={Link}
          to={`/addSongToSet/${set.id}`}
          style={{ padding: "15px", marginBottom: "1px", width:"100%" }}
        />
        <br />
        <Button
          content="Delete"
          color="red"
          onClick={() => openModal(<SetDelete id={match.params.id} />)}
          to={`/deleteSong/${set.id}`}
          style={{ padding: "15px", marginBottom: "1px", width:"100%" }}
        />
      </GridColumn>
    </Grid>
  );
};

export default observer(SetDetails);
