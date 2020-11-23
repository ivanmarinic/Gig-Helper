import { createContext } from 'react'
import SongStore from './SongStore';
import SetStore from './SetStore';
import PerformerStore from './PerformerStore';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import UserStore from './userStore';
import CommentStore from './commentStore';
import ProfileStore from './profileStore';

configure({enforceActions: 'always'});


export class RootStore {

    songStore: SongStore;
    setStore: SetStore;
    performerStore: PerformerStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    userStore: UserStore;
    commentStore: CommentStore;
    profileStore: ProfileStore;

    constructor(){
        this.songStore = new SongStore(this);
        this.setStore = new SetStore(this);
        this.performerStore = new PerformerStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.userStore = new UserStore(this);
        this.commentStore = new CommentStore(this);
        this.profileStore = new ProfileStore(this);
    }
    
}

export const RootStoreContext = createContext(new RootStore());
