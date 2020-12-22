import { Carousel, Col, Modal, Row } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { isImage, isVideo } from '../../utils/tool';
import './Field.less'

interface DefectProps {
  defect: Idefect;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: DefectProps) => {

  const { defect } = props;
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  }

  const onCancel = () => {
    setVisible(false);
  }

  const renderImages = () =>{

   return defect.medias?.map((item:any)=>{
        if (isImage(item)) {
          return <div>
            <img 
            src={item} 
            alt="图片" 
            className="modalImg"
           />
          </div> 
        }
  
        if (isVideo(item)) {
          return  <div>
              <video  
              controls={true}
              src={item} 
              >
           </video>
          </div>
        }
      })
  }


  const renderImage = () => {

    if (defect.medias.length>= 1) {
      if (isImage(defect.medias[0])) {
        return <img src={defect.medias[0]} 
        alt="图片" 
        className="fieldImage"
        />
      }
      if (isVideo(defect.medias[0])) {
        return  <video  
            controls={true}
            src={defect.medias[0]} 
            className="filedVideo"
            >
         </video>
      }
    }
  }

  return (
    <div className="field">
      <li onClick={showModal}>
        <Row className="defectItem">
          <Col span={18} style={{ position: "relative" }}>
            <div className="content">
              {defect.description}
            </div>
            <Row className="bottom">
              <Col span={20} className="tags">
                {
                  defect.tags?.map((item: any) => {
                    return <li>
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
              renderImage()
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
              {
                renderImages()
              }
          </div>
          <p style={{fontSize:"16px"}}>
            {defect.description}
          </p>
        </div>
      </Modal>
    </div>
  )
}