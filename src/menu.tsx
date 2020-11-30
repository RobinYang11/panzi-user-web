import { DatabaseOutlined,  FileUnknownOutlined,  HistoryOutlined,  Loading3QuartersOutlined } from "@ant-design/icons";
import React from "react";
import Defect from "./pages/Defect/Defect";
import ReturnRecord from "./pages/ReturnRecord/ReturnRecord";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ExportProject from "./pages/ExportContent/ExportContent";
import Documents from './pages/Documents/Documents';
import Design from './pages/Design/Design';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name:"返场记录",
    path:"/test",
    icon:<HistoryOutlined />,
    component:ReturnRecord,
    render:true,
  },
  {
    name:"图纸",
    path:"/test1",
    icon:<DatabaseOutlined />,
    component:Design,
    render:true,
  },
  {
    name:"文档",
    path:"/test2",
    icon:<FileUnknownOutlined />,
    component:Documents,
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
  },
  {
    name:"导出",
    path:"/test6",
    icon:<Loading3QuartersOutlined />,
    component:ExportProject,
    render:false,
  }
]