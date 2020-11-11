import React, { useState } from 'react';
import { Dropdown, Form, Input, Modal} from 'antd';
import './ReturnProject.less'
import { Link } from 'react-router-dom';

interface IReturnProps{
  project:IReturnRecordProject
}

export default (props:IReturnProps)=>{

  const { project } = props;

  const onDelete =(id:number) =>{
    console.log(id)
  }
  

  return(
    <>
      <Dropdown
        trigger={['contextMenu']}
        overlay={
            <ul className="rightModal">
              <li onClick={()=>{onDelete(project.id)}}>删除</li>
            </ul>
        }
       >
        <li className="recordLi">
          <a href={`#/test4/${project.id}`}>
            <img src={project.logo}/>
          </a>
          <span>{project.name}</span>
        </li>
      </Dropdown>
     </>
  )
}