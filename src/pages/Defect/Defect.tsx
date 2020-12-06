import { Col, Modal, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useState } from  'react';
import './Defect.less';
// import video from '../../videos/douyu4.mp4';

const Defect =()=>{

  const [visible,setVisible] = useState(false);

  const showModal =()=>{
    setVisible(true);
  }

  const onCancel =()=>{
    setVisible(false);
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
            <li onClick={showModal}>
              <Row>
                <Col span={20}>
                 <div className="content">
                   紧急放到喀什金坷垃范德萨进口量将富士康雷锋精神科发送到科技
                   打飞机撒副科级发的酷暑附近开了发生开发经历刷卡机大附近开了
                   对方考虑到数据库了当升科技深刻理解的时间瞌睡了的数控技术登录
                 </div>
                 <div className="bottom">
                   <div className="tags">
                     <span>哈哈</span>
                     <span>呵呵</span>
                     <span>嘻嘻</span>
                   </div>
                   <span>一分钟前</span>
                 </div>

                </Col>
                <Col span={4}>
                   {/* <video src={video} autoPlay style={{width:150}}>
                    你的浏览器不支持
                   </video> */}
                </Col>
              </Row>
            </li>
          </ul>

      </div>
      <Modal
        footer={null}
        visible={visible}
        onCancel={onCancel}
        className="modal"
      >
        {/* <video src={video} autoPlay style={{width:"80%"}}></video> */}
        <p>
          紧急放到喀什金坷垃范德萨进口量将富士康雷锋精神科发送到科技
          打飞机撒副科级发的酷暑附近开了发生开发经历刷卡机大附近开了
          对方考虑到数据库了当升科技深刻理解的时间瞌睡了的数控技术登录
        </p>
      </Modal>
    </>     
  )
}

export default Defect;