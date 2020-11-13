import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import avator from '../../assets/touxiang.jpg';
import { Button, Rate, Modal, Form, Radio,DatePicker, Popover, Input, Popconfirm, message } from 'antd';
import './ProjectDetails.less';

const { RangePicker } = DatePicker;
const {Search} = Input;

export default (props:any) =>{
  // 获取路由动态参数
  console.log(props.match.params)

  const [visible,setVisible] = useState(false);

  const handleCancel =()=>{
    setVisible(false);
  }

  const showModal = () =>{
    setVisible(true);
  }

  const onSearch =(e:any)=>{
    console.log(e)
  }

  const content = (
    <div>
      <p>创建时间最近</p>
      <p>追评时间最近</p>
      <p>严重程度最近</p>
    </div>
  );

  function confirm() {
    message.info('已成功删除');
  }

  return(
    <>
    <div className="projectDetail">
      <div className="projectDetailHeader">
        <ul className="projectDetailLeft">
            <li>
              <a href={"#/test5"}>
                <Button>新建</Button>
              </a>
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
          <li >
            <FilterOutlined onClick={showModal} />
          </li>
        </ul>
      </div>
      <div className="projectDetailNav">
        <div className="creatTime">2020-11-12 9:30</div>
        <ul className="favorableComments">
          <Rate count={3}/>
        </ul>
      </div>
      <div className="content">
        今天是个好日子 新乡是的事儿总能城 开发库拉进来倒垃圾速度快放假卡兰蒂斯交罚款发顺丰发顺丰按时发生
      </div>
      <ul className="projectImg">
        <li>
          <img src={avator} alt=""/>
        </li>
        <li>
          <img src={avator} alt=""/>
        </li>
        <li>
          <img src={avator} alt=""/>
        </li>
        <li>
          <img src={avator} alt=""/>
        </li>
        <li>
          <img src={avator} alt=""/>
        </li>
      </ul>
      <div className="projectBottom">
        <ul className="buildingInformation">
          <li>
            <span>#301房间</span>
          </li>
          <li>
            <span>#A户型</span>
          </li>
        </ul>
        <div className="operation">
          <a href={"#/test5"}>
           <Button type="link">编辑</Button>
          </a>
            <Popconfirm placement="top" title="是否确认删除" onConfirm={confirm} okText="Yes" cancelText="No">
              <Button type="link">删除</Button>
            </Popconfirm>
        </div>
      </div>
      <p className="solid"></p>
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
    </>
  )
}
