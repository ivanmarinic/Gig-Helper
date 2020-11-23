import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About user</Tab.Pane> },
  /*{ menuItem: "Added Songs", render: () => <Tab.Pane>Added Songs</Tab.Pane> },
  { menuItem: "Added Sets", render: () => <Tab.Pane>Added Sets</Tab.Pane> },
  { menuItem: "Band", render: () => <Tab.Pane>Bands of this user</Tab.Pane> },*/
  { menuItem: "Profile Photos", render: () => <ProfilePhotos /> },
];

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
