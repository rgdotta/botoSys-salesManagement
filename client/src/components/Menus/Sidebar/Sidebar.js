import React, { useState } from "react";

import { Layout } from "antd";
import "./Sidebar.css";

const Sidebar = ({ menu }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      {menu}
    </Layout.Sider>
  );
};

export default Sidebar;
