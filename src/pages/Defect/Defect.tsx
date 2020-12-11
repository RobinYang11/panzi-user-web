import { Col, Modal, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from  'react';
import { queryDefect } from '../../api/api';
import Field from '../../components/Field/Field';
import './Defect.less';
// import video from '../../videos/douyu4.mp4';


const Defect =(props:any)=>{

  const [visible,setVisible] = useState(false);
  const [defects,setDefects] = useState<Array<Idefect>>([]);



  useEffect(()=>{
    onQueryDefect();
  })

  const onQueryDefect =()=>{
    queryDefect({}).then((res:any)=>{
      setDefects(res.result);
    })
  }
  
  return (
    <>
      <div className="headers" >
         <ul>
           <li>
             <a href="">推荐</a>
           </li>
           <li>
             <a href="">场地</a>
            </li>
           <li>
             <a href="">点位六洞</a>
           </li>
           <li>
             <a href="">楼栋</a>
           </li>
           <li>
             <a href="">精装修</a>
            </li>
         </ul>
        <span className="search">
          <Search/>
        </span>
      </div>

      <div className="defectMain">
          <ul>
              {
                defects?.map((item:any)=>{
                  return <Field defect={item} key={item.id}/>
                })
              }
          </ul>
      </div>
    </>     
  )
}

export default Defect;