import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Popconfirm, Rate, Tag, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {addRecordComment, deleteRecord, queryRecord, queryRecordComment, updateRecordQuestion } from '../../api/api';
import './Record.less';
import Comment from '../Comment/Comment';
const {Search} = Input

interface RecordDocumentProps{
  record:IRecordDocument,
  onQueryRecord:()=>void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default(props:RecordDocumentProps)=>{
   
  const {record} = props;

  const [form] = useForm();
  const [reacordVisible,setRecordVisible] = useState(false);
  const [tags,setTags] = useState<Array<any>>([]);
  const [fileList] = useState<Array<any>>([])
  const [,setRecordDetails] =useState<Array<IRecordDocument>>();
  const [imgs] =useState<Array<any>>([])
  const [rate,setRate] = useState(0);
  const [comments,setComments]= useState<Array<IRecordCommentDocument>>();
  const [description,setDescription] = useState('');

  const id = record.id;

  useEffect(()=>{
    onQueryRecord();
    onQueryRecordComment();
  },[])

  const onChangeRate =(value:number)=>{
    setRate(value);
  }

  const onQueryRecordComment =()=>{
    queryRecordComment({recordId:record.id}).then((res:any)=>{
      setComments(res.result);
    })
  }

  // 删除一条记录
  function confirm(id:number) {
      message.info('已成功删除');
      deleteRecord({id}).then(()=>{
      props.onQueryRecord();
    })
  }

  const handleCancel = ()=>{
    setRecordVisible(false);
  }

  const handleChange =()=>{
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
     }).then(()=>{
      setRecordVisible(false);
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
      level:record.level,
      imgs:record.imgs,
      tags:record.tags
    });
  }

  // 添加评论
  const onAddRecordComment =(value:any)=>{
    console.log(value);
    addRecordComment({
      recordId:record.id,
      // imgs:comment.imgs,
      description:description,
    }).then(res=>{
      console.log(res);
      setDescription(value);
      onQueryRecordComment();
    })
  }

  return (
    <>
    <div>
       <div className="projectDetailNav">
        <div className="creatTime">{ moment(parseInt(record.tmCreate)).format("YYYY:MM:DD hh:ss:mm")}</div>
        <ul className="favorableComments">
          <Rate count={3} value={record.level} style={{color:"red"}}/>
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
            record.tags.map(i=>{
              return <Tag>{i}</Tag> 
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
      <Search
        allowClear
        enterButton="添加评论"
        size="middle"
        value={description}
        onSearch={onAddRecordComment}
        onChange={(e:any)=>{
          setDescription(e.target.value);
        }}
        style={{
          margin:"10px 0"
        }}
      />
      <ul className="comment">
        <p>最新追评</p> 
        {
          comments?.map((item)=>{
            return <Comment comment={item} key={item.id} id={id} onQueryRecordComment={()=>{onQueryRecordComment()}}/>
          })
        }
      </ul>
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
            return <Tag>{item}</Tag>  
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
           <Rate count={3} onChange={onChangeRate} value={rate} style={{color:"red"}}/>
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