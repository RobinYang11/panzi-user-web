import React, { useState } from 'react';

interface sortTypeProps{
  sortTypes:IRecordFilterReq
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props:sortTypeProps)=>{
  
  const {sortTypes} = props;
  const [sort,setSrot] = useState([])

  return (
    <>
      <ul>
          {
            sort.map(i=>{
              return <li>{sortTypes.sortType}</li>
            })
          }
      </ul>
    </>
  )
}