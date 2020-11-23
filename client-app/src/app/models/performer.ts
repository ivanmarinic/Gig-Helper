import { IPerformerSong } from "./songPerformer";

export interface IPerformerEnvelope {
  performers: IPerformer[];
  performerCount: number;
}

export interface IPerformer {
  id: string;
  name: string;
  songPerformer: IPerformerSong[];
}

export interface IPerformerFormValues extends Partial<IPerformer> {}

export class PerformerFormValues implements IPerformerFormValues {
  id: string = '';
  name: string = "";
  songPerformer: IPerformerSong[] = [];

  constructor(init?: IPerformer) {
    Object.assign(this, init);
  }
}
