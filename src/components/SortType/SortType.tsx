import React, { useState } from 'react';
import {queryRecord } from '../../api/api';

interface RecordFilterReq{
  sortType:string
}

interface sortTypeProps{
  sortTypes:Array<RecordFilterReq>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:sortTypeProps)=>{
  
  const {sortTypes} = props;

  const onQueryRecord =(value:number)=>{
    queryRecord({
      sortType:value
    }).then(res=>{
      console.log(res)
    })
  }
  
  return (
    <>
      <ul>
          {
            sortTypes.map((i:any)=>{
              return <li style={{cursor:"pointer"}} onClick={()=>{onQueryRecord(i.value)}}>{i.sortType}</li>
            })
          }
      </ul>
    </>
  )
}