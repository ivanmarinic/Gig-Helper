import React, { useContext, useEffect, Fragment, useState } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { SetListItem } from "./SetListItem";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Button } from "semantic-ui-react";
import { ISet } from "../../app/models/set";

interface IProps {
  searchTerm: string;
}

const SetList: React.FC<IProps> = ({ searchTerm }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadSets,
    setsByName,
    loadingInitial,
    setPage,
    page,
    totalPages,
  } = rootStore.setStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const [searchResults, setSearchResults] = React.useState<ISet[]>(setsByName);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadSets().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadSets();

    const results = setsByName.filter((set) =>
      set.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [loadSets, searchTerm]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading sets..." />;

  return (
    <Fragment>
      <Fragment>
        {searchTerm === ""
          ? setsByName.map((set) => <SetListItem key={set.id} set={set} />)
          : searchResults.map((set) => <SetListItem key={set.id} set={set} />)}
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

export default observer(SetList);
