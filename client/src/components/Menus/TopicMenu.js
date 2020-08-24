import React from "react";

import { Link } from "react-router-dom";

import { Menu } from "antd";
import {
  DollarCircleOutlined,
  CarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const TopicMenu = ({ topics }) => {
  const styledTopics = [];
  const icons = [<DollarCircleOutlined />, <CarOutlined />, <TeamOutlined />];

  topics.forEach((topic, index) =>
    styledTopics.push(
      <Menu.SubMenu key={index} title={topic.name} icon={icons[topic.icon]}>
        {topic.options.map((option, index) => {
          return (
            <Menu.Item key={index}>
              <Link to={option.route}>{option.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu.SubMenu>
    )
  );

  return (
    <Menu theme="dark" mode="inline">
      {styledTopics}
    </Menu>
  );
};
export default TopicMenu;
