import React from 'react';
import { Dropdown, Popover } from 'antd';
import './ReturnProject.less'

interface IReturnProps{
  project:IReturnRecordProject
}

export default (props:IReturnProps)=>{

  const { project } = props;

  const onDelete =(id:number) =>{
    console.log(id)
  }

  const onEdit =()=>{

  }

  return(
    <Dropdown
      trigger={['contextMenu']}
      overlay={
           <ul className="rightModal">
            <li onClick ={onEdit}>编辑</li>
            <li onClick={()=>{onDelete(project.id)}}>删除</li>
          </ul>
      }
     >
      <li className="recordLi">
        <img src={project.logo}/>
        <span>{project.name}</span>
      </li>
     </Dropdown>
  )
}