import { FilterOutlined,  PlusOutlined, SortAscendingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Radio,DatePicker, Popover, Input, Rate, Upload } from 'antd';
import './ProjectDetails.less';
import Record from '../../components/Record/Record';
import { addRecord, queryRecord } from '../../api/api';
import TextArea from 'antd/lib/input/TextArea';

const { RangePicker } = DatePicker;
const {Search} = Input;


export default (props:any) =>{
  // 获取路由动态参数
  console.log(props.match.params);
  const name ="rboin";

  const [visible,setVisible] = useState(false);
  const [recordDetails,setRecordDetails] =useState<Array<IRecordDocument>>();
  const [reacordVisible,setRecordVisible] = useState(false);
  const [rate,setRate] = useState(0);
  let [tags,setTags] = useState<Array<any>>([]);
  const [fileList,setFileList] = useState<Array<any>>([])
  const [comments,setComments]= useState<Array<IRecordCommentDocument>>([]);

  useEffect(()=>{
    onQueryRecord();
  },[])

  const onQueryRecord =()=>{
    queryRecord({recordProjectId:3}).then((res:any)=>{
      setRecordDetails(res.result);
    })
  }

  const handleCancel = ()=>{
    setVisible(false);
    setRecordVisible(false);
  }

  const showModal = () =>{
    setVisible(true);
  }

  const onSearch =(e:any)=>{
    console.log(e)
  }

  const showRecordModal =()=>{
    setRecordVisible(true)
  }

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

  const onChangeRate =(value:number)=>{
    setRate(value);
  }

  const onAddTag =(value:any)=>{
    tags.push(value);
    // setTags(tags); 这种事错误的，react 任务 tags 指向原来的那个tags，是同一个对象，没有变化，所以不重新渲染,
    setTags([...tags]);
  }

  const handleChange =(value:any)=>{
    console.log(value);
  }


  const content = (
    <div>
      <p>创建时间最近</p>
      <p>追评时间最近</p>
      <p>严重程度最近</p>
    </div>
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return(
    <>
    <div className="projectDetail">
      <div className="projectDetailHeader">
        <ul className="projectDetailLeft">
            <li>
               <Button onClick={showRecordModal}>新建</Button>
            </li>
            <li>
              <a href={"#/test6"}>
                <Button>导出</Button>
              </a>
            </li>
            <li>
              <a href="">
                <Button>数据分析</Button>
              </a>
            </li>
        </ul>
        <ul className="projectDetailRight">
          <li>
            <Search placeholder="搜索" onSearch={onSearch} style={{ width: 100 }} />
          </li>
          <li>
            <Popover placement="bottom" title="内容排序" content={content} trigger="click">
              <SortAscendingOutlined/>
            </Popover>
          </li>
          <li>
            <FilterOutlined onClick={showModal} />
          </li>
        </ul>
      </div>
      {
        recordDetails?.map(item=>{
          return <Record onQueryRecord={onQueryRecord} record={item} key={item.id}/>
        })
      }
    </div>

    <Modal
      title="筛选内容"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      className="modal"
      >
        <Form>
          <p>创建时间</p>
          <Form.Item
            name="createTime"
          >
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>今日</Radio>
              <Radio value={2}>一周内</Radio>
              <Radio value={3}>一个月内</Radio>
              <Radio value={4}>自定义</Radio>
              <RangePicker />
            </Radio.Group>
          </Form.Item>
          <p>严重程度</p>
          <Form.Item
            name="severity"
          >
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>一般</Radio>
              <Radio value={2}>重要</Radio>
              <Radio value={3}>严重</Radio>
            </Radio.Group>
          </Form.Item>
          <p>追评</p>
          <Form.Item
            name="review"
          >
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>有追评</Radio>
              <Radio value={2}>没有追评</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="exportTemplate"
            className="submit"
          >
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" htmlType="submit" className="sure">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
          onFinish={onFinish}
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
