import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { queryPrivateDocumentList } from '../../api/api';
import Adocument from '../../components/Adocument/Adocument';

const {Search} =Input;

const DataSource =()=>{

  const [visible,setVisible] = useState(false);
  const [document,setDocument] = useState<Array<IDocument>>([])

  const onSearch =()=>{

  }

  useEffect(()=>{
    onQueryDocumentList();
  })

  const onQueryDocumentList = ()=>{
    queryPrivateDocumentList({
      "creator":{
        "id":window.user.id
      }
    }).then((res:any)=>{
      setDocument(res.result)
    })
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

  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
      <div>
        {
            document.map((item:any)=>{
              return <Adocument document={item} key={item.id}/>
            })
        }
      </div>
      
      <Form>
        <Form.Item>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件夹到此处上传</p>
              <p className="ant-upload-hint">(限pdf, txt, word, ppt, jpg, png图纸格式)</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
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

export default DataSource;