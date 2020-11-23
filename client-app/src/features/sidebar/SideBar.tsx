import React, { useContext, useState } from "react";
import {
  Segment,
  Menu,
  Container,
  Button,
  Dropdown,
  Image,
  Grid,
  Icon,
  Search,
  Checkbox,
  Sidebar,
  Header,
} from "semantic-ui-react";
import * as FaIcons from "react-icons/fa";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { IconContext } from "react-icons/lib/cjs";
import { SidebarData } from "./SideBarData";
import * as AiIcons from 'react-icons/ai';

const SideBar: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default observer(SideBar);
