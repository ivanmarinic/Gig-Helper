import React, { useContext, useEffect, Fragment } from "react";
import {
  Grid,
  GridColumn,
  Form,
  Segment,
  Item,
  Button,
  Icon,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const PerformerDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    performer,
    loadPerformer,
    loadingInitial,
    performersByName,
  } = rootStore.performerStore;

  useEffect(() => {
    loadPerformer(match.params.id);
  }, [loadPerformer, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading performers..." />;

  if (!performer) return <h1>Performer not found</h1>;

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
                    List of songs of {performer.name}: <br />
                  </Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment.Group>

        <Fragment>
          <Segment.Group>
            {performer.songPerformer.map((per) => (
              <Segment key={per.song!.id}>
                <Item.Group>
                  <Item as={Link} to={`/songs/${per.song!.id}`}>
                    <Item.Content>
                      <Item.Header>{per.song!.name}</Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            ))}
          </Segment.Group>
        </Fragment>
      </GridColumn>
      <GridColumn width={6}>
        <Item as={Link} to={"/performers"} style={{ marginLeft: "40%" }}>
          <Icon name="arrow left" size="huge" color="black" />
        </Item>
      </GridColumn>
    </Grid>
  );
};

export default observer(PerformerDetails);
