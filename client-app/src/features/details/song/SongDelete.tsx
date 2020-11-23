import React, { useContext, useEffect } from "react";
import { RootStoreContext, RootStore } from "../../../app/stores/rootStore";
import { Button, Segment } from "semantic-ui-react";
import { Link, match, useHistory } from "react-router-dom";

export const SongDelete: React.FC<{ id: string }> = ({ id }) => {
  const rootStore = useContext(RootStoreContext);

  const { song, loadSong, deleteSong } = rootStore.songStore;

  const { closeModal } = rootStore.modalStore;

  const history = useHistory();

  useEffect(() => {
    loadSong(id);
  }, [loadSong, id]);

  return (
    <div>
      <Segment>Are you sure you want to delete song ?</Segment>
      <Button
        content="Delete"
        color="red"
        onClick={(e) => deleteSong(e, id) && closeModal()}
        as={Link}
        to={`/songs`}
      />
      <Button onClick={() => closeModal()} content="Cancel" color="grey" />
    </div>
  );
};
