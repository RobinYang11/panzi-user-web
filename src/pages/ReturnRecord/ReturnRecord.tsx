import React, { ReactNode, useState } from 'react';
import{Input,Modal, Button ,Form, Dropdown} from 'antd';
import './ReturnRecord.less'
import { PlusOutlined } from '@ant-design/icons';
import ReturnProject from '../../components/ReturnProject/ReturnProject';

const {Search} = Input;


const ReturnRecord = (props:any) =>{

  const [visible,setVisible] = useState(false);
  const [projects,setProjects] = useState<Array<IRecordProject>>([
    {
      id:1,
      name:"项目1",
      creator:{},
      logo:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605036000364&di=3518742f94b859b011b5494abe3a1b5c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F16%2F20150916235818_HVAk2.jpeg",
      tmCreate:"1605188887853",
      tmModify:"1605188887853",
      isDeleted:1|2,
    }
  ]);
  
  const onSearch = (value:any) =>{ 
    console.log(value);
  }

  const showModal = () =>{
    setVisible(true);
  }

  const handleCancel =()=>{ 
    setVisible(false);
  }

  const onSubmit =()=>{
    setVisible(false);
  }

  return(
    <>
      <div className="record">
        <div className="recordSearch">
          <Search placeholder="搜索" onSearch={onSearch} enterButton />
        </div>
        <ul>
          <li>
            <div className="recordModal">
              <div className="recordAdd">
               <PlusOutlined  onClick={showModal} className="icon"/>
              </div>
              <p>新建项目</p>
            </div>
          </li>
           {
             projects.map(i=>{
              return <ReturnProject project={i} key={i.id}  />
             })
           }
        </ul>
      </div>
      <Modal
        title="新建项目"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form>
          <Form.Item
            label="项目名称"
            name="username"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input />
          </Form.Item>
          <div style={{textAlign:"right"}}>
            <button type="submit" onClick={handleCancel} style={{marginRight:"10px"}}>
              取消
            </button>
            <button type="submit" onClick={onSubmit}>
              确定
            </button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default ReturnRecord;