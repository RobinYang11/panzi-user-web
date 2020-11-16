import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Rate, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { addRecord, deleteRecord, queryRecord, updateRecordQuestion } from '../../api/api';
import './Record.less'
const {Search} = Input

interface RecordDocumentProps{
  record:IRecordDocument,
  onQueryRecord:()=>void;
}

export default(props:RecordDocumentProps)=>{
   
  const {record} = props;

  const [form] = useForm();
  const [reacordVisible,setRecordVisible] = useState(false);
  const [tags,setTags] = useState<Array<any>>([]);
  const [fileList,setFileList] = useState<Array<any>>([])
  const [recordDetails,setRecordDetails] =useState<Array<IRecordDocument>>();
  const [imgs,setImage] =useState<Array<any>>([])
  const [rate,setRate] = useState(0);

  const[comments,setComments] =useState<Array<IRecordCommentDocument>>([]);

  useEffect(()=>{
    onQueryRecord();
  },[])

  const onChangeRate =(value:number)=>{
    setRate(value);
  }

  // 删除一条记录
  function confirm(id:number) {
      message.info('已成功删除');
      deleteRecord({id}).then((res)=>{
      props.onQueryRecord();
    })
  }

  const handleCancel = ()=>{
    setRecordVisible(false);
  }

  const handleChange =(value:any)=>{
    // console.log(value);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  // 修改记录
  const onFinish =(data:any)=>{
    updateRecordQuestion({
      "id":record.id,
      "tags":tags,
      "imgs":imgs,
      ...data
     }).then((res)=>{
      setRecordVisible(false);
      // onQueryRecord();
      props.onQueryRecord();
    })
  }

  const onQueryRecord =()=>{
    queryRecord({recordProjectId:3}).then((res:any)=>{
      setRecordDetails(res.result);
    })
  }

  const onAddTag =(value:any)=>{
    tags.push(value);
    setTags([...tags]);
  }

  const showRecordModal =()=>{
    setRecordVisible(true);
    setTags(record.tags);
    form.setFieldsValue({
      id:record.id,
      description:record.description,
      level:2,
      imgs:imgs,
      tags:tags
    });
  }

  return (
    <>
    <div>
       <div className="projectDetailNav">
        <div className="creatTime">{ moment(parseInt(record.tmCreate)).format("YYYY:MM:DD hh:ss:mm")}</div>
        {/* moment(projectDetail.tmCreate).format("YYYY:MM:DD hh:ss:mm") */}
        <ul className="favorableComments">
          <Rate count={3} value={record.level}/>
        </ul>
      </div>
      <div className="content">
        {record.description}
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
              return  <span className="tags">{i}</span>
            })
          }
        </ul>
        <div className="operation">
          <Button type="link" onClick={showRecordModal}>编辑</Button>
          <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>confirm(record.id)} okText="Yes" cancelText="No">
            <Button type="link">删除</Button>
          </Popconfirm>
        </div>
      </div>
      <p className="solid"></p>
    </div>
    <div>
      {
        // comments.map(item=>{
        //   return <Comment Comment={item} />
        // })
      }
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