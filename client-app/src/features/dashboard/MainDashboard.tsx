import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import { ListCard } from "../cards/ListCard";
import { AddCard } from "../cards/AddCard";

export const MainDashboard = () => {
  return (
    <Container >
      <Grid style={{ padding: "5%" }} columns={2} divided>
        <Header as="h1" block>
          SONGS
        </Header>
        <Grid.Row>
          <Grid.Column>
            <ListCard verb={"Songs"} uri={"songs"} src="assets/set.png"/>
          </Grid.Column>

          <Grid.Column>
            <AddCard verb={"Song"} uri={"addSong"} src="assets/plus.svg"/>
          </Grid.Column>
        </Grid.Row>

        <Header as="h1" block>
          SETS
        </Header>
        <Grid.Row>
          <Grid.Column>
            <ListCard verb={"Sets"} uri={"sets"} src="assets/set.png"/>
          </Grid.Column>

          <Grid.Column>
            <AddCard verb={"Set"} uri={"addSet"} src="assets/plus.svg"/>
          </Grid.Column>
        </Grid.Row>

        <Header as="h1" block>
          PERFORMERS
        </Header>
        <Grid.Row>
          <Grid.Column>
            <AddCard verb={"Performers"} uri={"performers"} src="assets/performer.svg"/>
          </Grid.Column>
        </Grid.Row>
        
      </Grid>
    </Container>
  );
};
