import { LogoutOutlined, SettingOutlined, UserAddOutlined } from "@ant-design/icons"
import React, { ReactNode } from "react";
import './Dropdown.less';

interface DropdownProps {
  icon:ReactNode,
  text:string,
}

interface DropdownMenu {
  dropMenu:Array<DropdownProps>
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:DropdownMenu)=>{

  const {dropMenu} = props;

  return (
    <div className="userMenu">
      <ul>
        {
          dropMenu.map((item)=>{
            return (
              <li>
                {item.icon}
                <span>{item.text}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}