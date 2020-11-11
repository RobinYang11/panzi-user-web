import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import React from 'react';
import './ProjectDetails.less'  

export default (props:any) =>{
  // 获取路由动态参数
  console.log(props.match.params)

  return(
    <div className="projectDetail">
      <div className="projectDetailHeader">
        <ul className="projectDetailLeft">
            <li>
              <a href="">新建</a> 
            </li>
            <li>
              <a href="">导出</a>
            </li>
            <li>
              <a href="">数据分析</a>
            </li>
        </ul>
        <ul className="projectDetailRight">
          <li>
            <a href=""> <SearchOutlined /></a>
          </li>
          <li>
            <a href=""><SortAscendingOutlined /></a>
          </li>
          <li>
            <a href=""><FilterOutlined /></a>
          </li>
        </ul>
      </div>
    </div>
  )
}
