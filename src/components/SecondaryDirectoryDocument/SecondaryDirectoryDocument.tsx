import React, { useEffect, useState } from 'react';
import { Col, message, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { batchAddDocument, queryPrivateDocumentList } from '../../api/api';
import Dragger from 'antd/lib/upload/Dragger';
import './SecondaryDirectoryDocument.less'
// eslint-disable-next-line import/no-anonymous-default-export
export default (props:any)=>{

  useEffect(()=>{
    onQueryDesignList();
  },[props.id])

  const onQueryDesignList = ()=>{
      queryPrivateDocumentList({
        "creator":112
      }).then((res:any)=>{

      })
    }

  const aProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    showUploadList:false,
    onChange(info:any) {
      console.log(info);
      const { status } = info.file;
      if (status === 'done') {
        batchAddDocument({
          "creator": 112,
          "type": "file",
          "parentId": props.id,
          "list":[info.file.response.result]
        }).then(res=>{
          onQueryDesignList();
        })
        message.success(`${info.file.name} 文件上传成功`);
      } 
    },
  };

  return (
    <div className="Document">
      <Dragger {...aProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件夹到此处上传</p>
        <p className="ant-upload-hint">(限CAD图纸格式)</p>
      </Dragger>
      <div className="DocumentList">
        <Row>
            {
              props.fileList?.map((item:any)=>{
              return  <Col span={4}>
                 <img src={item.url} alt=""/>
                 <p>{item.name}</p>
                </Col>
              })
            }
        </Row>
      </div>
    </div>
  )
}


