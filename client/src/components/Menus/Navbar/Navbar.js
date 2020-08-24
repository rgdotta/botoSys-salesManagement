import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = ({ menu }) => {
  const [visible, setVisible] = useState(false);
  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Topics"
        placement="left"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {menu}
      </Drawer>
      <a href="/">{/* <img src={logo} className="logo" alt="logo" /> */}</a>
    </nav>
  );
};

export default Navbar;
