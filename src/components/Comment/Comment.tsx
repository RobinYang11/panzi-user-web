import { Button } from 'antd';
import React, { useState } from 'react';

interface CommentProps{
  Comment:IRecordCommentDocument;
}

export default (props:CommentProps)=>{

  const {Comment} = props;
  const [imgs,setImags] = useState<Array<any>>([])

  return (
    <>
      <div>
        <div>
          <span>最新追评</span>
          <span>{Comment.tmCreate}</span>
        </div>
        <p>{Comment.description}</p>
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