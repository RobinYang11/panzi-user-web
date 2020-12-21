import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { queryDefect } from '../../api/api';
import Field from '../../components/Field/Field';
import './Defect.less';
import search from '../../assets/search.png'

const Defect = (props: any) => {

  const [defects, setDefects] = useState<Array<Idefect>>([]);

  useEffect(() => {
    onQueryDefect();
  }, [])

  const onQueryDefect = () => {
    queryDefect({type:props.type}).then((res: any) => {
      setDefects(res.result);
    })
  }

  return (
    <>
      <div className="defectMain">
        <div>
          
				  <input className="input" placeholder="搜索"/>
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