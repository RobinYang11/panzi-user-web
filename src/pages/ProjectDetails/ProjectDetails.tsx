import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Radio, DatePicker, Popover, Input, Rate, Upload, Tag, Table, Checkbox, Row, Select, Popconfirm, message, Col } from 'antd';
import './ProjectDetails.less';
import Record from '../../components/Record/Record';
import { addPpt, addRecord, deletePpt, exportRecord, queryPpt, queryRecord } from '../../api/api';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'antd/lib/form/Form';
import SortType from '../../components/SortType/SortType';
import SortMenu from '../../SortMenu';
import shaixuan from '../../assets/筛选.png'
import paixu from '../../assets/排序.png';
import search from '../../assets/search.png'
import { CloseCircleOutlined } from '@ant-design/icons';
import add from '../../assets/icon_add_newly.png';

const { RangePicker } = DatePicker;
const { Search } = Input;

let dates = new Date().setHours(0, 0, 0, 0);

let week = new Date();
let weeks = week.setDate(week.getDate() - 7);

var months = new Date().setMonth((new Date().getMonth() - 1))
interface IexportProps {
  filtContent: IRecordProject
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: IexportProps) => {
  // 获取路由动态参数
  // console.log(props.match.params);

  const { filtContent } = props;
  const [form] = useForm();

  const [visible, setVisible] = useState(false);
  const [record, setRecordDetails] = useState<Array<IRecordDocument>>();
  const [reacordVisible, setRecordVisible] = useState(false);
  const [rate, setRate] = useState(0);
  const [tags, setTags] = useState<Array<any>>(["地下室", "楼栋", "景观", "场地", "户型"]);
  const [fileLists, setfileLists] = useState<Array<any>>([])
  const [exports, setExports] = useState(false);
  const [sort, setSort] = useState(false);
  const [data, setData] = useState<Array<any>>([])
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [exportType, setExportType] = useState("local")
  const [custom, setCustom] = useState("custom")

  useEffect(() => {
    onQueryRecord({ recordProjectId: 3 });
  }, [])


  const handleCancel = () => {
    form.resetFields();
    setSort(false);
    setRecordVisible(false);
    setExports(false);
  }

  const showModal = () => {
    setVisible(true);
  }
  const onCancel = () => {
    setVisible(false);
  }

  const showRecordModal = () => {
    setRecordVisible(true)
  }

  const onFinish = (data: any) => {
    addRecord({
      "recordProjectId": 3,
      "tags": tags,
      "isStandard": 2,
      "imgs": fileLists,
      ...data,
    }).then((res) => {
      setRecordVisible(false);
      onQueryRecord({ recordProjectId: 3 });
    })
  }

  const onChangeRate = (value: number) => {
    setRate(value);
  }

  // 添加tagsw
  const onAddTag = (value: any) => {
    // tags.push(value);
    // setTags(tags); 这种事错误的，react 任务 tags 指向原来的那个tags，是同一个对象，没有变化，所以不重新渲染,
    // setTags([...tags]);
  }
  // 添加图片
  const handleChange = (value: any) => {
    if (value.file.status === "done") {
      fileLists.push(value.file.response.result);
      setfileLists([...fileLists]);
    }
  }

  // 查询Record
  const onQueryRecord = (params: any) => {
    queryRecord(params).then((res: any) => {
      setRecordDetails(res.result);
    })
  }

  // 内容筛选
  const onQueryRecords = (data: any) => {
    console.log(data)
    onQueryRecord({
      recordProjectId: 3,
      ...data
    })
    setVisible(false);
  }

  // 根据关键字搜索
  const onSearch = (e: any) => {
    setKeyword(e.target.value)
    onQueryRecord({
      keyword: e.target.value,
      recordProjectId: 3,
    })
  }

  // 导出内容
  const onExportFilter = (data: any) => {
    console.log(data);
    exportRecord({
      "recordProjectId": 3,
      ...data
    }).then(res => {
      setExports(false);
    })
  }

  // 查询PPT列表
  const showExportModal = () => {
    queryPpt({ recordProjectId: 3 }).then((res: any) => {
      setData(res.result);
    })
    setExports(true);
  }

  // 删除ppt
  const onDeletePpt = () => {
    deletePpt({ id }).then(res => {
      showExportModal();
    })
  }

  const columns = [
    {
      title: '盘子默认模板',
      dataIndex: 'fileName',
      key: 1,
    },
    {
      title: '预览',
      dataIndex: 'yulan',
      key: 2,
      render: (row: any) => {
        return (
          <ul>
            <a>预览</a>
            <Popconfirm
              placement="top"
              title="是否确认删除"
              onConfirm={() => {
                onDeletePpt()
              }
              }
              okText="Yes" cancelText="No">
              <Button type="link">删除</Button>
            </Popconfirm>
          </ul>
        )
      }
    },
  ];

  const Aprops = {
    action: "/api/upload",
    showUploadList: false,
    multiple: true,
    accept: ".pptx",
    onChange(info: any) {
      if (info.file.status === 'done') {
        addPpt({
          "fileName": info.file.name,
          "recordProjectId": 3,
          "url": info.file.response.result
        }).then((res: any) => {
          showExportModal();
        })
        message.success(`${info.file.name} 文件上传成功`);
      }
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <div className="projectDetail">
        <div className="projectDetailHeader">
          <ul className="projectDetailLeft">
            <li>
              <span>
                项目名称
            </span>
            </li>
          </ul>
          <ul className="projectDetailRight">
            <li>
              <input
                placeholder="搜索"
                onInput={onSearch}
                onChange={e => { setKeyword(e.target.value) }}
                value={keyword}
                style={{
                  width: "220px",
                  height: "40px",
                  background: "#FFFFFF",
                  borderRadius: "8px",
                  outline: "none",
                  border: 0,
                  textIndent: "40px"
                }}
              />
              <img
                src={search}
                alt=""
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "10px",
                  display:"inline-block",
                  width:"20px",
                  height:"20px"
                }}
              />
            </li>
            <li>
              <button onClick={showRecordModal} className="yellowBtn">
                <span style={{ cursor: "pointer" }}>新建</span>
              </button>
            </li>
            <li>
              <button onClick={showExportModal} className="btn">
                <span style={{ cursor: "pointer" }}>导出</span>
              </button>
            </li>
          </ul>
        </div>
        <ul className="sortAndFilter">
          <li onClick={showModal}>
            <img src={shaixuan} alt="" />
            <span>筛选</span>
          </li>
          <li>
            <Popover className="popover" title="内容排序" content={<SortType sortTypes={SortMenu} />} trigger="click" placement="bottom">
              <img src={paixu} alt="" /> <span>排序</span>
            </Popover>
          </li>
        </ul>
        {
          record?.map(item => {
            return <Record onQueryRecord={() => { onQueryRecord({ recordProjectId: 3 }) }} record={item} key={item.id} />
          })
        }
      </div>

      {/* 筛选记录 */}
      <Modal
        title="筛选内容"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width="800px"
      >
        <Form
          onFinish={onQueryRecords}
          form={form}
        >
          <p>创建时间</p>
          <Radio.Group
            onChange={(e: any) => {
              setCustom(e.target.value);
            }}
          >
            <Radio value={dates}>今日</Radio>
            <Radio value={weeks}>一周内</Radio>
            <Radio value={months}>一个月内</Radio>
            <Radio value="custom">自定义</Radio>
          </Radio.Group>
          <Form.Item
            name="tmPeriod"
          >
            {
              custom === "custom" ? <RangePicker style={{ marginTop: "10px" }} /> : ""
            }
          </Form.Item>
          <p>严重程度</p>
          <Form.Item name="level">
            <Checkbox.Group>
              <Checkbox value={3}>
                一般
                </Checkbox>
              <Checkbox value={2}>
                重要
                </Checkbox>
              <Checkbox value={1}>
                严重
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <p>追评 </p>
          <Form.Item
            name="hasComment"
          >
            <Checkbox.Group>
              <Checkbox value={1}>
                有追评
             </Checkbox>
              <Checkbox value={2}>
                无追评
             </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <p>标签</p>
          <Form.Item name="tags">
            <Checkbox.Group>
              <Checkbox value="地下室">
                地下室
                </Checkbox>
              <Checkbox value="楼栋">
                楼栋
                </Checkbox>
              <Checkbox value="景观">
                景观
                </Checkbox>
              <Checkbox value="场地">
                场地
                </Checkbox>
              <Checkbox value="户型">
                户型
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            className="submit"
          >
            <Button onClick={handleCancel}>重置</Button>
            <Button type="primary" htmlType="submit" className="sure">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加记录 */}
      <Modal
        visible={reacordVisible}
        onCancel={handleCancel}
        footer={null}
        className="RecordModal"
        width="1150px"
      >
        <div className="recordHeader">
          <h3 style={{ fontSize: "22px" }}>新建巡场记录</h3>
        </div>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Row style={{ marginBottom: "10px" }}>
            <Col span={6} style={{ textAlign: "right", paddingRight: "10px" }}>
              <p>问题照片:</p>
            </Col>
            <Col span={18}>
              <ul style={{ overflow: "hidden" }}>
                <Row>
                  {
                    fileLists.map((i:any,index:number)=> {
                      return <Col span={4} style={{position:"relative",margin:"10px"}}>
                        <img 
                        src={i}
                        style={{ 
                          width: "100px",
                          height:"100px",
                          marginRight: "10px",
                          borderRadius:"8px"
                          }}
                          alt="图片" />
                        <span
                        style={{
                          cursor:"pointer",
                          position:"absolute",
                          top:"-5px",
                          right:"-5px",
                        }}
                          onClick={()=>{
                            fileLists.splice(index,1);
                            setfileLists([...fileLists])
                          }}>
                          <CloseCircleOutlined />
                        </span>
                      </Col>
                    })
                  }
                </Row>
                <li style={{ float: "left" }}>
                  <Upload
                    action="/api/upload"
                    listType="picture-card"
                    showUploadList={false}
                    onChange={handleChange}
                  >
                    上传
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
            <textarea rows={4} placeholder="请描述下具体问题并提交建议"
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
          <Row style={{ marginTop: "10px" }}>
            <Col span={6} style={{ textAlign: "right", paddingRight: "10px" }}>
              <p className="tag">标签:</p>
            </Col>
            <Col span={18}>
              <ul className="tags">
                {
                  tags.map(item => {
                    return <li
                      className="tagsItme"
                    >
                      <span onClick={onAddTag}>{item}</span>
                    </li>
                  })
                }
              </ul>
            </Col>
          </Row>

          <Form.Item
            label="严重程度"
            name="level"
          >
            <Rate count={3} onChange={onChangeRate} value={rate} style={{ color: "#FEC13F" }} />
          </Form.Item>
          <Form.Item
            className="submit"
          >
            <button onClick={handleCancel} style={{ width: "94px", height: "39px", background: "#F7F8F9", borderRadius: "8px", outline: "none", border: "0px", color: "#777777" }}>取消</button>
            <button type="submit" className="sure" style={{ width: "94px", height: "39px", background: "#FFB81F", borderRadius: "8px", outline: "none", border: "0px", color: "#FFFFFF" }}>
              确定
            </button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 导出记录 */}
      <Modal
        visible={exports}
        onCancel={handleCancel}
        footer={null}
        className="RecordModal"
        width="1150px"
      >
        <div className="exportContent">
          <div className="exportHeader">
            <h3 style={{ fontSize: "22px", color: "#323232" }}>导出内容</h3>
          </div>
          <Form
            onFinish={onExportFilter}
          >
            <p>创建时间:</p>
            <Row>
              <Col span={18}>
                <Radio.Group
                  onChange={(e: any) => {
                    setCustom(e.target.value);
                  }}
                  style={{ marginLeft: "60px" }}
                >
                  <Radio value={dates} style={{ marginRight: "60px" }}>今日</Radio>
                  <Radio value={weeks} style={{ marginRight: "60px" }}>一周内</Radio>
                  <Radio value={months} style={{ marginRight: "60px" }}>一个月内</Radio>
                  <Radio value="custom" style={{ marginRight: "60px" }}>自定义</Radio>
                </Radio.Group>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="tmPeriod"
                >
                  {
                    custom === "custom" ? <RangePicker /> : ""
                  }
                </Form.Item>
              </Col>
            </Row>
            <p>严重程度:</p>
            <Form.Item
              name="level"
              style={{ marginLeft: "60px" }}
            >
              <Checkbox.Group>
                <Checkbox value={3} style={{ marginRight: "60px" }}>
                  一般
                </Checkbox>
                <Checkbox value={2} style={{ marginRight: "60px" }}>
                  重要
                </Checkbox>
                <Checkbox value={1} style={{ marginRight: "60px" }}>
                  严重
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <p style={{ marginLeft: "38px" }}>标签:</p>
            <Form.Item
              name="tags"
              style={{ marginLeft: "60px" }}
            >
              <Checkbox.Group>
                <Checkbox value="#地下室" style={{ marginRight: "60px" }}>
                  地下室
                </Checkbox>
                <Checkbox value="#楼栋" style={{ marginRight: "60px" }}>
                  楼栋
                </Checkbox>
                <Checkbox value="#景观" style={{ marginRight: "60px" }}>
                  景观
                </Checkbox>
                <Checkbox value="#场地" style={{ marginRight: "60px" }}>
                  场地
                </Checkbox>
                <Checkbox value="#户型" style={{ marginRight: "60px" }}>
                  户型
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <p>导出追评:</p>
            <Form.Item
              name="isExportComment"
              style={{ marginLeft: "60px" }}
            >
              <Radio.Group
              >
                <Radio value={1} style={{ marginRight: "60px" }}>导出</Radio>
                <Radio value={2} style={{ marginRight: "60px" }}>不导出</Radio>
              </Radio.Group>
            </Form.Item>
            <p>导出方式:</p>
            <Row>
              <Col span={12}>
                <Radio.Group
                  onChange={(e: any) => {
                    setExportType(e.target.value);
                  }}
                  style={{ marginLeft: "60px" }}
                >
                  <Radio value="local" style={{ marginRight: "60px" }}>下载到本地</Radio>
                  <Radio value="email" style={{ marginRight: "60px" }}>导出到邮箱</Radio>
                </Radio.Group>
              </Col>
              <Col span={12}>
                {
                  exportType === "email" ? <Form.Item
                    name="email"
                    required
                  >
                    <Input
                      placeholder="请填写邮箱地址"
                      style={{
                        width: "240px",
                        height: "30px",
                        background: "#FFFFFF",
                        border: "1px solid #C9C9C9",
                        borderRadius: "8px"
                      }} />
                  </Form.Item> : ""
                }
              </Col>
            </Row>
            <p
              style={{ marginTop: "20px" }}
            >导出文件格式</p>
            <Form.Item
              name="exportType"
              style={{ marginLeft: "60px" }}
            >
              <Radio.Group>
                <Radio value="word" style={{ marginRight: "60px" }}>Word</Radio>
                <Radio value="excel" style={{ marginRight: "60px" }}>Excel</Radio>
                <Radio value="ppt" style={{ marginRight: "60px" }}>PPT</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="isHorizontal"
              style={{ marginLeft: "60px" }}

            >
              <Radio.Group>
                <Radio value={1}>横版</Radio>
                <Radio value={2}>竖版</Radio>
              </Radio.Group>
            </Form.Item>
            <div className="exportTemplate">
              <p className="exportLeft">导出模板</p>
              <div className="exportRight">
                <Upload {...Aprops}>
                  <img 
                  src={add} 
                  alt=""
                  style={{
                    marginRight:"17px",
                    verticalAlign: "sub",
                    cursor:"pointer"
                  }}
                  />
                  <span style={{cursor:"pointer"}}>新增</span>
                </Upload>
              </div>
            </div>
            <Form.Item
              name="pptDocument"
            >
              <Table
                columns={columns}
                dataSource={data}
              />
            </Form.Item>
            <Form.Item
              name="saveToMyDocument"
              style={{ textAlign: "center" }}
            >
              <Checkbox value={1}>
                导出文件同步到个人文档
              </Checkbox>
            </Form.Item>
            <Form.Item
              className="submit"
            >
              <button onClick={handleCancel} style={{ width: "94px", height: "39px", background: "#F7F8F9", borderRadius: "8px", outline: "none", border: "0px", color: "#777777" }}>取消</button>
              <button type="submit" className="sure" style={{ width: "94px", height: "39px", background: "#FFB81F", borderRadius: "8px", outline: "none", border: "0px", color: "#FFFFFF" }}>
                确定
            </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  )
}
