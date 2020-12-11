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
import shaixuan from '../../assets/筛选.png'
import paixu from '../../assets/排序.png';


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
  const [tags,setTags] = useState<Array<any>>(["地下室","楼栋","景观","场地","户型"]);
  const [fileLists,setfileLists] = useState<Array<any>>([])
  const [exports,setExports] = useState(false);
  const [sort,setSort] = useState(false);
  const [data,setData] = useState<Array<any>>([])
  const [keyword,setKeyword] =useState("");
  const [email,setEmail] = useState();
  const [id,setId] = useState("");

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

// 删除ppt
  const onDeletePpt =()=>{

    deletePpt({id}).then(res=>{
      showExportModal();
    })
  }

  const columns = [
    {
      title:'盘子默认模板',
      dataIndex:'fileName',
      key: 1,
    },
    {
      title: '预览',
      dataIndex: 'yulan',
      key: 2,
      render:(row:any)=>{ return (
        <ul>
          <a>预览</a>
          <Popconfirm 
          placement="top"
          title="是否确认删除"
          onConfirm={()=>{
            onDeletePpt()}
          }
          okText="Yes" cancelText="No">
            <Button type="link">删除</Button>
          </Popconfirm>
        </ul>
      )}
    },
  ];

  const Aprops = {
    action: "/api/upload",
    showUploadList: false,
    multiple: true,
    accept:".pptx",
    onChange(info:any) {
       if (info.file.status === 'done') {
        addPpt({
          "fileName":info.file.name,
          "recordProjectId":3,
          "url": info.file.response.result
        }).then((res:any)=>{
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
  

  return(
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
            <Search 
             placeholder="搜索"
             onSearch={onSearch}
             onChange={e=>{ setKeyword(e.target.value)}}
             value={keyword}
              />
          </li>
          <li>
               <button onClick={showRecordModal} className="yellowBtn">
                 <span>新建</span>
               </button>
            </li>
            <li>
                <button onClick={showExportModal} className="btn">
                  <span>导出</span>
                </button>
            </li>
        </ul>
      </div>
      <ul className="sortAndFilter">
        <li>
            <Popover  title="内容排序" content={<SortType sortTypes={SortMenu}/>} trigger="click">
             <img src={paixu} alt=""/> <span>排序</span>
            </Popover>
          </li>
          <li onClick={showModal}>
            <img src={shaixuan} alt="" /> 
            <span>筛选</span>
          </li>
      </ul>
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
          {/* {
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
           /> */}
         <Form.Item
          name="tags"
         >
          <Select>
            <Select.Option value="地下室">地下室</Select.Option>
            <Select.Option value="楼栋">楼栋</Select.Option>
            <Select.Option value="景观">景观</Select.Option>
            <Select.Option value="场地">场地</Select.Option>
            <Select.Option value="户型">户型</Select.Option>
          </Select>
        </Form.Item>
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
          <p>导出追评</p>
          <Form.Item name="isExportComment">
           <Radio.Group>
              <Radio value={1}>导出</Radio>
              <Radio value={2}>不导出</Radio>
            </Radio.Group>
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
           <Radio.Group>
              <Radio value="word">Word</Radio>
              <Radio value="excel">Excel</Radio>
              <Radio value="ppt">PPT</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="isHorizontal">
            <Radio.Group defaultValue={2}>
              <Radio value={1}>横版</Radio>
              <Radio value={2}>竖版</Radio>
            </Radio.Group>
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
            name="saveToMyDocument"
            style={{textAlign:"center"}}
          >
            <Checkbox.Group>
              <Checkbox value={1}>
                导出文件同步到个人文档
              </Checkbox>
            </Checkbox.Group>
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
