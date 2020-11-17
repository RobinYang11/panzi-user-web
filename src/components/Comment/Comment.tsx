import React, { useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import './Comment.less';
import { deleteRecordComment } from '../../api/api';

interface CommentProps{
  comment:IRecordCommentDocument
}

export default(props:CommentProps)=>{

  const {comment} = props;
  
  const [imgs,setImags] = useState<Array<any>>([]);

  const onDeletComment =()=>{
    deleteRecordComment({
      id:comment.id
    }).then((res)=>{
      console.log(res)
    })
  }

  return (

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
        <Button type="link" onClick={onDeletComment}>删除</Button>
      </div>
    </li>
  )
}
