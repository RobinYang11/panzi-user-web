import React, { useState } from 'react';
import { Dropdown, Form, Input, Modal, Popconfirm, message, Col, Upload} from 'antd';
import './ReturnProject.less'
import { queryRecordProject, updateRecordProject } from '../../api/api';

interface IReturnProps{
  project:IRecordProject;
  onQueryRecordProject:()=>void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:IReturnProps)=>{
  const [form] = Form.useForm();
  const { project } = props;

  const [visible,setVisible] = useState(false);

  // 重命名
  const onSubmit =(data:any)=>{
    updateRecordProject({id:project.id,...data}).then(res=>{
      console.log(res)
      setVisible(false);
      props.onQueryRecordProject();
    })
  }

  // 删除
  function confirm(id:number,isDeleted:number) {
    message.info('已成功删除'); 
    updateRecordProject({id,isDeleted}).then(res=>{
      props.onQueryRecordProject();
    })
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

  const showModal =()=>{
    setVisible(true);
    form.setFieldsValue({name:project.name});
  }
  
  const handleChange =(value:any)=>{
    if(value.file.status==="done"){
      
		}
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
                  confirm(project.id,2); 
                 }
                  }
                   okText="Yes" cancelText="No">
                  <li>删除</li>
                </Popconfirm>
              </ul>
          }
         >
          <li className="recordLi">
            <a href={`#/test4/${project.id}`}>
              <img src=""/>
            </a>
            <p>{project.name}</p>
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
          <div style={{textAlign:"center",marginBottom:"10px"}}>
            <Upload
              action="/api/upload"
              listType="picture-card"
              showUploadList={false}
              onChange={handleChange}
            >
              上传封面
            </Upload>
          </div>
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