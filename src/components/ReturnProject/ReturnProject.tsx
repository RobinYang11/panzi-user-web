import React, { useState } from 'react';
import { Dropdown, Form, Input, Modal, Popconfirm, message, Col} from 'antd';
import './ReturnProject.less'
import { Link } from 'react-router-dom';
import { queryRecordProject, updateRecordProject } from '../../api/api';

interface IReturnProps{
  project:IRecordProject;
}

export default (props:IReturnProps)=>{
  const [form] = Form.useForm();
  const { project } = props;
  const [projects,setProjects] = useState<Array<IRecordProject>>([]);
  const [visible,setVisible] = useState(false);

  const onUpdateName = (id:number,name:string) =>{
    updateRecordProject({id,name}).then(res=>{
      console.log(res)
    })
  }

  const onSubmit =()=>{
    onUpdateRecordProject(project.id,project.name)
  }

  const onUpdateRecordProject =(id:number,name:string)=>{
    updateRecordProject({id,name}).then(res=>{
      console.log(res)
    })
  }

  function confirm(id:number,isDelet:number) {
    message.info('已成功删除'); 
      updateRecordProject({id,isDelet}).then(res=>{
        console.log(res);
        onQueryRecordProject();
      })
  }

  const onQueryRecordProject = ()=>{
    queryRecordProject({
      "creator":{
        "id":window.user.id
      }
    }).then((res:any)=>{
      console.log(res);
      setProjects(res.result);
    })
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

  const showModal =()=>{
    setVisible(true);
  }

  const onSetFaileValue =(data:any)=>{
    form.setFieldsValue(data);
  }
  
  return(
    <>
      <Col className="gutter-row" span={4}>
        <Dropdown
          trigger={['contextMenu']}
          overlay={
              <ul className="rightModal">
                <li onClick={showModal}>重命名</li>
                <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>confirm(project.id,2)} okText="Yes" cancelText="No">
                  <li>删除</li>
                </Popconfirm>
              </ul>
          }
         >
          <li className="recordLi">
            <a href={`#/test4/${project.id}`}>
              <img src={project.logo}/>
            </a>
            <p>{project.name}</p>
          </li>
        </Dropdown>
       </Col>
       <Modal
        title="新建项目"
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