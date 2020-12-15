import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.less'

export interface IMenuItem{
  name:string,
  path:string,
  icon:string,
  component:any,
  render:boolean,
}

interface IMenuProps {
  menu:Array<IMenuItem>,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:IMenuProps)=>{

  const {menu} = props;

  const [menuItem,setItem] = useState("");

  return(
    <ul>
      {
        menu.map((item)=>{
          if(!item.render){
            return ;
          }
          return(
            <li
             onClick={(e:any)=>{
              setItem(e.target.innerHTML);
             }}
            className={menuItem===item.name?"menuItem menuItems":"menuItem "}
            >
              <Link to={item.path} style={{width: "100%",display:"inline-block"}}>
                <img src={item.icon} alt=""/>
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}