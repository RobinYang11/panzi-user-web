import { LogoutOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons"
import React from "react"

export default ()=>{


  return (
    <div className="userMenu">
      <ul>
        <li>
          <UserAddOutlined />
          <span style={{marginLeft:"10px"}}>个人信息</span>
        </li>
        <li>
          <SettingOutlined />
          <span style={{marginLeft:"10px"}}>编辑用户</span>
        </li>
        <li>
          <UserAddOutlined />
          <span style={{marginLeft:"10px"}}>个人信息</span>
        </li>
        <li>
          <UserAddOutlined />
          <span style={{marginLeft:"10px"}}>个人信息</span>
        </li>
        <li>
          <LogoutOutlined />
          <span style={{marginLeft:"10px"}}>退出用户</span>
        </li>
      </ul>
    </div>
  )

}