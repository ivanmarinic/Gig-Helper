import { RootStore } from "./rootStore";
import { observable, action, computed, runInAction } from "mobx";
import { ISet } from "../models/set";
import agent from "../api/agent";
import { history } from "../..";
import { SyntheticEvent } from "react";

const LIMIT = 11;

export default class SetStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable set: ISet | null = null;
  @observable loadingInitial = false;
  @observable setRegistry = new Map();
  @observable submitting = false;
  @observable target = "";
  @observable setCount = 0;
  @observable page = 0;

  @computed get totalPages() {
    return Math.ceil(this.setCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get setsByName() {
    return this.groupSetsByName(Array.from(this.setRegistry.values()));
  }

  groupSetsByName(sets: ISet[]) {
    const sortedSets = sets.sort((a, b) => a.name.localeCompare(b.name));

    return sortedSets;
  }

  @action loadSets = async () => {
    this.loadingInitial = true;
    try {
      const setsEnvelope = await agent.Sets.list(LIMIT, this.page);
      const {sets, setCount} = setsEnvelope;

      runInAction("loading sets", () => {
        sets.forEach((set) => {
          this.setRegistry.set(set.id, set);
        });
        this.setCount = setCount;
        this.loadingInitial = false;
      });
      return sets;
    } catch (error) {
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadSet = async (id: string) => {
    let set = this.getSet(id);

    if (set) {
      this.set = set;
      return set;
    } else {
      this.loadingInitial = true;
      try {
        set = await agent.Sets.details(id);
        runInAction("getting set", () => {
          this.set = set;
          this.setRegistry.set(set.id, set);
          this.loadingInitial = false;
        });
        console.log(set);
        return set;
      } catch (error) {
        runInAction("load activities error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  
  //helper method for loadSet
  getSet = (id: string) => {
    return this.setRegistry.get(id);
  };

  @action createSet = async (set: ISet) => {
    try {
      await agent.Sets.create(set);
      runInAction("Creating set", () => {
        this.setRegistry.set(set.id, set);
      });
      history.push(`/sets/${set.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  @action editSet = async (set: ISet) => {
    this.submitting = true;
    try {
      await agent.Sets.update(set);
      runInAction("Editing set", () => {
        this.setRegistry.set(set.id, set);
        this.set = set;
        this.submitting = false;
      });
      history.push(`/sets/${set.id}`);
    } catch (error) {
      runInAction("Editing sets error", () => {
        this.submitting = true;
      });
      console.log(error);
    }
  };

  @action deleteSet = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Sets.delete(id);
      runInAction("Deleting set", () => {
        this.setRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("Error deleting set", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
}
