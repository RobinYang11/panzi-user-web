import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { queryDesignList } from '../../api/api';
import Dragger from 'antd/lib/upload/Dragger';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:any)=>{
  console.log(props)

  const [design,setDesign] =useState<Array<IDesign>>([]);
  const [imgs,setImgs] = useState<Array<any>>([]);

  useEffect(()=>{
    onQueryDesignList();
  },[props.id])



  const onQueryDesignList = ()=>{
    queryDesignList({
      // "creator":112,
       "parentId":props.id
    }).then((res:any)=>{
      setDesign(res.result)
    })
  }

  const aProps = {
    name: 'file',
    multiple: true,
    action: '/api/upload',
    onChange(info:any) {
      console.log(info);
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功.`);
        // setImgs(info.file.response.result);
      } 
    },
  };

  return (
    <div className="Design">
      <Dragger {...aProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件夹到此处上传</p>
        <p className="ant-upload-hint">(限CAD图纸格式)</p>
      </Dragger>
    </div>
  )
}


