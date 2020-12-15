import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Form, Upload, Row, message, Col, PageHeader } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './Design.less';
import { addDesignFolder, queryDesign, queryDesignList, uploadFile } from '../../api/api';
import Folder from '../../components/DesignFolder/DesignFolder';
import SecondaryDirectoryDesign from '../../components/SecondaryDirectoryDesign/SecondaryDirectoryDesign';

const {Search} =Input;


const Design =()=>{

  const [visible,setVisible] = useState(false);
  const [design,setDesign] =useState<Array<IDesign>>([]);
  const [folder,setFolder] = useState(0);
  const [name,setName] = useState("");
  const [children,setChildrens] = useState<Array<IDocument>>([]);

  useEffect(()=>{
    onQueryDesignList();
  },[])

  const onQueryDesignList = ()=>{
    queryDesignList({
      "creator":112
    }).then((res:any)=>{
      setDesign(res.result)
    })
  }

  const onSearch =()=>{
    queryDesignList({
      name:name
    }).then((res:any)=>{
      setDesign(res.result)
    })
  }

  // 添加文件夹
  const onAddDeign = (data:any)=>{
    addDesignFolder({
      creator:112,
      type: "folder",
      ...data
    }).then(res=>{
      setVisible(false);
      onQueryDesignList();
    })
  }

  const showModal = () =>{
    setVisible(true);
  }

  const handleCancel =()=>{
    setVisible(false);
  }

  // 记录folder的id 根据click事件setFolder去查询 文件夹相应的文件
  const onQueryDesign =(value:any,param:any)=>{
    setFolder(value);
    setChildrens(param);
  }

  return (
    <div className="Design">
      <PageHeader title="图纸管理"></PageHeader>
      <Row>
        <Col span={12}>
          <div className="DesignFolder">
            <div className="DesignHeader">
              <div className="btn">
                <button onClick={showModal} >
                  <span>新建文件夹</span>
                </button>
              </div>
              <div className="search">
                <Search 
                placeholder="搜索" 
                value={name}
                onChange={(e:any)=>{
                  setName(e.target.value);
                }}
                onSearch={onSearch}
                style={{ width: 200,textAlign:"right"}}/>
              </div>
            </div>
            <Row>
              {
                design?.map(item=>{
                  return <Col span={6} onClick={()=>{onQueryDesign(item.id,item.children)}}>
                      <Folder Design={item} onQueryDesignList={onQueryDesignList} key={item.id}/>
                  </Col>
                })
              }
            </Row>
          </div>
        </Col>
        <Col span={12} style={{padding:"0 10px"}}>
           <SecondaryDirectoryDesign id={folder} fileList={children} onQueryDesignList={onQueryDesignList}/>
        </Col>
      </Row>
     
      <Modal
        title="新建项目"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={onAddDeign}
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
export default Design;