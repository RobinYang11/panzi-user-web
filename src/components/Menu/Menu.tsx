import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Menu.less'

export interface IMenuItem{
  name:string,
  path:string,
  icon:ReactNode,
  component:any
}

interface IMenuProps {
  menu:Array<IMenuItem>,
}

export default (props:IMenuProps)=>{

  const {menu} = props;

  return(
    <ul>
      {
        menu.map((item:any)=>{
          return(
            <li>
              <Link to={item.path} >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}