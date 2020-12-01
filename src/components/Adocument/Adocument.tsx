import { Col, Dropdown, Form, Input, message, Modal, Popconfirm } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { delDocument, updateDocument } from '../../api/api';

interface DocumentProps{
  document:IDocument
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:DocumentProps)=>{

  const {document} = props
  const [visible,setVisible] = useState(false);
  const [form] = Form.useForm();
  

  const showModal =()=>{
   setVisible(true);
   form.setFieldsValue({name:document.folderName});
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

   // 重命名
   const onSubmit =(data:any)=>{
    updateDocument({id:document.id,...data}).then(res=>{
      setVisible(false);
    })
  }

  // 删除
  function confirm(id:number,isDeleted:number) {
    message.info('已成功删除'); 
    delDocument({id:document.id}).then(res=>{
      console.log(res);
    })
  }

  return(
    <>
      <Col className="gutter-row" span={4}>
        <Dropdown
          trigger={['contextMenu']}
          overlay={
              <ul className="rightModal">
                <li onClick={showModal}>重命名</li>
                <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>{
                  confirm(document.id,2); 
                 }
                  }
                   okText="Yes" cancelText="No">
                  <li>删除</li>
                </Popconfirm>
              </ul>
          }
         >
          <li className="recordLi">
            <p>{document.folderName}</p>
          </li>
        </Dropdown>
       </Col>

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
    </>
  ) 

}