import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { queryDefect } from '../../api/api';
import Field from '../../components/Field/Field';
import './Defect.less';

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
      <div className="headers" >
        <span className="search">
          <Search />
        </span>
      </div>

      <div className="defectMain">
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