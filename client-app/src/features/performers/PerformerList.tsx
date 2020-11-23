import React, { useContext, useEffect, Fragment, useState } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { PerformerListItem } from "./PerformerListItem";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Button } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import { IPerformer } from "../../app/models/performer";

interface IProps {
  searchTerm: string;
}

const PerformerList: React.FC<IProps> = ({ searchTerm }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    performersByName,
    loadPerformers,
    loadingInitial,
    setPage,
    page,
    totalPages,
  } = rootStore.performerStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const [searchResults, setSearchResults] = React.useState<IPerformer[]>(
    performersByName
  );

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadPerformers().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadPerformers();

    const results = performersByName.filter((performer) =>
      performer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [loadPerformers, searchTerm]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading performers..." />;

  return (
    <Fragment>
      <Fragment>
        {searchTerm === ""
          ? performersByName.map((performer) => (
              <PerformerListItem key={performer.id} performer={performer} />
            ))
          : searchResults.map((performer) => (
              <PerformerListItem key={performer.id} performer={performer} />
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

export default observer(PerformerList);
