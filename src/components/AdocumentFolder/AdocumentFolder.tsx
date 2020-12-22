import { FolderOutlined } from '@ant-design/icons';
import { Col, Dropdown, Form, Input, message, Modal, Popconfirm } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { delDocument, updateDocument } from '../../api/api';
import documents from '../../assets/document.png';
import './AdocumentFolder.less';

interface DocumentProps{
  document:IDocument,
  onQueryDocumentList:()=>void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:DocumentProps)=>{

  const {document} = props
  const [visible,setVisible] = useState(false);
  const [form] = Form.useForm();
  

  const showModal =()=>{
   setVisible(true);
   form.setFieldsValue({name:document.name});
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

   // 重命名
   const onSubmit =(data:any)=>{
    updateDocument({id:document.id,...data}).then(res=>{
      setVisible(false);
      props.onQueryDocumentList()
    })
  }

  // 删除
  function confirm() {
    message.info('已成功删除'); 
    delDocument({id:document.id}).then(res=>{
      props.onQueryDocumentList()
      console.log(res);
    })
  }

  return(
    <div className="document">
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
          <li className="documentItem">
            <img src={documents} alt=""/>
            <p>{document.name }</p>
          </li>
        </Dropdown>

       <Modal
        title="项目重命名"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        className="documentResetModal"
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
            className="documentInput"
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