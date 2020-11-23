import React, { ReactNode, useEffect, useState } from 'react';
import{Input,Modal, Button ,Form, Dropdown, Row, Col} from 'antd';
import './ReturnRecord.less'
import { PlusOutlined } from '@ant-design/icons';
import ReturnProject from '../../components/ReturnProject/ReturnProject';
import { addRecordProject, queryRecordProject, updateRecordProject } from '../../api/api';
import ProjectDetail from '../../components/Record/Record';
import { useForm } from 'antd/lib/form/Form';

const {Search} = Input;


const ReturnRecord = (props:any) =>{

  const [form] = useForm();
  const [visible,setVisible] = useState(false);
  const [projects,setProjects] = useState<Array<IRecordProject>>([]);
  const [name,setName] = useState('');
  const [toggle,setToggle] = useState('');

  useEffect(()=>{
    onQueryRecordProject();
    console.log(window.user.id)
  },[])
  
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

  const onSubmit =(data:any)=>{
      addRecordProject(data).then(res=>{
        setVisible(false);
        onQueryRecordProject();
        form.resetFields();
      })
  }

  const onSearch = (value:any) =>{ 
    setName(value);
    queryRecordProject({
      name,
      "creator":{
        "id":window.user.id
      }
    }).then((res:any)=>{
      console.log(res);
      setProjects(res.result);
    })
  }

  const showModal = () =>{
    setVisible(true);
    setToggle("添加项目")
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

  return(
    <>
      <div className="record">
        <div className="recordSearch">
          <Search
          placeholder="搜索" 
          value={name}  
          onChange={(e:any)=>{
            setName(e.target.value)
        }} onSearch={onSearch} enterButton />
        </div>
          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
                <div className="recordModal">
                  <div className="recordAdd">
                   <PlusOutlined  onClick={showModal} className="icon"/>
                  </div>
                  <p>新建项目</p>
                </div>
            </Col>
             {
               projects.map(i=>{
                return <ReturnProject project={i} key={i.id} onQueryRecordProject={onQueryRecordProject} />
               })
             }
          </Row>
      </div>
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
export default ReturnRecord;