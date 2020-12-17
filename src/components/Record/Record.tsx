import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Popconfirm, Popover, Rate, Row, Tag, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { addRecordComment, deleteRecord, queryRecord, queryRecordComment, updateRecordQuestion } from '../../api/api';
import './Record.less';
import Comment from '../Comment/Comment';
import paizhao from '../../assets/拍照.png'
import shanchu from '../../assets/删 除 拷贝.png'
import bianji from '../../assets/编辑.png';

const { Search } = Input

interface RecordDocumentProps {
  record: IRecordDocument,
  onQueryRecord: () => void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: RecordDocumentProps) => {

  const { record } = props;
  // debugger
  const [form] = useForm();
  const [reacordVisible, setRecordVisible] = useState(false);
  const [tags, setTags] = useState<Array<any>>([]);
  const [recordDetails, setRecordDetails] = useState<Array<IRecordDocument>>();
  const [imgs, setImgs] = useState<Array<any>>([]);
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState<Array<IRecordCommentDocument>>();
  const [description, setDescription] = useState('');
  const id = record.id;
  const [commentImage, setCommentImage] = useState<Array<any>>([])

  useEffect(() => {
    onQueryRecord();
    onQueryRecordComment();
  }, [])

  const onChangeRate = (value: number) => {
    setRate(value);
  }

  const onQueryRecordComment = () => {
    queryRecordComment({ recordId: record.id }).then((res: any) => {
      setComments(res.result);
    })
  }

  // 删除一条记录
  function confirm(id: number) {
    message.info('已成功删除');
    deleteRecord({ id }).then(() => {
      props.onQueryRecord();
    })
  }

  const handleCancel = () => {
    setRecordVisible(false);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // 修改记录
  const onFinish = (data: any) => {
    updateRecordQuestion({
      "id": record.id,
      "tags": tags,
      "imgs": imgs,
      ...data
    }).then(() => {
      setRecordVisible(false);
      props.onQueryRecord();
    })
  }

  const onQueryRecord = () => {
    queryRecord({ recordProjectId: 3 }).then((res: any) => {
      setRecordDetails(res.result);
    })
  }

  const onAddTag = (value: any) => {
    tags.push(value);
    setTags([...tags]);
  }

  const handleChange = (value: any) => {
    if (value.file.status === "done") {
      imgs?.push(value.file.response.result);
      setImgs([...imgs]);
    }
  }

  const uploadImage = (value: any) => {
    if (value.file.status === "done") {
      commentImage?.push(value.file.response.result);
      setCommentImage([...commentImage]);
    }
  }

  const showRecordModal = () => {
    setRecordVisible(true);
    setTags(record?.tags);
    setImgs(record?.imgs);
    form.setFieldsValue({
      id: record?.id,
      description: record?.description,
      level: record?.level,
    });
  }

  // 添加评论
  const onAddRecordComment = (value: any) => {
    console.log(value);
    addRecordComment({
      recordId: record.id,
      description: description,
      imgs: commentImage
    }).then(res => {
      console.log(res);
      setCommentImage(commentImage);
      setDescription(value);
      onQueryRecordComment();
    })
  }

  const content = (value: any) => {
    return <div className="bigImage">
      <img src={value} alt="" style={{ cursor: "pointer" }} />
      <a href={value} target="_blank">点击查看原图</a>
    </div>
  }

  const suffix = (
    <Upload
      action="/api/upload"
      // listType="picture-card"
      showUploadList={false}
      onChange={uploadImage}
      id="upload"
    >
      <img src={paizhao} alt="" />
    </Upload>
  )

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <div className="projects">
        <div className="projectDetailNav">
          <div className="creatTime">{moment(parseInt(record.tmCreate)).format("YYYY:MM:DD hh:ss:mm")}</div>
          <ul className="favorableComments">
            <Rate count={3} value={record.level} />
          </ul>
        </div>
        <div className="content">
          {record.description}
        </div>
        <ul className="projectImg">
          {
            record.imgs?.map(item => {
              return (<Popover content={content(item)}>
                <img src={item} alt="图片" />
              </Popover>)
            })
          }
        </ul>
        <div className="projectBottom">
          <ul className="buildingInformation">
            {
              record.tags.map(i => {
                return <span style={{ marginLeft: "4px" }}>{"#" + i}</span>
              })
            }
          </ul>
          <div className="operation">
            <img src={bianji} alt="" onClick={showRecordModal} className="bianji" />
            <Popconfirm placement="top" title="是否确认删除" onConfirm={() => confirm(record.id)} okText="Yes" cancelText="No">
              <img src={shanchu} alt="" className="shanchu" />
            </Popconfirm>
          </div>
        </div>
        <p className="solid"></p>

        <ul className="comment">
          {
            comments?.map((item) => {
              return <Comment comment={item} key={item.id} id={id} onQueryRecordComment={() => { onQueryRecordComment() }} />
            })
          }
        </ul>
        <p className="queryAllComments" >查看全部评论</p>

        <Row className="submitComment">
          <Col span={24} style={{ position: "relative" }}>
            <Search
              allowClear
              enterButton="添加评论"
              size="middle"
              value={description}
              onSearch={onAddRecordComment}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
              suffix={suffix}
            />
          </Col>
        </Row>
      </div>

      <Modal
        visible={reacordVisible}
        onCancel={handleCancel}
        footer={null}
        className="RecordModal"
        width="1150px"
      >
        <div className="recordHeader">
          <h3 style={{fontSize:"22px"}}>编辑巡场记录</h3>
        </div>
        <Form
          {...layout}
          onFinish={onFinish}
          form={form}
        >
          <Row>
            <Col span={6}>
              <p style={{ textAlign: "right", paddingRight:"10px" }}>问题照片:</p>
            </Col>
            <Col span={18}>
              <ul style={{overflow:"hidden"}}>
                <li style={{float:"left"}}>
                  {imgs?.map(i => {
                    return <img src={i} style={{ width: "100px", marginRight: "10px" }} />
                  })}
                </li>
                <li style={{float:"left"}}>
                  <Upload
                    action="api/upload"
                    listType="picture-card"
                    showUploadList={false}
                    onChange={handleChange}
                  >
                    {uploadButton}
                  </Upload>
                </li>
              </ul>
            </Col>
          </Row>
          <Form.Item
            label="问题描述"
            name="description"
            rules={[{ required: true, message: '请描述具体问题' }]}
          >
            <TextArea rows={4} placeholder="请描述下具体问题并提交建议" />
          </Form.Item>
          <Row>
            <Col span={6}>
              <p style={{ textAlign: "right",  paddingRight:"10px" }} className="tag">标签:</p>
            </Col>
            <Col span={18}>
              <ul className="tags">
                {
                  tags.map(item => {
                    return <li className="tagsItme" onChange={onAddTag}>
                      <span className="tagsContent">{item}</span>
                    </li>
                  })
                }
              </ul>
            </Col>
          </Row>
          <Form.Item
            name="level"
            label="严重程度"
          >
            <Rate count={3} onChange={onChangeRate} value={rate} />
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