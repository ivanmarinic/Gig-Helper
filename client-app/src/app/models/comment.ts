export interface IComment {
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}



/*export interface IChat{
    comments: IComment;
}

export interface IChatFormValues extends Partial<IChat> {

}

export class ChatFormValues implements IChatFormValues {
    comments: IComment[] = [];

    constructor(init?: IComment){
        Object.assign(this, init);
    }
}
*/