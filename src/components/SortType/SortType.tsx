import React, { ReactNode, useState } from 'react';
import {queryRecord } from '../../api/api';
import './SortType.less';
interface RecordFilterReq{
  sortType:string,
  icon:ReactNode,
}

interface sortTypeProps{
  sortTypes:Array<RecordFilterReq>;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:sortTypeProps)=>{
  
  const {sortTypes} = props;
  const [sort,setSort] = useState(0);


  const onQueryRecord =(value:any)=>{
    setSort(value);
    queryRecord({
      recordProjectId:3,
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
              return(
                    <li className={sort===i.value?"sortType sortTypes":"sortType"} onClick={()=>{onQueryRecord(i.value)}}>
                       <span>{i.sortType}</span>
                       <span className="icon">{i.icon}</span>
                    </li>
                )
            })
          }
      </ul>
    </>
  )
}