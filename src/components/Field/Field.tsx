import { Col, Modal, Row, Tag } from 'antd';
import React, { useState } from 'react';
import './Field.less'

interface DefectProps{
  defect:Idefect;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:DefectProps)=>{

  const {defect} = props;
  const [visible,setVisible] = useState(false);
  

  const showModal =()=>{
    setVisible(true);
  }

  const onCancel =()=>{
    setVisible(false);
  }
  return (
    <>
    <li onClick={showModal}>
      <Row>
        <Col span={20} style={{position:"relative"}}>
          <div className="content">
            {defect.description}
           </div>
           <div className="bottom">
             <ul className="tags">
              {
                defect.tags.map((item:any)=>{
                  return <Tag>{item}</Tag>
                })
              }
             </ul>
            <span className="tmCreate">{defect.tmCreate}</span>
           </div>
        </Col>
        <Col span={4} style={{padding:"3px"}}>
           {
            defect.medias?.map((item:any)=>{
              console.log(item)
              if(item ===".jpg"||".png"){
                return <img src={item} alt="" style={{width:"80%"}}/>
              }else{
                return <video src={item}></video>
              }
            })
          }
        </Col>
      </Row>
      </li>

      <Modal
        footer={null}
        visible={visible}
        onCancel={onCancel}
        className="modal"
        style={{textAlign:"center"}}
      >
        <p>
          {defect.description}
        </p>
        <div >
          {
            defect.medias?.map((item:any)=>{
              console.log(item)
              if(item ===".jpg"||".png"){
                return <img src={item} alt="" style={{width:"80%"}}/>
              }else{
                return <video src={item}></video>
              }
            })
          }
        </div>
      </Modal>
    </>
  )

}