import { Genre } from "./genre";
import { IPerformerSong, PerformerSongFormValues } from "./songPerformer";
import { ISetSong, SetSongFormValues } from "./setSong";
import { useState } from "react";
import { SetFormValues } from "./set";
import { PerformerFormValues } from "./performer";
import { IComment } from "./comment";

export interface ISongEnvelope {
  songs: ISong[];
  songCount: number;
}

export interface ISong {
  id: string | undefined;
  name: string;
  genre: Genre;
  text: string;
  songSet: ISetSong[];
  songPerformer: IPerformerSong[];
}

export interface ISongFormValues extends Partial<ISong> {}

export class SongFormValues implements ISongFormValues {
  id: string | undefined = '';
  name: string = "";
  genre: Genre = 0;
  text: string = "";
  songSet: ISetSong[] = [
    {
      song: undefined,/*{
        id: undefined,
        name: "",
        genre: 0,
        text: "",
        songSet: [],
        songPerformer: [],
      },*/
      set: new SetFormValues(),
    },
  ];
  songPerformer: IPerformerSong[] = [
    {
      song: undefined,/*{
        id: undefined,
        name: "",
        genre: 0,
        text: "",
        songSet: [],
        songPerformer: [],
      },*/
      performer: new PerformerFormValues(),
    },
  ];

  constructor(init?: ISong) {
    Object.assign(this, init);
  }
}
