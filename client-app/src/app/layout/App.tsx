import React, { Fragment, useContext, useEffect, useState } from "react";
import { MainDashboard } from "../../features/dashboard/MainDashboard";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Link,
} from "react-router-dom";
import {
  Container,
  Sidebar,
  Segment,
  Menu,
  Icon,
  Image,
  Dropdown,
  Input,
  Item,
} from "semantic-ui-react";
import SongList from "../../features/songs/SongList";
import SetList from "../../features/sets/SetList";
import PerformerList from "../../features/performers/PerformerList";
import { observer } from "mobx-react-lite";
import SongForm from "../../features/form/SongForm";
import SetForm from "../../features/form/SetForm";
import SongDetails from "../../features/details/song/SongDetails";
import SetDetails from "../../features/details/set/SetDetails";
import PerformerDetails from "../../features/details/performer/PerformerDetails";
import { RootStoreContext } from "../stores/rootStore";
import AddSongToSet from "../../features/sets/AddSongToSet";
import { SongDelete } from "../../features/details/song/SongDelete";
import ModalContainer from "../common/modals/ModalCotainer";
import { ToastContainer } from "react-toastify";
import { LoadingComponent } from "./LoadingComponent";
import NotFound from "./NotFound";
import { HomePage } from "../../features/home/HomePage";
import LoginForm from "../../features/user/LoginForm";
import Chat from "../../features/chat/Chat";
import ProfilePage from "../../features/profiles/ProfilePage";
import { IconContext } from "react-icons/lib/cjs";
import { SidebarData } from "../../features/sidebar/SideBarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SongFormValues, ISong } from "../models/songs";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);

  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  const { isLoggedIn, user, logout } = rootStore.userStore;

  const { loadSongs, songsByName } = rootStore.songStore;

  const [visible, setVisible] = React.useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const { openModal } = rootStore.modalStore;

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, loadSongs, token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Sidebar.Pushable style={{ minHeight: "100vh" }}>
            <Sidebar
              onClick={() => setVisible(!visible)}
              visible={visible}
              className={"nav-menu active"}
            >
              <IconContext.Provider value={{ color: "#fff" }}>
                <Container>
                  <ul className="nav-menu-items">
                    <Image
                      src={"/assets/logo.svg"}
                      as={Link}
                      to={"/dashboard"}
                    />
                    {SidebarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Container>
              </IconContext.Provider>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                <Fragment>
                  <Route
                    path={"/(.+)"}
                    render={() => (
                      <Fragment>
                        <Container
                          style={{ marginTop: "6em", marginBottom: "6em" }}
                        >
                          <Switch>
                            <Route
                              exact
                              path="/dashboard"
                              component={MainDashboard}
                            />
                            <Route
                              exact
                              path="/songs"
                              render={(props) => (
                                <SongList {...props} searchTerm={searchTerm} />
                              )}
                            />
                            <Route
                              exact
                              path="/sets"
                              render={(props) => (
                                <SetList {...props} searchTerm={searchTerm} />
                              )}
                            />
                            <Route
                              exact
                              path="/performers"
                              render={(props) => (
                                <PerformerList
                                  {...props}
                                  searchTerm={searchTerm}
                                />
                              )}
                            />
                            <Route exact path="/chat" component={Chat} />
                            <Route path="/songs/:id" component={SongDetails} />
                            <Route path="/sets/:id" component={SetDetails} />
                            <Route
                              path="/performers/:id"
                              component={PerformerDetails}
                            />
                            <Route
                              path="/addSongToSet/:id"
                              component={AddSongToSet}
                            />
                            <Route
                              path="/deleteSong/:id"
                              component={SongDelete}
                            />
                            <Route
                              path="/profile/:username"
                              component={ProfilePage}
                            />
                            <Route
                              key={location.key}
                              path={["/addSong", "/editSong/:id"]}
                              component={SongForm}
                            />
                            <Route
                              key={location.key}
                              path={["/addSet", "/editSet/:id"]}
                              component={SetForm}
                            />
                            <Route path="/login" component={LoginForm} />
                            <Route component={NotFound} />
                          </Switch>
                        </Container>
                      </Fragment>
                    )}
                  />
                </Fragment>
              </Segment>

              <Menu fixed="top" inverted pointing>
                <Menu.Item>
                  <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={() => setVisible(!visible)} />
                  </Link>
                </Menu.Item>
                <Container>
                  <Menu.Item as={Link} to={'/chat'} style={{paddingLeft: "3%"}}>
                    <Icon name="facebook messenger" color="grey" size="big" />
                  </Menu.Item>
                  <Menu.Item>
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  </Menu.Item>
                  {user && (
                    <Menu.Item position="right">
                      <Image
                        avatar
                        spaced="right"
                        src={user.image || "/assets/user.png"}
                      />
                      <Dropdown pointing="top right" text={user.displayName}>
                        <Dropdown.Menu style={{width: "12em"}}>
                          <Dropdown.Item
                            as={Link}
                            to={`/profile/${user.username}`}
                            text="My profile"
                            icon="user"
                          />
                          <Dropdown.Item
                            onClick={logout}
                            text="Logout"
                            icon="power"
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Item>
                  )}
                </Container>
              </Menu>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
