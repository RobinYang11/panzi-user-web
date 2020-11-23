import { FilterOutlined,  PlusCircleOutlined,  PlusOutlined, SortAscendingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Radio,DatePicker, Popover, Input, Rate, Upload, Tag, Table, Checkbox } from 'antd';
import './ProjectDetails.less';
import Record from '../../components/Record/Record';
import { addRecord, exportRecord, queryLatestTags, queryRecord} from '../../api/api';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'antd/lib/form/Form';

const { RangePicker } = DatePicker;
const {Search} = Input;

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
  const [fileList,setFileList] = useState<Array<any>>([])
  const [exports,setExports] = useState(false);

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

  const [level,setLevel] = useState <Array<number>>([]);
  const [hasComment,setHasComment] = useState<Array<any>>([]);
  const [exportType,setExportType] = useState<Array<any>>([]);
  const [tmPeriod,setTmPeriod] = useState('');

  const [keyword,setKeyword] =useState("");

  useEffect(()=>{
    onQueryRecord({recordProjectId:3});
  },[])


  const handleCancel = ()=>{
    form.resetFields();
    setVisible(false);
    setRecordVisible(false);
    setExports(false);
  }

  const showModal = () =>{
    setVisible(true);
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

  const handleChange =(value:any)=>{
    console.log(value);
  }

  const showExportModal =()=>{
    setExports(true);
  }

  // 导出内容
  const onExportFilter=(data:any)=>{
    console.log(data);
    exportRecord({
      // "teamId":filtContent.teamId,
      // "project":filtContent.project,
      "tmPeriod":tmPeriod,
      "status":1,
      "level":level,
      "isSelf":1,
      "exportType":exportType,
      "email":"zhnv76f@dingtalk.com",
      ...data
    }).then(res=>{
      console.log(res);
      // setHasComment(filtContent.hasComment);
      // setLevel(filtContent.level);
      setExportType(filtContent.exportType);
    })
  }

  // 选择严重程度
  const onAddLevel =(value:any)=>{
    console.log(value);
    level.push(value);
    setLevel([...level]);
  }

  // 导出文件格式
  const onExportTypeChange =(value:any)=>{
    console.log(value);
    exportType.push(value);
    setExportType([...exportType]);
  }

  // 追评
  const onChangeHasComment =(value:any)=>{
    console.log(value);
    hasComment.push(value);
    setHasComment([...hasComment]);
  }

  // 导出方式
  // const onChangeExportMode =(value:any)=>{
  //   console.log(value);
  //   exportMode.push(value);
  //   setExportMode([...exportMode]);
  // }

  const onChangeTmPeriod =(value:any)=>{
    setTmPeriod(value);
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

  const content = (
    <div>
      <p>默认排序</p>
      <p>创建时间最近</p>
      <p>追评时间最近</p>
      <p>严重程度最近</p>
    </div>
  );

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

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
            <Popover placement="bottom" title="内容排序" content={content} trigger="click">
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
      onCancel={handleCancel}
      footer={null}
      className="modal"
      >
        <Form
          onFinish={onQueryRecords}
          form={form}
        >
          <p>创建时间</p>
          {/* <Form.Item
            name="tmPeriod"
          >
            <Radio.Group>
              <Radio value="a">今日</Radio>
              <Radio value="b">一周内</Radio>
              <Radio value="c">一个月内</Radio>
              <Radio value="d">自定义</Radio>
              <RangePicker />
            </Radio.Group>
          </Form.Item> */}
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
          <p>追评</p>
          <Form.Item name="hasComment">
            <Checkbox.Group>
                <Checkbox value={1}>
                  有追评
                </Checkbox>
                <Checkbox value={2}>
                  无追评
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
          <Upload
            action="http://2081uw5545.iask.in:46203/api/uploadFile"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
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

    {/* 导出内容 */}
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
              <Radio value={1}>今日</Radio>
              <Radio value={2}>一周内</Radio>
              <Radio value={3}>一个月内</Radio>
              <Radio value={4}>自定义</Radio>
              <RangePicker />
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
          <p>追评</p>
          <Form.Item name="hasComment">
            <Checkbox.Group>
                <Checkbox value={1}>
                  有追评
                </Checkbox>
                <Checkbox value={2}>
                  无追评
                </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <p>导出方式</p>
          <div>
            {/* <Checkbox.Group options={exportMode} defaultValue={['下载到本地']} onChange={onChangeExportMode} /> */}
            <Input placeholder="请填写邮箱地址"/>
          </div>
          <p>导出文件格式</p>
          <div>
            <Checkbox.Group options={exportType} defaultValue={['Word']} onChange={onExportTypeChange} />
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>横版</Radio>
              <Radio value={2}>竖版</Radio>
            </Radio.Group>
          </div>
          <div className="exportTemplate">
            <p className="exportLeft">导出模板</p>
            <div className="exportRight">
              <PlusCircleOutlined />
              <span>新增</span>
            </div>
          </div>
          {/* <Form.Item
            name="exportTemplate"
            rules={[{ required: true, message: '请导出模板' }]}
          >
            <Table
              columns={columns}
              dataSource={data}
            />
          </Form.Item> */}
          <Form.Item
            className="submit"
          >
            <Button htmlType="reset">取消</Button>
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
