import React, { useState } from "react";

import { Layout } from "antd";
import "./Sidebar.css";

const Sidebar = ({ menu }) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      {menu}
    </Layout.Sider>
  );
};

export default Sidebar;
