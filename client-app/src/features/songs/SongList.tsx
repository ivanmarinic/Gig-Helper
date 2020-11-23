import React, { useContext, useEffect, Fragment, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { SongListItem } from "./SongListItem";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Button } from "semantic-ui-react";
import { ISong } from "../../app/models/songs";

interface IProps {
  searchTerm: string;
}

const SongList: React.FC<IProps> = ({ searchTerm }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadSongs,
    songsByName,
    loadingInitial,
    setPage,
    page,
    totalPages,
  } = rootStore.songStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const [searchResults, setSearchResults] = React.useState<ISong[]>(
    songsByName
  );

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadSongs().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadSongs();

    const results = songsByName.filter((song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [loadSongs, searchTerm]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading songs..." />;

  return (
    <Fragment>
      <Fragment>
        {searchTerm === ""
          ? songsByName.map((song) => (
              <SongListItem key={song.id} song={song} />
            ))
          : searchResults.map((song) => (
              <SongListItem key={song.id} song={song} />
            ))}
      </Fragment>
      <Button
        floated="right"
        content="More..."
        positive
        //there's no more pages
        disabled={totalPages === page + 1}
        onClick={handleGetNext}
        loading={loadingNext}
      />
    </Fragment>
  );
};

export default observer(SongList);
