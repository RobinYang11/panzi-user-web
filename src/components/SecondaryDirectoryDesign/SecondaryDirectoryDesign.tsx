import React, { useEffect, useState } from 'react';
import { Col, message, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { batchAddDesign, queryDesignList } from '../../api/api';
import Dragger from 'antd/lib/upload/Dragger';
import './SecondaryDirectoryDesign.less'
import dwg from '../../assets/pic_drawing.png' 


// eslint-disable-next-line import/no-anonymous-default-export
export default (props:any)=>{
  console.log(props)

  const [children,setDesign] =useState<Array<IDesign>>([]);

  useEffect(()=>{
    onQueryDesignList();
  },[props.id])

  const onQueryDesignList = ()=>{
    queryDesignList({
      "creator":112,
    }).then((res:any)=>{
      console.log(res);
    })
  }

  const aProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    accept:".DWG",
    showUploadList:false,
    onChange(info:any) {
      console.log(info);
      const { status } = info.file;
      if (status === 'done') {
        batchAddDesign({
          "creator": 112,
          "type": "file",
          "parentId": props.id,
          "list":[info.file.response.result]
        }).then((res:any)=>{
          console.log(res)
          props.onQueryDesignList();
        })
        message.success(`${info.file.name} 图纸上传成功.`);
      } 
    },
  };

  return (
    <div className="Design">
      <Dragger {...aProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件夹到此处上传</p>
        <p className="ant-upload-hint">(限CAD图纸格式)</p>
      </Dragger>
      <div className="DesignList">
        <Row>
            {
             props.fileList?.map((item:any)=>{
              return  <Col span={4}>
                 <img src={dwg} alt="" key={item.id}/>
                 <p>{item.name}</p>
                </Col>
              })
            }
        </Row>       
      </div>
    </div>
  )
}

