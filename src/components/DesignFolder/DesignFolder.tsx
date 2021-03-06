import { Dropdown, Form, Input, message, Modal, Popconfirm } from 'antd';
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
        className="designModal"
      >
        <Form
          onFinish={onSubmit}
          form={form}
        >
          <Form.Item
            name="name"
          >
            <input
             type="text"
             className="input"
             />
          </Form.Item>
          <div className="btns">
            <button 
            onClick={handleCancel}  
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