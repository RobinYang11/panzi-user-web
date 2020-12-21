import React, { ReactNode, useEffect, useState } from 'react';
import { Input, Modal, Button, Form, Dropdown, Row, Col, Upload } from 'antd';
import './ReturnRecord.less'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ReturnProject from '../../components/ReturnProject/ReturnProject';
import { addRecordProject, queryRecordProject } from '../../api/api';
import { useForm } from 'antd/lib/form/Form';
import search from '../../assets/search.png'

const { Search } = Input;

const ReturnRecord = (props: any) => {

  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState<Array<IRecordProject>>([]);
  const [name, setName] = useState('');
  const [toggle, setToggle] = useState('');
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    onQueryRecordProject();
    console.log(window.user.id)
  }, [])

  // 查询项目
  const onQueryRecordProject = () => {
    queryRecordProject({
      "creator": {
        "id": 2
      },
      "isDefaultLogo": 2
    }).then((res: any) => {
      setProjects(res.result);
    })
  }

  // 添加项目
  const onSubmit = (data: any) => {
    addRecordProject({
      logo: imageUrl,
      ...data
    }).then(res => {
      setVisible(false);
      onQueryRecordProject();
      form.resetFields();
    })
  }

  const onSearch = (e: any) => {
    setName(e.target.value);
    queryRecordProject({
      name: e.target.value,
      "creator": {
        "id": window.user.id
      }
    }).then((res: any) => {
      console.log(res);
      setProjects(res.result);
    })
  }

  const showModal = () => {
    setVisible(true);
    setToggle("添加项目")
  }

  const handleCancel = () => {
    setVisible(false);
  }

  // 上传照片
  const handleChange = (value: any) => {
    console.log(value)
    if (value.file.status === "done") {
      setImageUrl(value.file.response.result);
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="Record">
      <div className="record">
        <div className="recordSearch">
          <input
            value={name}
            onChange={(e: any) => {
              setName(e.target.value)
            }}
            onInput={onSearch}
            style={{ width: "500px", height: "32px" }}
          />
          <img src={search} alt="" />
        </div>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div className="recordModal">
              <div className="recordAdd">
                <div className="addIcon">
                  <PlusOutlined onClick={showModal} className="icon" />
                </div>
                <p>新建项目</p>
              </div>
            </div>
          </Col>
          {
            projects?.map(i => {
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
        className="addProject"
      >
        <Form
          onFinish={onSubmit}
          form={form}
        >
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <Upload
              action="/api/upload"
              listType="picture-card"
              showUploadList={false}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                : uploadButton}
            </Upload>
          </div>
          <Form.Item
            name="name"
          // rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <input
              type="text"
              placeholder="请输入项目名称"
              style={{
                width: "333px",
                outline: "none",
                border: 0,
                borderBottom: "2px solid #eeee"
              }}
            />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleCancel}
              style={{
                width: "94px", 
                height: "39px", 
                background: "#F7F8F9", 
                borderRadius: "8px", 
                outline: "none", 
                color: "#777777", 
                marginRight: 50,
                border: "1px solid #AAAAAA"
              }}>取消</button>
            <button type="submit" className="sure" style={{ width: "94px", height: "39px", background: "#FFB81F", borderRadius: "8px", outline: "none", border: "0px", color: "#FFFFFF" }}>
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
export default ReturnRecord;