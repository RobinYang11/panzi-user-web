import React, { useState } from 'react';
import { Dropdown, Form, Input, Modal, Popconfirm, message, Col, Upload } from 'antd';
import './ReturnProject.less'
import { queryRecordProject, updateRecordProject } from '../../api/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface IReturnProps {
  project: IRecordProject;
  onQueryRecordProject: () => void;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IReturnProps) => {
  const [form] = Form.useForm();
  const { project } = props;

  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 重命名
  const onSubmit = (data: any) => {
    updateRecordProject({
      id: project.id,
      logo: imageUrl,
      ...data
    }).then(res => {
      setVisible(false);
      props.onQueryRecordProject();
    })
  }

  // 删除
  function confirm(id: number, isDeleted: number) {
    message.info('已成功删除');
    updateRecordProject({ id, isDeleted }).then(res => {
      props.onQueryRecordProject();
    })
  }

  const handleCancel = () => {
    setVisible(false);
  }

  const showModal = () => {
    setVisible(true);
    form.setFieldsValue({ name: project.name });
    setImageUrl(project.logo);
  }

  const handleChange = (value: any) => {
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
    <>
      <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
        <Dropdown
          trigger={['contextMenu']}
          overlay={
            <ul className="rightModal">
              <li onClick={showModal}>重命名</li>
              <Popconfirm placement="top" title="是否确认删除" onConfirm={() => {
                confirm(project.id, 2);
              }
              }
                okText="Yes" cancelText="No">
                <li>删除</li>
              </Popconfirm>
            </ul>
          }
        >
          <li className="recordLi">
            <a href={`#/ProjectDetails/${project.id}`}>
              <img src={project.logo} alt="" />
              <p>{project.name}</p>
            </a>
          </li>
        </Dropdown>
      </Col>

      <Modal
        title="项目重命名"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
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
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <input
              type="text"
              style={{
                width: "333px",
                outline: "none",
                border: 0,
                borderBottom: "2px solid #eeee"
              }}
            />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <button onClick={handleCancel} style={{ width: "94px", height: "39px", background: "#F7F8F9", borderRadius: "8px", outline: "none", border: "0px", color: "#777777", marginRight: 50 }}>取消</button>
            <button type="submit" className="sure" style={{ width: "94px", height: "39px", background: "#FFB81F", borderRadius: "8px", outline: "none", border: "0px", color: "#FFFFFF" }}>
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </>
  )
}