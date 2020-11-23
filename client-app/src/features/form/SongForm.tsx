import React, { useContext, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { SongFormValues } from "../../app/models/songs";
import { TextAreaInput } from "../../app/common/form/TextAreaInput";
import { TextInput } from "../../app/common/form/TextInput";
import { v4 as uuid } from "uuid";
import { genre } from "../../app/options/categoryOptions";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { SelectInput } from "../../app/common/form/SelectInputGenre";
import { SelectInputText } from "../../app/common/form/SelectInputText";

interface DetailParams {
  id: string;
}

const validate = combineValidators({
  name: isRequired({ message: "The name of the song is required" }),
  genre: isRequired("Genre"),
  text: composeValidators(
    isRequired("Song text"),
    hasLengthGreaterThan(20)({
      message: "Song text needs to be at least 20 characters",
    })
  )(),
});

const SongForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { loadSong, createSong, editSong, submitting } = rootStore.songStore;

  const { performersByName, loadPerformers } = rootStore.performerStore;
  const { setsByName, loadSets } = rootStore.setStore;

  const [song, setSong] = useState(new SongFormValues());
  const [loading, setLoading] = useState(false);

  const performerOptions = performersByName.map((performer) => {
    return {
      key: performer.id,
      text: performer.name,
      value: performer.id,
    };
  });

  const setOptions = setsByName.map((set) => {
    return {
      key: set.id,
      text: set.name,
      value: set.id,
    };
  });

  useEffect(() => {
    loadPerformers();
    loadSets();
    if (match.params.id) {
      setLoading(true);
      loadSong(match.params.id)
        .then((song) => {
          setSong(new SongFormValues(song));
        })
        .finally(() => setLoading(false));
    }
  }, [loadSong, match.params.id, setLoading]);

  const handleFinalFormSubmit = (values: any) => {
    //console.log(values);

    const { ...song } = values;

    if (!song.id) {
      let newSong = {
        ...song,
        id: uuid(),
      };
      createSong(newSong);
    } else {
      editSong(song);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={song}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="name"
                  placeholder="Song name"
                  value={song.name}
                  component={TextInput}
                />
                <Field
                  component={SelectInput}
                  name="genre"
                  placeholder="Genre"
                  value={song.genre}
                  options={genre}
                />
                <Field
                  component={SelectInputText}
                  name="songSet[0].set.id"
                  value={song.songSet[0].set!.id}
                  options={setOptions}
                  placeholder="Set"
                />
                <Field
                  component={SelectInputText}
                  name="songPerformer[0].performer.id"
                  value={song.songPerformer[0].performer!.id}
                  options={performerOptions}
                  placeholder="Performer"
                />
                <Field
                  name="text"
                  placeholder="Text"
                  rows={3}
                  value={song.text}
                  component={TextAreaInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  posititive="true"
                  color="green"
                  type="submit"
                  content="Submit"
                  disabled={loading || invalid || pristine}
                />
                <Button
                  onClick={
                    //if we have id we go to ?, if we don't we go to :
                    song.id
                      ? () => history.push(`/songs/${song.id}`)
                      : () => history.push("/songs")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(SongForm);
