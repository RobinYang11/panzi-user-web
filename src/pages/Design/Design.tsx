import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './Design.less';
import { addDesignFolder, queryDesign, queryDesignList } from '../../api/api';

const {Search} =Input;


const Drawing =(props:any)=>{


  const [visible,setVisible] = useState(false);
  const [design,setDesign] =useState<Array<IDesign>>([]);
  const [folderName,setFolderName] = useState("");
  const [id,setId] =useState(0);

  useEffect(()=>{
    onQueryDesignList();
  },[])

  const onQueryDesignList = ()=>{
    queryDesignList({
      "creator":{
        "id":window.user.id
      }
    }).then((res:any)=>{
      setDesign(res.result)
    })
  }

  const onSearch =(value:any)=>{
    queryDesign({
      id
    }).then((res:any)=>{
      setId(value);
    })
  }

  // 添加图纸
  const onAddDeign = (data:any)=>{
    addDesignFolder({
      "creator":{
        "id":window.user.id
      },
      "type": "folder",
      ...data
    }).then(res=>{
       setVisible(false);
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
    <div className="Design">
      <div className="DesignHeader">
        <div className="btn">
          <Button onClick={showModal}>新建文件夹</Button>
        </div>
        <div className="search">
          <Search 
          placeholder="搜索" 
          value={id}
          onChange={(e:any)=>{
            setId(e.target.value);
          }}
          onSearch={onSearch}
          style={{ width: 200,textAlign:"right"}}/>
        </div>
      </div>
      <div>
        {
          design?.map(item=>{
            return <div>foater</div>
          })
        }
      </div>

      <Form
      >
        <Form.Item>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件夹到此处上传</p>
              <p className="ant-upload-hint">(限CAD图纸格式)</p>
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

export default Drawing;