import { Carousel, Col, Modal, Row, Tag } from 'antd';
import moment from 'moment';
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
    <div className="field">
      <li onClick={showModal}>
      <Row className="defectItem">
        <Col span={18} style={{position:"relative"}}>
          <div className="content">
            {defect.description}
          </div>
          <Row className="bottom">
            <Col span={20} className="tags">
              {
                defect.tags.map((item:any)=>{
                  return  <li>
                     <span>{item}</span>
                  </li>
                })
              }
             </Col>
            <Col span={4} className="tmCreate">{moment(parseInt(defect.tmCreate)).format("YYYY:MM:DD mm:ss")}</Col>
          </Row>
        </Col>
        <Col span={6} className="imgAndVideo">
           {
             defect.medias?.map((item:any)=>{

              return ()=>{
                switch(item.includes("jpg"||"mp4")||defect.medias.length>=1){          
                  case "jpg" :
                     <img src={defect.medias[0]} alt="" className="img"/>; 
                     break;
                  case "mp4" :
                     <video src={defect.medias[0]} style={{width:200}} autoPlay></video>;
                     break;
                }
              }
              //  return  defect.medias.length >=1? <img src={defect.medias[0]} alt="" className="img"/>&&<img src={defect.medias[0]} alt="" className="img"/>:"";
                // return item.includes("jpg"||"mp4") ==="jpg"||"mp4" ? 
                // defect.medias.length >=1? <img src={defect.medias[0]} alt="" className="img"/> ||
                // defect.medias.length >=1? <video src={defect.medias[0]} style={{width:200}} autoPlay></video>:""
             })
          }
        </Col>
      </Row>
      </li>

      <Modal
        footer={null}
        visible={visible}
        width="600px"
        onCancel={onCancel}
      >
        <div className="imgModal">
          <div>
            <Carousel autoplay>
              {
                defect.medias?.map((item:any)=>{
                  return  <div>
                    <h3>
                      <img src={item} className="contentStyle" alt=""/>
                    </h3>
                  </div>
                })
              }
             </Carousel>
          </div>
          <p>
            {defect.description}
          </p>
        </div>
      </Modal>
    </div>
  )

}