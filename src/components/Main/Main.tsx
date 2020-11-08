import React from 'react';
import { Route } from 'react-router-dom';
import menu from '../../menu';
import Menu from '../Menu/Menu';
import './Main.less';

export default (props:any)=>{

  const generateRoutes = (routes: Array<any>) => {
    return routes.map((item: any) => {
      return <Route key={item.name} exact={item.exact} path={item.path} component={item.component} />
    })
  }

  return(
      <div className="main">
        <div className="layout-container-middle">
          <div className="Menu ant-col-sm-4">
              <Menu menu={menu} />
          </div>
        <div className="navContent">
          </div>
            {generateRoutes(menu)}
          </div>
      </div>
  )
}
