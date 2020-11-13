import React, { useState } from 'react';
import { Dropdown, Form, Input, Modal, Popconfirm, message} from 'antd';
import './ReturnProject.less'
import { Link } from 'react-router-dom';

interface IReturnProps{
  project:IRecordProject;
}

export default (props:IReturnProps)=>{

  const { project } = props;

  const onDelete =(id:number) =>{
    console.log(id)
  }
  
  function confirm() {
    message.info('已成功删除');
  }

  return(
    <>
      <Dropdown
        trigger={['contextMenu']}
        overlay={
            <ul className="rightModal">
              <li>重命名</li>
              <Popconfirm placement="top" title="是否确认删除" onConfirm={confirm} okText="Yes" cancelText="No">
                <li onClick={()=>{onDelete(project.id)}}>删除</li>
              </Popconfirm>
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