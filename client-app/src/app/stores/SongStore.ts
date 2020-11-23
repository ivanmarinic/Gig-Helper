import { RootStore } from "./rootStore";
import { observable, action, computed, runInAction } from "mobx";
import { ISong, SongFormValues } from "../models/songs";
import agent from "../api/agent";
import { history } from "../..";
import { SyntheticEvent } from "react";

const LIMIT = 11;

export default class SongStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable song: ISong | null = null;
  @observable songRegistry = new Map();
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable songCount = 0;
  @observable page = 0;
  

  @computed get totalPages() {
    return Math.ceil(this.songCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get songsByName() {
    return this.groupSongsByName(Array.from(this.songRegistry.values()));
  }

  //helper method for songsByName
  groupSongsByName(songs: ISong[]) {
    const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));

    return sortedSongs;
  }

  @action loadSongs = async () => {
    this.loadingInitial = true;
    try {
      const songsEnvelope = await agent.Songs.list(LIMIT, this.page);
      const {songs, songCount} = songsEnvelope;

      runInAction("loading songs", () => {
        songs.forEach((song) => {
          this.songRegistry.set(song.id, song);
        });
        this.songCount = songCount;
        this.loadingInitial = false;
      });
      return songs;
    } catch (error) {
      runInAction("Loading songs error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadSong = async (id: string) => {
    let song = this.getSong(id);

    if (song) {
      this.song = song;
      return song;
    } else {
      this.loadingInitial = true;
      try {
        song = await agent.Songs.details(id);
        runInAction("getting song", () => {
          this.song = song;
          this.songRegistry.set(song.id, song);
          this.loadingInitial = false;
        });
        //console.log(song);
        return song;
      } catch (error) {
        runInAction("Getting song error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  //helper method for loadSong
  getSong = (id: string) => {    
    return this.songRegistry.get(id);
  };

  @action createSong = async (song: any | ISong) => {
    this.submitting = true;
    console.log(song);

    let s, p = null;

    try{
      s = await agent.Sets.details(song.songSet[0].set.id);
      console.log(s)
    }catch(error){
      console.log(error)
    }

    try{
      p = await agent.Performers.details(song.songPerformer[0].performer.id);
      console.log(p)
    }catch(error){
      console.log(error)
    }

    var x = new SongFormValues();
    x.id = song.id;
    x.genre = song.genre;
    x.name = song.name;
    x.text = song.text;
    if(p.songPerformer.length != 0){
      x.songPerformer = p.songPerformer;
    }else{
      x.songPerformer[0].performer = p;
    }

    if(s.songSet.length != 0){
      x.songSet = s.songSet;
    }else{
      x.songSet[0].set = s;
    }

    console.log(x)

    try {
      await agent.Songs.create(x);
      runInAction("Creating song", () => {
        this.songRegistry.set(x.id, x);
        this.submitting = false;
      });
      history.push(`/songs/${x.id}`);
    } catch (error) {
      runInAction("creating activities error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editSong = async (song: ISong | any ) => {

    console.log(song);

    this.submitting = true;

    let s, p = null;

    try{
      s = await agent.Sets.details(song.songSet[0].set.id);
    }catch(error){
      console.log(error)
    }

    try{
      p = await agent.Performers.details(song.songPerformer[0].performer.id);
    }catch(error){
      console.log(error)
    }


    var x = new SongFormValues();
    x.id = song.id;
    x.genre = song.genre;
    x.name = song.name;
    x.text = song.text;
    if(p.songPerformer.length != 0){
      x.songPerformer = p.songPerformer;
    }else{
      x.songPerformer[0].performer = p;
    }

    if(s.songSet.length != 0){
      x.songSet = s.songSet;
    }else{
      x.songSet[0].set = s;
    }


    console.log(x)

    try {
      await agent.Songs.update(x);
      runInAction("Updating song", () => {
        this.songRegistry.set(x.id, x);
        this.song = x;
        this.submitting = false;
      });
      history.push(`/songs/${x.id}`);
    } catch (error) {
      runInAction("editing activities error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteSong = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try{
      await agent.Songs.delete(id);
      runInAction("Deleting song", () => {
        this.songRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      })
    }catch(error){
      runInAction("Error deleting song", () => {
        this.submitting = false;
        this.target = "";
      })
      console.log(error);
    }
  };
}
