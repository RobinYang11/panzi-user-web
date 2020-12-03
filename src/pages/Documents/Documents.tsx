import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal, Form, Upload, Row, PageHeader, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { addDocumentFolder, queryDocument, queryPrivateDocumentList } from '../../api/api';
import Adocument from '../../components/AdocumentFolder/AdocumentFolder';
import './Document.less';
import SecondaryDirectoryDesign from '../../components/SecondaryDirectoryDesign/SecondaryDirectoryDesign';
import DocumentFolder from '../../components/SecondaryDirectoryDocument/SecondaryDirectoryDocument';

const {Search} =Input;

const DataSource =()=>{

  const [visible,setVisible] = useState(false);
  const [document,setDocument] = useState<Array<IDocument>>([])
  const [name,setName] = useState("")
  const [folder,setFolder] = useState(0);

  const onSearch =()=>{
    queryPrivateDocumentList({
      name:name
    }).then((res:any)=>{
      setDocument(res.result)
    })
  }

  useEffect(()=>{
    onQueryDocumentList();
  },[])

  const onQueryDocumentList = ()=>{
    queryPrivateDocumentList({
      "creator":112
    }).then((res:any)=>{
      setDocument(res.result)
    })
  }

  const onQueryDocumentFolder =(value:any)=>{
    setFolder(value);
    queryDocument({
      
    }).then(res=>{

    })
  }

  const showModal = () =>{
    setVisible(true);
  }

  const handleCancel =()=>{
    setVisible(false);
  }

  const onAddDocument =(data:any)=>{
    console.log(data);
    addDocumentFolder({
      creator: 112,
      type: "folder",
      ...data
    }).then(res=>{
     setVisible(false);
     onQueryDocumentList();
    })
  }

  return (
    <div className="document">
      <PageHeader title="文档管理"/>
      <Row>
        <Col span={12}>
          <div style={{padding:"0 10px"}}>
          <div className="documentHeader">
            <div className="btn">
              <Button onClick={showModal}>新建文件夹</Button>
            </div>
            <div className="search">
              <Search 
              placeholder="搜索"
              onSearch={onSearch}
              value={name}
              onChange={(e:any)=>{
                setName(e.target.value);
              }}
              style={{ width: 200,textAlign:"right"}} />
            </div>
          </div>
          <Row>
            {
                document?.map((item:any)=>{
                  return <Col span={6} onClick={()=>{onQueryDocumentFolder(item.id)}}>
                    <Adocument document={item} key={item.id} onQueryDocumentList={onQueryDocumentList} />
                  </Col>
                })
            }
          </Row>
         </div>
        </Col>
        <Col span={12}>
          <DocumentFolder id={folder} />
        </Col>
      </Row>

      <Modal
        title="新建项目"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={onAddDocument}
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input />
          </Form.Item>
          <div style={{textAlign:"right"}}>
            <button type="submit" onClick={handleCancel} style={{marginRight:"10px"}}>
              取消
            </button>
            <button type="submit">
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default DataSource;