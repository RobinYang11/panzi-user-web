import { FilterOutlined,  SortAscendingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Radio,DatePicker, Popover, Input, Rate, Upload, Tag, Table, Checkbox, Row, Select, Popconfirm, message } from 'antd';
import './ProjectDetails.less';
import Record from '../../components/Record/Record';
import { addPpt, addRecord, deletePpt, exportRecord, queryPpt, queryRecord} from '../../api/api';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'antd/lib/form/Form';
import SortType from '../../components/SortType/SortType';
import SortMenu from '../../SortMenu';
import { UploadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const {Search} = Input;

let dates = new Date().setHours(0,0,0,0);

let week = new Date();
let weeks = week.setDate(week.getDate()-7); 

var months = new Date().setMonth((new Date().getMonth()-1))
interface IexportProps{
  filtContent:IRecordFilterReq
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:IexportProps) =>{
  // 获取路由动态参数
  // console.log(props.match.params);

  const {filtContent}=props;
  const [form] = useForm();

  const [visible,setVisible] = useState(false);
  const [record,setRecordDetails] =useState<Array<IRecordDocument>>();
  const [reacordVisible,setRecordVisible] = useState(false);
  const [rate,setRate] = useState(0);
  const [tags,setTags] = useState<Array<any>>([]);
  const [fileLists,setfileLists] = useState<Array<any>>([])
  const [exports,setExports] = useState(false);
  const [sort,setSort] = useState(false);
  const [data,setData] = useState([])
  const [exportType,setExportType] = useState<Array<any>>([]);
  const [keyword,setKeyword] =useState("");
  const [email,setEmail] = useState();

  useEffect(()=>{
    onQueryRecord({recordProjectId:3});
  },[])

 
  const handleCancel = ()=>{
    form.resetFields();
    setSort(false);
    setRecordVisible(false);
    setExports(false);
  }

  const showModal = () =>{
    setVisible(true);
  }
  const onCancel =()=>{
    setVisible(false);
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
      "imgs":fileLists,
      ...data,
    }).then((res)=>{
      console.log(res)
      setRecordVisible(false);
      onQueryRecord({recordProjectId:3});
    })
  }

  const onChangeRate =(value:number)=>{
    setRate(value);
  }

  // 添加tags
  const onAddTag =(value:any)=>{
    tags.push(value);
    // setTags(tags); 这种事错误的，react 任务 tags 指向原来的那个tags，是同一个对象，没有变化，所以不重新渲染,
    setTags([...tags]);
   
  }
  // 添加图片
  const handleChange =(value:any)=>{
    if(value.file.status==="done"){
			fileLists.push(value.file.response.result);
			setfileLists([...fileLists]);
		}
  }

  // 导出文件格式
  const onExportTypeChange =(value:any)=>{
    console.log(value);
    exportType.push(value);
    setExportType([...exportType]);
  }

  // 查询Record
  const onQueryRecord =(params:any)=>{
    queryRecord(params).then((res:any)=>{
      setRecordDetails(res.result);
    })
  }

  // 内容筛选
  const onQueryRecords =(data:any)=>{
    console.log(data)
    onQueryRecord({
      recordProjectId:3,
      ...data
    })
    setVisible(false);
  }

  // 根据关键字搜索
  const onSearch =(values:any)=>{
    setKeyword(values)
    onQueryRecord({
      keyword:keyword,
      recordProjectId:3,
    })
  }

  const changeEmail =(e:any)=>{
    setEmail(e.target.value);
    console.log(e.target.value);
  }

   // 导出内容
   const onExportFilter=(data:any)=>{
    console.log(data);
    exportRecord({
      "recordProjectId":3,
      ...data
    }).then(res=>{
      console.log(res);
    })
  }

   // 查询PPT列表
 const showExportModal =()=>{
  queryPpt({recordProjectId:3}).then((res:any)=>{
    setData(res.result);
  })
  setExports(true);
}

  // 添加PPT
  const onAddPpt =(value:any)=>{
    console.log(value);
  }

  const onDeletePpt =()=>{
    deletePpt({
      "id":"5fb38782da818d7105d464ca"
    }).then(res=>{
      console.log(res)
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
      render:()=>{ return (
        <ul>
          <li><a>预览</a></li>
          <li>
            <Popconfirm placement="top" title="是否确认删除" onConfirm={()=>onDeletePpt()} okText="Yes" cancelText="No">
              <Button type="link">删除</Button>
            </Popconfirm>
          </li>
        </ul>
      )}
    },
  ];

  const Aprops = {
    // name: 'fileName',
    action: "/api/addPpt",
    showUploadList: false,
    multiple: true,
    fileList:data,
    accept:".pptx",
    data:{url:"https://app-test.obs.cn-east-2.myhuaweicloud.com:443/_73472_1606183661555_%E5%B7%A1%E5%9C%BA%E5%AF%BC%E5%87%BA%E6%A8%A1%E6%9D%BF.pptx",recordProjectId:3},
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  };
  

  return(
    <>
    <div className="projectDetail">
      <div className="projectDetailHeader">
        <ul className="projectDetailLeft">
            <li>
               <Button onClick={showRecordModal}>新建</Button>
            </li>
            <li>
                <Button onClick={showExportModal}>导出</Button>
            </li>
            <li>
                <Button onClick={showExportModal}>数据分析</Button>
            </li>
        </ul>
        <ul className="projectDetailRight">
          <li>
            <Search 
             placeholder="搜索"
             onSearch={onSearch}
             onChange={e=>{ setKeyword(e.target.value)}}
             value={keyword}
              />
          </li>
          <li>
          <Popover  title="内容排序" content={<SortType sortTypes={SortMenu}/>} trigger="click">
           <SortAscendingOutlined/>
          </Popover>
          </li>
          <li>
            <FilterOutlined onClick={showModal} />
          </li>
        </ul>
      </div>
      {
        record?.map(item=>{
          return <Record onQueryRecord={()=>{onQueryRecord({recordProjectId:3})}} record={item} key={item.id}/>
        })
      }
    </div>

    {/* 筛选记录 */}
    <Modal
      title="筛选内容"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="modal"
      >
        <Form
          onFinish={onQueryRecords}
          form={form}
        >
          <p>创建时间</p>
          <Form.Item
            name="tmPeriod"
          >
            <Radio.Group>
              <Radio value={dates}>今日</Radio>
              <Radio value={weeks}>一周内</Radio>
              <Radio value={months}>一个月内</Radio>
              <Radio value="">自定义</Radio>
                <RangePicker/>
            </Radio.Group>
          </Form.Item>
          <p>严重程度</p>
          <Form.Item name="level">
            <Checkbox.Group>
                <Checkbox value={1}>
                  一般
                </Checkbox>
                <Checkbox value={2}>
                  重要
                </Checkbox>
                <Checkbox value={3}>
                  严重
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          {/* <p>追评</p>
          <Form.Item name="hasComment">
            <Checkbox.Group>
                <Checkbox value={1}>
                  有追评
                </Checkbox>
                <Checkbox value={2}>
                  无追评
                </Checkbox>
            </Checkbox.Group>
          </Form.Item> */}
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
      >
        <div className="recordHeader">
          <h3>新建巡场记录</h3>
        </div>
        <p>项目:保利一期</p>
        <Form
          name="basic"
          onFinish={onFinish}
        >
          <p>问题照片</p> 
          <div>
    				{fileLists.map(i=>{
      					return <img src={i} style={{width:"100px",marginRight:"10px"}} />
      				})}
    			</div>
          <Upload
            action="/api/upload"
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
          >
            上传
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

    {/* 导出记录 */}
    <Modal
       visible={exports}
       onCancel={handleCancel}
       footer={null}
       className="RecordModal"
    >
      <div className="exportContent">
        <div className="exportHeader">
          <h3>导出内容</h3>
        </div>
        <Form
          onFinish={onExportFilter}
        >
          <p>创建时间</p>
          <Form.Item
            name="tmPeriod"
          >
            <Radio.Group>
              <Radio value={dates}>今日</Radio>
              <Radio value={weeks}>一周内</Radio>
              <Radio value={months}>一个月内</Radio>
              <Radio value="自定义">自定义</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="range-picker" label="RangePicker">
            <RangePicker />
          </Form.Item>
          <p>严重程度</p>
          <Form.Item name="level">
            <Checkbox.Group>
                <Checkbox value={1}>
                  一般
                </Checkbox>
                <Checkbox value={2}>
                  重要
                </Checkbox>
                <Checkbox value={3}>
                  严重
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <p>导出方式</p>
          <Form.Item
            name="email"
          >
            <Checkbox.Group>
                <Checkbox>
                  下载到本地
                </Checkbox>
                <br/>
                <Checkbox>
                  导出到邮箱
                  <Input 
                   placeholder="请填写邮箱地址"
                   value={email}
                   onChange={changeEmail}
                   />
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <p>导出文件格式</p>
          <Form.Item name="exportType">
            <Checkbox.Group>
                <Checkbox value="word">
                  Word
                </Checkbox>
                <Checkbox value="excel">
                  Excel
                </Checkbox>
                <Checkbox value="ppt">
                  PPT
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <div className="exportTemplate">
            <p className="exportLeft">导出模板</p>
            <div className="exportRight">
            <Upload {...Aprops}>
              <Button>上传PPT</Button>
            </Upload>,
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
            className="submit"
          >
            <Button htmlType="reset" onClick={handleCancel}>取消</Button>
            <Button type="primary" htmlType="submit" className="sure">
              确定
            </Button>
          </Form.Item>
        </Form>
        </div>
    </Modal>
    </>
  )
}
