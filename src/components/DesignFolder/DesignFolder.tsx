import { FolderOutlined } from '@ant-design/icons';
import { Col, Dropdown, Form, Input, message, Modal, Popconfirm } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { delDesign, updateDesign } from '../../api/api';
import './DesignFolder.less';
import document from '../../assets/document.png';

interface FolderProps{
  Design:IDesign,
  onQueryDesignList:()=>void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:FolderProps)=>{

  const {Design} = props
  const [visible,setVisible] = useState(false);
  const [form] = Form.useForm();
  

  const showModal =()=>{
   setVisible(true);
   form.setFieldsValue({name:Design.name});
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

   // 重命名
   const onSubmit =(data:any)=>{
    updateDesign({id:Design.id,...data}).then(res=>{
      setVisible(false);
      props.onQueryDesignList();
    })
  }

  // 删除
  function confirm() {
    message.info('已成功删除'); 
    delDesign({id:Design.id}).then(res=>{
      console.log(res);
      props.onQueryDesignList();
    })
  }

  return(
    <div className="design">
        <Dropdown
          trigger={['contextMenu']}
          overlay={
              <ul className="rightModal">
                <li onClick={showModal}>重命名</li>
                <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>{
                  confirm(); 
                 }
                  }
                   okText="Yes" cancelText="No">
                  <li>删除</li>
                </Popconfirm>
              </ul>
          }
         >
          <li className="designItem">
            <img src={document} alt=""/>
            <p >{Design.name}</p>
          </li>
        </Dropdown>

       <Modal
        title="项目重命名"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input  name="name" type="text"/>
          </Form.Item>
          <div style={{textAlign:"center"}}>
            <button onClick={handleCancel} style={{width:"94px",height:"39px",background: "#F7F8F9", borderRadius:"8px",outline:"none",border:"0px",color:"#777777",marginRight:50}}>取消</button>
            <button type="submit" className="sure" style={{width:"94px",height:"39px",background: "#FFB81F", borderRadius:"8px",outline:"none",border:"0px",color:"#FFFFFF"}}>
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  ) 

}