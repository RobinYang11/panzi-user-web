
import React, { useState } from 'react';
import { Button, Popconfirm, Popover } from 'antd';
import moment from 'moment';
import './Comment.less';
import { addRecordComment, deleteRecordComment } from '../../api/api';
import shanchu from '../../assets/删 除 拷贝.png'

interface CommentProps{
  comment:IRecordCommentDocument,
  id:number,
  onQueryRecordComment:()=>void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default(props:CommentProps)=>{

  const {comment} = props;
  
  const confirm =()=>{
    deleteRecordComment({
      id:comment.id
    }).then((res)=>{
      console.log(res);
      props.onQueryRecordComment();
    })
  }

  const content = (value:any)=>{
    return <div className="bigImage">
        <img src={value} alt=""/>
        <a href={value} target="_blank">点击查看原图</a>
    </div>  
  }

  return (
    <>
    <li className="comments">
      <div className="discription">{comment.description}</div>
      <div className="commentHeart">{moment(parseInt(comment.tmCreate)).format("YYYY:MM:DD mm:ss") }</div>
      <div className="CommentImg">
        {
         comment.imgs?.map((item:any)=>{
          return( <Popover content={content(item)}>
             <img src={item} alt="" key={item.id}/>
         </Popover>)
         })
        }
      </div>
      <div className="btn">
          <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>confirm()} okText="Yes" cancelText="No">
            <img src={shanchu} alt=""/>
          </Popconfirm>
        </div>
      </li>
    </>
  )
}
