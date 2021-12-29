import React, { useContext, useState } from "react";
import { Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Redirect } from "react-router";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/home" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    user.username === "admin" ? (
      <Menu fixed="top" inverted size="huge">
        <Menu.Item name="projects" active as={Link} to="/projects" />
        <Menu.Item name="customers" as={Link} to="/customers" />
        <Menu.Item name="users" as={Link} to="/users" />
        <Menu.Item name="workers" as={Link} to="/workers" />

        <Menu.Menu position="right">
          <Menu.Item name={user.username} as={Link} to="/profile" />
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    ) : (
      <Container>
        <Menu fixed="top" inverted size="huge">
          <Menu.Item name="home" active as={Link} to="/projects" />

          <Menu.Menu position="right">
            <Menu.Item name={user.username} as={Link} to="/profile" />
            <Menu.Item name="logout" onClick={logout} />
          </Menu.Menu>
        </Menu>
      </Container>
    )
  ) : (
    <Redirect to="/" />
  );

  return menuBar;
}

export default MenuBar;
