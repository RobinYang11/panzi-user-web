import { LogoutOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    text:"个人信息",
    icon:<UserAddOutlined />,
  },
  {
    text:"编辑用户",
    icon:<SettingOutlined />,
  },
  {
    text:"退出用户",
    icon:<LogoutOutlined />,
  }
]