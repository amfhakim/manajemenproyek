import React from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";

function SideBar() {
  const sideBar = (
    <Sidebar
      as={Menu}
      animation="push"
      direction="left"
      icon="labeled"
      inverted
      vertical
      visible="visible"
      width="thin"
    >
      <Menu.Item as="a">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Games
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </Sidebar>
  );
  return sideBar;
}

export default SideBar;
