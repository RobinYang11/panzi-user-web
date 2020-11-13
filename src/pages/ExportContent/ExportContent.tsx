import React, { useState } from 'react';
import './ExportContent.less'
import { Form, Radio,DatePicker, Input, Button, Table, Divider} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

export default ()=>{

  const [data,setData] = useState([
    {
      key: '1',
      name: '金地集团模板1',
      img:"https://livewebbs2.msstatic.com/home_recommend_live_web_1605148453.jpg"
    },
    {
      key: '2',
      name: '金地集团模板2',
      img:"https://livewebbs2.msstatic.com/home_recommend_live_web_1605148453.jpg"
    },
    {
      key: '3',
      name: '金地集团模板3',
      img:"https://livewebbs2.msstatic.com/home_recommend_live_web_1605148453.jpg"
    },
  ]) 
  
  const columns = [
    {
      title: '盘子默认模板',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      render:()=>{ return <img src="https://livewebbs2.msstatic.com/home_recommend_live_web_1605148453.jpg" style={{width:100}}/>}
    },
  ];
  
  
  return (
    <div className="exportContent">
      <div className="exportHeader">
        <h3>导出内容</h3>
      </div>
      <Form>
        <p>创建时间</p>
        <Form.Item
          name="createTime"
          rules={[{ required: true, message: '请选择创建时间!' }]}
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
          rules={[{ required: true, message: '请选择严重程度!' }]}
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
          rules={[{ required: true, message: '请选择追评!' }]}
        >
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>有追评</Radio>
            <Radio value={2}>没有追评</Radio>
          </Radio.Group>
        </Form.Item>
        <p>导出邮箱</p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请填写邮箱地址!' }]}
        >
          <Input placeholder="请填写邮箱地址"/>
        </Form.Item>
        <p>导出文件格式</p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请导出文件格式' }]}
        >
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>word</Radio>
            <Radio value={2}>Excel</Radio>
            <Radio value={2}>PPT</Radio>
          </Radio.Group>
        </Form.Item>
        <div className="exportTemplate">
          <p className="exportLeft">导出模板</p>
          <div className="exportRight">
            <PlusCircleOutlined />
            <span>新增</span>
          </div>
        </div>
        <Form.Item
          name="exportTemplate"
          rules={[{ required: true, message: '请导出模板' }]}
        >
          <Table
            columns={columns}
            dataSource={data}
          />
        </Form.Item>
        <Form.Item
          name="exportTemplate"
          rules={[{ required: true, message: '请导出模板' }]}
          className="submit"
        >
          <Button htmlType="reset">取消</Button>
          <Button type="primary" htmlType="submit" className="sure">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}