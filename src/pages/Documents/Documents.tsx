import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal, Form, Upload, Row, PageHeader, Col } from 'antd';
import { addDocumentFolder, queryDocument, queryPrivateDocumentList } from '../../api/api';
import Adocument from '../../components/AdocumentFolder/AdocumentFolder';
import './Document.less';
import DocumentFolder from '../../components/SecondaryDirectoryDocument/SecondaryDirectoryDocument';
import search from '../../assets/search.png'

// const {Search} =Input;

const DataSource = () => {

  const [visible, setVisible] = useState(false);
  const [document, setDocument] = useState<Array<IDocument>>([])
  const [name, setName] = useState("")
  const [folder, setFolder] = useState(0);
  const [children, setChildrens] = useState<Array<IDocument>>([]);

  const onSearch = (e:any) => {
    queryPrivateDocumentList({
      name: e.target.value
    }).then((res: any) => {
      setDocument(res.result)
    })
  }

  useEffect(() => {
    onQueryDocumentList();
  }, [])

  const onQueryDocumentList = () => {
    queryPrivateDocumentList({
      "creator": 112
    }).then((res: any) => {
      // debugger
      setDocument(res.result)
      // setChildrens(res.result.children); // [].children;
    })
  }

  const onQueryDocumentFolder = (value: any, param: any) => {
    setFolder(value);
    setChildrens(param);
  }

  const showModal = () => {
    setVisible(true);
  }

  const handleCancel = () => {
    setVisible(false);
  }

  const onAddDocument = (data: any) => {
    console.log(data);
    addDocumentFolder({
      creator: 112,
      type: "folder",
      ...data
    }).then(res => {
      setVisible(false);
      onQueryDocumentList();
    })
  }

  return (
    <div className="document">
      <PageHeader title="文档管理" />
      <Row>
        <Col span={12}>
          <div style={{ padding: "0 10px" }}>
            <Row className="documentHeader">
              <Col span={12} className="btn">
                <Button onClick={showModal}>新建文件夹</Button>
              </Col>
              <Col span={12} className="search">
                <input
                  placeholder="搜索"
                  onInput={onSearch}
                  value={name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                />
                <img src={search} alt=""/>
              </Col>
            </Row>
            <Row>
              {
                document?.map((item: any) => {
                  return <Col
                    span={6} onClick={() => {
                      onQueryDocumentFolder(item.id, item.children)
                    }}
                  >
                    <Adocument document={item} key={item.id} onQueryDocumentList={onQueryDocumentList} />
                  </Col>
                })
              }
            </Row>
          </div>
        </Col>
        <Col span={12} style={{ padding: "0 10px" }}>
          <DocumentFolder id={folder} fileList={children} />
        </Col>
      </Row>

      <Modal
        title="新建文件夹"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        className="documentModal"
      >
        <Form
          onFinish={onAddDocument}
        >
          <Form.Item
            name="name"
          >
            <input 
            placeholder="文件夹标题"
            className="documentInput"
            />
          </Form.Item>
          <div className="btns">
            <button onClick={handleCancel} 
              className="cancelbtn"
            >取消</button>
            <button
            type="submit" 
            className="okBtn"
             >
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default DataSource;