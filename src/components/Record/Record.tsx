import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Popconfirm, Popover, Rate, Row, Tag, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { addRecordComment, deleteRecord, queryRecord, queryRecordComment, updateRecordQuestion } from '../../api/api';
import './Record.less';
import Comment from '../Comment/Comment';
import paizhao from '../../assets/拍照.png'
import shanchu from '../../assets/删 除 拷贝.png'
import bianji from '../../assets/编辑.png';
import Item from 'antd/lib/list/Item';

const { Search } = Input

interface RecordDocumentProps {
  record: IRecordDocument,
  onQueryRecord: () => void,
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
  const [comments, setComments] = useState<Array<IRecordCommentDocument>>([]);
  const [description, setDescription] = useState('');
  const id = record.id;
  const [commentImage, setCommentImage] = useState<Array<any>>([])
  const [commentShow, setCommentShow] = useState(false);


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

  // 添加图片
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
  
  // 通过ref获取 原生input的值
  const ref = useRef<any>()

  // 添加评论
  const onAddRecordComment = (e: any) => {

    // 判断ref的current
   if(ref.current) {
     console.log(ref.current.value)
    }
    addRecordComment({
      recordId: record.id,
      description: ref.current.value,
      imgs: commentImage
    }).then(res => {
      onQueryRecordComment();
    })
  }

  const content = (value: any) => {
    return <div className="bigImage">
      <img src={value} alt="" style={{ cursor: "pointer" }} />
      <a href={value} target="_blank">点击查看原图</a>
    </div>
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };


  return (
    <>
      <div className="projects">
        <Row>
          <Col 
          span={12}
          className="creatTime"
          style={{textAlign:"left"}}
          >
            {moment(parseInt(record.tmCreate)).format("YYYY:MM:DD hh:ss:mm")}
          </Col>
          <Col 
          span={12}
          style={{textAlign:"right"}}
          >
            <Rate count={3} value={record.level} />
          </Col>
        </Row>
        <div style={{marginBottom:"20px",fontSize:"18px"}}>
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
            <div>第一条评论</div>
          }
          <li className={commentShow === true ? " nextAllComments" : " nextAllComment"}>
            {
              comments?.map((item) => {
                return <Comment comment={item} key={item.id} id={id} onQueryRecordComment={() => { onQueryRecordComment() }} />
              })
            }
          </li>
        </ul>
        <p
          className="queryAllComments"
          onClick={() => {
            setCommentShow(true)
          }}
        >查看全部评论</p>

        <Row className="submitComment">
          <Col span={24} style={{ position: "relative" }}>
            <input
             ref={ref}
             placeholder="这是一个不错的问题,可以进行二次评审"
            />
            <div className="upload">
              {
                <Upload
                  action="/api/upload"
                  showUploadList={false}
                  onChange={uploadImage}
                  id="upload"
                >
                  <img src={paizhao} alt="" />
                </Upload>
              }
            </div>
            <button type="submit" onClick={onAddRecordComment}>
              <span>发表</span>
            </button>
            <Row>
              {
               commentImage?.map((itme:any,index:number)=>{
                return  <Col span={3} style={{position:"relative",margin:"10px"}}>
                  <img 
                  src={itme} 
                  alt="" 
                  style={{
                    width:"100px",
                    height:"100px",
                    margin:"5px",
                    borderRadius:"8px"
                    }}/>
                  <span
                  style={{
                    cursor:"pointer",
                    position:"absolute",
                    top:"-5px",
                    right:"-5px",
                  }}
                    onClick={()=>{
                      commentImage.splice(index,1);
                      setCommentImage([...commentImage])
                    }}>
                    <CloseCircleOutlined />
                  </span>
                </Col>
               })
              }
            </Row>
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
          <h3 style={{ fontSize: "22px" }}>编辑巡场记录</h3>
        </div>
        <Form
          {...layout}
          onFinish={onFinish}
          form={form}
        >
          <Row>
            <Col span={6}>
              <p style={{ textAlign: "right", paddingRight: "10px" }}>问题照片:</p>
            </Col>
            <Col span={18}>
              <ul style={{ overflow: "hidden" }}>
                <Row>
                  {imgs?.map((i:any,index:number )=> {
                    return <Col span={4} style={{position:"relative",margin:"5px"}}>
                         <img 
                          src={i}
                          style={{ 
                            width: "100px",
                            height:"100px",
                            margin: "10px",
                            borderRadius:"8px"
                            }}  alt=""/>
                         <span
                          style={{
                            cursor:"pointer",
                            position:"absolute",
                            top:"-5px",
                            right:"-15px",
                          }}
                            onClick={()=>{
                              imgs.splice(index,1);
                              setCommentImage([...imgs])
                            }}>
                            <CloseCircleOutlined />
                          </span>
                    </Col>
                  })}
                </Row>
                <li style={{ float: "left" }}>
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
            <textarea
              rows={4}
              placeholder="请描述下具体问题并提交建议"
              style={{
                border:"none",
                width: "660px",
                height: "88px",
                background: "#EEEEEE",
                borderRadius: "8px",
                outline: "none",
                textIndent: "10px"
              }}
            />
          </Form.Item>
          <Row>
            <Col span={6}>
              <p style={{ textAlign: "right", paddingRight: "10px" }} className="tag">标签:</p>
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