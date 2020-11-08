import { AccountBookOutlined, AppstoreOutlined, DingtalkOutlined, FileUnknownOutlined, FileWordOutlined, TeamOutlined } from "@ant-design/icons";
import React from "react";
import Test from "./pages/Test/Test";

export default [
  {
    name:"工作台",
    path:"test",
    icon:<AppstoreOutlined />,
    component:Test
  },
  {
    name:"文档",
    path:"test1",
    icon:<FileWordOutlined />,
    component:Test
  },
  {
    name:"知识库",
    path:"test2",
    icon:<FileUnknownOutlined />,
    component:Test
  },
  {
    name:"团队",
    path:"",
    icon:<TeamOutlined />,
    component:Test
  },
  {
    name:"协作",
    path:"",
    icon:<AccountBookOutlined />,
    component:Test
  },
  {
    name:"讨论",
    path:"",
    icon:<DingtalkOutlined />,
    component:Test
  }
]