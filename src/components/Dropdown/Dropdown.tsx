import React, { ReactNode } from "react";
import './Dropdown.less';

interface DropdownProps {
  icon: ReactNode,
  text: string,
}

interface DropdownMenu {
  dropMenu: Array<DropdownProps>
}

export default (props: DropdownMenu) => {

  const { dropMenu } = props;

  return (
    <div className="userMenu">
      <ul>
        {
          dropMenu.map((item) => {
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