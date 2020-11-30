import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import moment from 'moment';
import './Comment.less';
import { addRecordComment, deleteRecordComment, queryRecordComment } from '../../api/api';
import Search from 'antd/lib/input/Search';

interface CommentProps{
  comment:IRecordCommentDocument,
  id:number,
  onQueryRecordComment:()=>void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default(props:CommentProps)=>{

  const {comment} = props;
  
  const [imgs,setImags] = useState<Array<any>>([]);

  const confirm =()=>{
    deleteRecordComment({
      id:comment.id
    }).then((res)=>{
      console.log(res);
      props.onQueryRecordComment();
    })
  }

  return (
    <>
    <li>
      <div className="commentHeart">{moment(parseInt(comment.tmCreate)).format("YYYY:MM:DD hh:mm:ss") }</div>
      <div className="discription">{comment.description}</div>
      <div>
        {
          imgs.map(item=>{
            return <img src={item} alt=""/>
          })
        }
      </div>
      <div className="btn">
        <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>confirm()} okText="Yes" cancelText="No">
          <Button type="link">删除</Button>
        </Popconfirm>
      </div>
    </li>
    </>
  )
}
