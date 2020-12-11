import React, { ReactNode, useEffect, useState } from 'react';
import{Input,Modal, Button ,Form, Dropdown, Row, Col, Upload} from 'antd';
import './ReturnRecord.less'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReturnProject from '../../components/ReturnProject/ReturnProject';
import { addRecordProject, queryRecordProject } from '../../api/api';
import ProjectDetail from '../../components/Record/Record';
import { useForm } from 'antd/lib/form/Form';

const {Search} = Input;

const ReturnRecord = (props:any) =>{

  const [form] = useForm();
  const [visible,setVisible] = useState(false);
  const [projects,setProjects] = useState<Array<IRecordProject>>([]);
  const [name,setName] = useState('');
  const [toggle,setToggle] = useState('');
  const [loading,setLoading] = useState(false)
  const [imageUrl,setImageUrl]=useState<Array<string>>([]);

  useEffect(()=>{
    onQueryRecordProject();
    console.log(window.user.id)
  },[])
  
  const onQueryRecordProject = ()=>{
    queryRecordProject({
      "creator":{
        "id":2
      },
      "isDefaultLogo":2
    }).then((res:any)=>{
      console.log(res);
      setProjects(res.result);
    })
  }

  const onSubmit =(data:any)=>{
    debugger
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

  // 上传照片
  const handleChange =(value:any)=>{  
    console.log(value)
    if(value.file.status==="done"){
      imageUrl.push(value.file.response.result);
      setImageUrl([...imageUrl]);
		}
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return(
    <>
      <div className="record">
        <div className="recordSearch">
          <Search
          placeholder="搜索" 
          value={name}  
          onChange={(e:any)=>{
            setName(e.target.value)
          }}
          onSearch={onSearch}
          enterButton />
        </div>
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <div className="recordModal">
                  <div className="recordAdd">
                    <div className="addIcon">
                      <PlusOutlined  onClick={showModal} className="icon"/>
                    </div>
                    <p>新建项目</p>
                  </div>
                </div>
            </Col>
             {
               projects?.map(i=>{
                return <ReturnProject project={i} key={i.id} onQueryRecordProject={onQueryRecordProject} imageUrl={imageUrl} />
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
            name="logo"
          >
            <div style={{textAlign:"center",marginBottom:"10px"}}>
              <Upload
                action="/api/upload"
                listType="picture-card"
                showUploadList={false}
                onChange={handleChange}
              >
               {imageUrl ? imageUrl.map((item:any)=>{
                 debugger
                 return <img src={item} alt="avatar" style={{ width: '100%' }} />
               }) : uploadButton}
              </Upload>
            </div>
          </Form.Item>
          <Form.Item
            label="项目名称"
            name="name"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input type="text"/>
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