import React, { useState } from 'react';
import { Button, Input, message, Modal, Form } from 'antd';
import './Drawing.less'
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

const {Search} =Input;

const Drawing =()=>{

  const [visible,setVisible] = useState(false);


  const onSearch =()=>{

  }

  const showModal = () =>{
    setVisible(true);
  }

  const handleCancel =()=>{
    setVisible(false);
  }

  const onSubmit =()=>{
    setVisible(false);
  }

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info:any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  

  return (
    <div className="drawing">
      <div className="drawingHeader">
        <div className="btn">
          <Button onClick={showModal}>新建文件夹</Button>
        </div>
        <div className="search">
          <Search placeholder="搜索" onSearch={onSearch} style={{ width: 200,textAlign:"right"}} />
        </div>
      </div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件夹到此处上传</p>
        <p className="ant-upload-hint">
         (限CAD图纸格式)
        </p>
      </Dragger>,

      <Modal
        title="新建项目"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form>
          <Form.Item
            label="项目名称"
            name="username"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input />
          </Form.Item>
          <div style={{textAlign:"right"}}>
            <button type="submit" onClick={handleCancel} style={{marginRight:"10px"}}>
              取消
            </button>
            <button type="submit" onClick={onSubmit}>
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default Drawing;