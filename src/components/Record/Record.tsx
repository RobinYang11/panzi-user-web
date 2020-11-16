import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Rate, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { addRecord, deleteRecord, queryRecord } from '../../api/api';
const {Search} = Input

interface RecordDocumentProps{
  projectDetail:IRecordDocument
}

export default(props:RecordDocumentProps)=>{
   
  const {projectDetail} = props;
  const [form] = useForm();
  const [reacordVisible,setRecordVisible] = useState(false);
  const [tags,setTags] = useState<Array<any>>([]);
  const [fileList,setFileList] = useState<Array<any>>([])
  const [recordDetails,setRecordDetails] =useState<Array<IRecordDocument>>();
  const [imgs,setImage] =useState<Array<any>>([])
  const [rate,setRate] = useState(0);


  useEffect(()=>{
    queryRecord({recordProjectId:3}).then((res:any)=>{
      console.log(res);
    })
  },[])

  const onChangeRate =(value:number)=>{
    setRate(value);
  }

  function confirm(id:number) {
       message.info('已成功删除');
      deleteRecord({id}).then((res)=>{

    })
  }

  const handleCancel = ()=>{
    setRecordVisible(false);
  }

  const handleChange =(value:any)=>{
    console.log(value);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  const onFinish =(data:any)=>{
    console.log(data);
    addRecord({
      "recordProjectId":3,
      "tags":tags,
      "isStandard":2,
      ...data,
    }).then((res)=>{
      console.log(res)
      setRecordVisible(false);
      onQueryRecord();
    })
  }

  const onQueryRecord =()=>{
    queryRecord({recordProjectId:3}).then((res:any)=>{
      console.log(res);
      setRecordDetails(res.result);
    })
  }

  const onAddTag =(value:any)=>{
    tags.push(value);
    setTags([...tags]);
  }

  const showRecordModal =(data:any)=>{
    setRecordVisible(true);
    form.setFieldsValue(data);
  }

  return (
    <>
    <div>
       <div className="projectDetailNav">
        <div className="creatTime">{projectDetail.tmCreate}</div>
        {/* moment(projectDetail.tmCreate).format("YYYY:MM:DD hh:ss:mm") */}
        <ul className="favorableComments">
          <Rate count={3}/>
        </ul>
      </div>
      <div className="content">
        {projectDetail.description}
      </div>
      <ul className="projectImg">
        {
          imgs.map(i=>{
            return <li> <img src={i} alt=""/> </li>
          })
        }
      </ul>
      <div className="projectBottom">
        <ul className="buildingInformation">
          {
            tags.map(i=>{
              return  <li><span>{projectDetail.tags}</span> </li>
            })
          }
        </ul>
        <div className="operation">
          <Button type="link" onClick={showRecordModal}>编辑</Button>
          <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>confirm(projectDetail.id)} okText="Yes" cancelText="No">
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      </div>
      <p className="solid"></p>
    </div>


    <Modal
      visible={reacordVisible}
      onCancel={handleCancel}
      footer={null}
      className="RecordModal"
    >
      <div className="recordHeader">
        <h3>新建巡场记录</h3>
      </div>
      <p>项目:保利一期</p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Upload
          action="http://2081uw5545.iask.in:46203/api/uploadFile"
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <p>问题描述</p>
        <Form.Item
          name="description"
          rules={[{ required: true,message: '请描述具体问题'}]}
        >
            <TextArea rows={4} placeholder="请描述下具体问题并提交建议" />
        </Form.Item>
         <p className="tag">标签</p>
        {
          tags.map(item=>{
            return <span className="tags">{item}</span>
          })
        }
          <Search
            className="search"
            placeholder="添加标签"
            enterButton="添加标签"
            size="middle"
            onSearch={onAddTag} 
         />
        <p>严重程度</p>
        <Form.Item
          name="level"
        >
           <Rate count={3} onChange={onChangeRate} value={rate}/>
        </Form.Item>
        <Form.Item
          className="submit"
        >
          <Button htmlType="reset" onClick={handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit" className="sure">
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
  )
}