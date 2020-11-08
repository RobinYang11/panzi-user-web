import { AccountBookOutlined, AppstoreOutlined, DatabaseOutlined, DingtalkOutlined, EditOutlined, FileUnknownOutlined, FileWordOutlined, Loading3QuartersOutlined, TeamOutlined } from "@ant-design/icons";
import React from "react";
import A from "./pages/A/A";
import Abc from "./pages/Abc/Abc";
import Test from "./pages/Test/Test";

export default [
  {
    name:"返场记录",
    path:"/test",
    icon:<EditOutlined />,
    component:Test
  },
  {
    name:"资料假",
    path:"/test1",
    icon:<DatabaseOutlined />,
    component:A
  },
  {
    name:"图纸",
    path:"/test2",
    icon:<FileUnknownOutlined />,
    component:Abc
  },
  {
    name:"缺陷库",
    path:"/test2",
    icon:<Loading3QuartersOutlined />,
    component:Abc
  }
]