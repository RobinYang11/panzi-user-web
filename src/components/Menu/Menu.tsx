import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Menu.less'

export interface IMenuItem{
  name:string,
  path:string,
  icon:ReactNode,
  component:any,
  render:boolean
}

interface IMenuProps {
  menu:Array<IMenuItem>,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:IMenuProps)=>{

  const {menu} = props;

  return(
    <ul>
      {
        menu.map((item)=>{
          if(!item.render){
            return ;
          }
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