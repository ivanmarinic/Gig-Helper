import { ISong, SongFormValues } from "./songs";
import { ISet, SetFormValues } from "./set";

export interface ISetSong{
    song: ISong | undefined;
    set: ISet | undefined;
}

export interface ISetSongFormValues extends Partial<ISetSong> {

}

export class SetSongFormValues implements ISetSongFormValues {
    song: ISong | undefined = new SongFormValues();
    set: ISet | undefined = new SetFormValues();
  
    constructor(init?: ISetSong){
        Object.assign(this, init);
    }
}