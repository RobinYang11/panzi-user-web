import { Button } from 'antd';
import React, { useState } from 'react';

interface CommentProps{
  comment:IRecordCommentDocument;
}

export default (props:CommentProps)=>{

  const {comment} = props;
  const [imgs,setImags] = useState<Array<any>>([])

  return (
    <>
      <div>
        <div>
          <span>最新追评</span>
          <span>{comment.tmCreate}</span>
        </div>
        <p>{comment.description}</p>
        <div>
          {
            imgs.map(item=>{
              return <img src={item} alt=""/>
            })
          }
        </div>
        <Button>删除</Button>
      </div>
    </>
  )

}