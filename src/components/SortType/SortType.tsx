import { Col, Row } from 'antd';
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
          {
            sortTypes.map((i:any)=>{
              return(
                    <Row className={sort===i.value?"sortType sortTypes":"sortType"} onClick={()=>{onQueryRecord(i.value)}}>
                      <Col span={20}>
                        <span>{i.sortType}</span>
                      </Col>
                      <Col span={4}>
                        <img src={i.icon} alt="" className="icon"/>
                      </Col>
                    </Row>
                )
            })
          }
    </>
  )
}