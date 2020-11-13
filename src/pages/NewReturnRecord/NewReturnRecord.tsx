import React from 'react';
import Upload from 'antd/lib/upload';
import { Form, Input, Button, Rate } from 'antd';
import './NewReturnRecord.less'

const {TextArea} = Input;

export default ()=>{

  const onFinish =(value:any)=>{
    console.log(value)
  }

  return (
    <div>
      <div className="recordHeader">
        <h3>新建巡场记录</h3>
      </div>
      <p>项目:保利一期</p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <p>问题图片</p>
        <Form.Item
          name="问题图片"
          rules={[{ required: true, message: '请上传图片' }]}
        >
           <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              <img src="" alt=""/>
            </Upload>
        </Form.Item>
        <p>问题描述</p>
        <Form.Item
          name="password"
          rules={[{ required: true,message: '请描述具体问题'}]}
        >
            <TextArea rows={4} placeholder="请描述下具体问题并提交建议" />
        </Form.Item>
         <p>标签</p>
        <Form.Item
          name="password"
        >
          <Button>#301室</Button>
          <Button>#A户型</Button>
          <Button>#B户型</Button>
          <TextArea rows={4} placeholder="请描述下具体问题并提交建议"  />
        </Form.Item>
        <p>严重程度</p>
        <Form.Item
          name="serious"
        >
           <Rate count={3} className="rate"/>
           <Rate count={3} className="rate"/>
           <Rate count={3} className="rate"/>
        </Form.Item>
        <Form.Item
          name="serious"
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