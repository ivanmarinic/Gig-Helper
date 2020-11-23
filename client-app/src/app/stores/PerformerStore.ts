import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IPerformer } from "../models/performer";
import agent from "../api/agent";

const LIMIT = 1000;

export default class PerformerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable performer: IPerformer | null = null;
  @observable loadingInitial = false;
  @observable performerRegistry = new Map();
  @observable submitting = false;
  @observable performerCount = 0;
  @observable page = 0;

  @computed get totalPages() {
    return Math.ceil(this.performerCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get performersByName() {
    return this.groupPerformersByName(
      Array.from(this.performerRegistry.values())
    );
  }

  //helper method for performersByName
  groupPerformersByName(performers: IPerformer[]) {
    const sortedPerformers = performers.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedPerformers;
  }

  @action loadPerformers = async () => {
    try {
      const performersEnvelope = await agent.Performers.list(LIMIT, this.page);
      const {performers, performerCount} = performersEnvelope;

      runInAction("loading performers", () => {
        performers.forEach((performer) => {
          this.performerRegistry.set(performer.id, performer);
        });
        this.performerCount = performerCount;
      });
      return performers;
    } catch (error) {
      runInAction("load activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadPerformer = async (id: string) => {
    let performer = this.getPerformer(id);

    if (performer) {
      this.performer = performer;
      return performer;
    } else {
      try {
        performer = await agent.Performers.details(id);
        runInAction("getting performer", () => {
          this.performer = performer;
          this.performerRegistry.set(performer.id, performer);
        });
        return performer;
      } catch (error) {
        runInAction("load activities error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getPerformer = (id: string) => {
    return this.performerRegistry.get(id);
  };

  @action editPerformer = async (performer: IPerformer) => {
    this.submitting = true;
    try {
      await agent.Performers.update(performer);
      runInAction("Updating performer", () => {
        this.performerRegistry.set(performer.id, performer);
        this.performer = performer;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Updating performer error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
}
