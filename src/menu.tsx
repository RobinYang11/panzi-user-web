import { DatabaseOutlined,  EditOutlined, FileUnknownOutlined,  HistoryOutlined,  Loading3QuartersOutlined } from "@ant-design/icons";
import React from "react";
import Defect from "./pages/Defect/Defect";
import Drawing from "./pages/Drawing/Drawing";
import DataSource from "./pages/DataSource/DataSource";
import ReturnRecord from "./pages/ReturnRecord/ReturnRecord";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

export default [
  {
    name:"返场记录",
    path:"/test",
    icon:<HistoryOutlined />,
    component:ReturnRecord,
    render:true,
  },
  {
    name:"资料假",
    path:"/test1",
    icon:<DatabaseOutlined />,
    component:DataSource,
    render:true,
  },
  {
    name:"图纸",
    path:"/test2",
    icon:<FileUnknownOutlined />,
    component:Drawing,
    render:true,
  },
  {
    name:"缺陷库",
    path:"/test3",
    icon:<Loading3QuartersOutlined />,
    component:Defect,
    render:true,
  },
  {
    name:"项目详情",
    path:"/test4/:id",
    icon:<Loading3QuartersOutlined />,
    component:ProjectDetails,
    render:false,
  }
]