import React, { useContext, useState } from "react";
import {
  Segment,
  Container,
  Dropdown,
  Image,
  Grid,
  Icon,
  Search,
  Menu,
  MenuItem,
  Button,
  Sidebar,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { MainDashboard } from "../dashboard/MainDashboard";
import { SidebarData } from "../sidebar/SideBarData";
import { IconContext } from "react-icons/lib/cjs";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { isLoggedIn, user, logout } = rootStore.userStore;

  const [visible, setVisible] = React.useState(false);

  return (
    <Sidebar.Pushable>
      <Sidebar
        visible={visible}
        style={{
          width: "260px",
          height: "1%",
          marginBottom: "-5000px",
          paddingBottom: "5000px",
        }}
        className={"nav-menu active"}
      >
        <IconContext.Provider value={{ color: "#fff" }}>
          <ul className="nav-menu-items">
            <Image src={"/assets/logo.svg"} />
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
        </IconContext.Provider>
      </Sidebar>
      <Sidebar.Pusher>
        <Segment basic>
          <MainDashboard />

          <Menu fixed="top" inverted pointing>
            <Menu.Item>
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={() => setVisible(!visible)} />
              </Link>
            </Menu.Item>
            <Container>
              <Menu.Item>
                <Icon name="bell outline" color="grey" size="large" />
              </Menu.Item>
              <Menu.Item>
                <Search />
              </Menu.Item>
              {user && (
                <Menu.Item style={{ marginLeft: "38.5%" }}>
                  <Image
                    avatar
                    spaced="right"
                    src={user.image || "/assets/user.png"}
                  />
                  <Dropdown pointing="top left" text={user.displayName}>
                    <Dropdown.Menu>
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
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default observer(NavBar);
