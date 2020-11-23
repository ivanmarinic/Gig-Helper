import { IPerformer, PerformerFormValues } from "./performer";
import { ISong } from "./songs";

export interface IPerformerSong{
    performer: IPerformer | undefined;
    song: ISong | undefined;
}

export interface IPerformerSongFormValues extends Partial<IPerformerSong> {

}

export class PerformerSongFormValues implements IPerformerSongFormValues {
    song: ISong | undefined = undefined;
    performer: IPerformer | undefined = new PerformerFormValues();
  
    constructor(init?: IPerformerSong){
        Object.assign(this, init);
    }
}