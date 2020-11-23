import React, { useContext, useEffect } from "react";
import { RootStoreContext, RootStore } from "../../../app/stores/rootStore";
import { Button, Segment } from "semantic-ui-react";
import { Link, match, useHistory } from "react-router-dom";

export const SetDelete: React.FC<{ id: string }> = ({ id }) => {
  const rootStore = useContext(RootStoreContext);

  const { loadSet, deleteSet } = rootStore.setStore;

  const { closeModal } = rootStore.modalStore;

  useEffect(() => {
    loadSet(id);
  }, [loadSet, id]);

  return (
    <div>
      <Segment>Are you sure you want to delete set ?</Segment>
      <Button
        content="Delete"
        color="red"
        onClick={(e) => deleteSet(e, id) && closeModal()}
        as={Link}
        to={`/sets`}
      />
      <Button onClick={() => closeModal()} content="Cancel" color="grey" />
    </div>
  );
};
