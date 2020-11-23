import React, { useContext, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid, Segment, Form, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../app/stores/rootStore";
import { v4 as uuid } from "uuid";
import { SetFormValues } from "../../app/models/set";
import { TextInput } from "../../app/common/form/TextInput";

interface DetailParams {
  id: string;
}

const SetForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { loadSet, createSet, editSet } = rootStore.setStore;

  const { songsByName } = rootStore.songStore;

  const [set, setSet] = useState(new SetFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadSet(match.params.id)
        .then((set) => setSet(new SetFormValues(set)))
        .finally(() => setLoading(false));
    }
  }, [loadSet, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...set } = values;

    if (!set.id) {
      let newSet = {
        ...set,
        id: uuid(),
      };
      createSet(newSet);
    } else {
      editSet(set);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            initialValues={set}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  placeholder="Set name"
                  value={set.name}
                  component={TextInput}
                />

                <Button
                  floated="right"
                  posititive="true"
                  color="green"
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    //if we have id we go to ?, if we don't we go to :
                    set.id
                      ? () => history.push(`/sets/${set.id}`)
                      : () => history.push("/sets")
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                />
              </Form>
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(SetForm);
