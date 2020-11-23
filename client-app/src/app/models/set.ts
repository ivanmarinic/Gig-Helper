import { ISetSong } from "./setSong";

export interface ISetEnvelope {
    sets: ISet[];
    setCount: number;
  }

export interface ISet{
    id: string;
    name: string;
    songSet: ISetSong[];
}

export interface ISetFormValues extends Partial<ISet> {

}

export class SetFormValues implements ISetFormValues {
    id: string = '';
    name: string = "";
    songSet: ISetSong[] = [];

    constructor(init?: ISet){
        Object.assign(this, init);
    }
}