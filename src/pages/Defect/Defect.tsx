import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { queryDefect, queryType } from '../../api/api';
import Field from '../../components/Field/Field';
import './Defect.less';
import search from '../../assets/search.png'

const Defect = (props: any) => {

  const [defects, setDefects] = useState<Array<Idefect>>([]);
  const [name,setName] = useState('')

  useEffect(() => {
    onQueryDefect();
  }, [])

  const onQueryDefect = () => {
    queryDefect({type:props.type}).then((res: any) => {
      setDefects(res.result);
    })
  }

  const onSearch =(e:any)=>{
    setName(e.target.value);
    queryType({name:e.target.value}).then((res: any) => {
      setDefects(res.result);
    })
  }

  return (
    <>
      <div className="defectMain">
        <div>
          <input 
          className="input" 
          placeholder="搜索"
          onInput={onSearch}
          value={name}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          />
          <img src={search} alt="" className="searchBtn"/>
        </div>
        <ul>
          {
            defects?.map((item: any) => {
              return <Field defect={item} key={item.id} />
            })
          }
        </ul>
      </div>
    </>
  )
}

export default Defect;