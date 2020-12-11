import { DatabaseOutlined,  FileUnknownOutlined,  HistoryOutlined,  Loading3QuartersOutlined } from "@ant-design/icons";
import React from "react";
import Defect from "./pages/Defect/Defect";
import ReturnRecord from "./pages/ReturnRecord/ReturnRecord";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ExportProject from "./pages/ExportContent/ExportContent";
import Documents from './pages/Documents/Documents';
import Design from './pages/Design/Design';
import SecondaryDirectoryDesign from "./components/SecondaryDirectoryDesign/SecondaryDirectoryDesign";
import juXing53 from './assets/矩形 53 拷贝.png';
import xingzhuang from './assets/形状 4 拷贝.png';
import juXing from './assets/矩形 54 拷贝 2.png';
import duoBianXing from './assets/多边形 2 拷贝.png';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name:"返场记录",
    path:"/test",
    icon:xingzhuang,
    component:ReturnRecord,
    render:true,
  },
  {
    name:"图纸",
    path:"/test1",
    icon:juXing53,
    component:Design,
    render:true,
  },
  {
    name:"文档",
    path:"/test2",
    icon:juXing,
    component:Documents,
    render:true,
  },
  {
    name:"缺陷库",
    path:"/test3",
    icon:duoBianXing,
    component:Defect,
    render:true,
  },
  {
    name:"项目详情",
    path:"/test4/:id",
    icon:"../src/assets/形状 4 拷贝.png",
    component:ProjectDetails,
    render:false,
  },
  {
    name:"导出",
    path:"/test6",
    icon:"../src/assets/形状 4 拷贝.png",
    component:ExportProject,
    render:false,
  },
  {
    name:"图纸二级目录",
    path:"/test7",
    icon:"../src/assets/形状 4 拷贝.png",
    component:SecondaryDirectoryDesign,
    render:false,
  },
]