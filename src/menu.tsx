import { AccountBookOutlined, AppstoreOutlined, DingtalkOutlined, FileUnknownOutlined, FileWordOutlined, TeamOutlined } from "@ant-design/icons";
import React from "react";
import A from "./pages/A/A";
import Abc from "./pages/Abc/Abc";
import Test from "./pages/Test/Test";

export default [
  {
    name:"工作台",
    path:"/test",
    icon:<AppstoreOutlined />,
    component:Test
  },
  {
    name:"文档",
    path:"/test1",
    icon:<FileWordOutlined />,
    component:A
  },
  {
    name:"知识库",
    path:"/test2",
    icon:<FileUnknownOutlined />,
    component:Abc
  }
]