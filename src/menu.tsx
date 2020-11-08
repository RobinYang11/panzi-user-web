import { DatabaseOutlined,  EditOutlined, FileUnknownOutlined,  HistoryOutlined,  Loading3QuartersOutlined } from "@ant-design/icons";
import React from "react";
import Defect from "./pages/Defect/Defect";
import Drawing from "./pages/Drawing/Drawing";
import DataSource from "./pages/DataSource/DataSource";
import ReturnRecord from "./pages/ReturnRecord/ReturnRecord";

export default [
  {
    name:"返场记录",
    path:"/test",
    icon:<HistoryOutlined />,
    component:ReturnRecord
  },
  {
    name:"资料假",
    path:"/test1",
    icon:<DatabaseOutlined />,
    component:DataSource
  },
  {
    name:"图纸",
    path:"/test2",
    icon:<FileUnknownOutlined />,
    component:Drawing,
  },
  {
    name:"缺陷库",
    path:"/test4",
    icon:<Loading3QuartersOutlined />,
    component:Defect,
  }
]