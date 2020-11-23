import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { IComment } from "../models/comment";


export default class CommentStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable comments: IComment[] = [];
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44341/chat", {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .catch((error) => console.log("Error establishing connection: ", error));

    this.hubConnection.on("ReceiveComment", (comm) => {
        console.log(comm);
      runInAction("Receiving comment", () => {
        this.comments?.push(comm);
      });
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection!.stop();
  };

  @action addComment = async (values: any) => {
    
    try {
      await this.hubConnection!.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };
}
