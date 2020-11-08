import React from 'react';
import './header.less';
import { SearchOutlined, AppstoreAddOutlined, HistoryOutlined, MessageOutlined, UserAddOutlined, UserDeleteOutlined, CaretDownOutlined, LogoutOutlined, SettingOutlined, AlertOutlined, SplitCellsOutlined,} from '@ant-design/icons';
import { Button, Divider, Popover} from 'antd';
import '../Dropdown/Dropdown'
import Dropdown from '../Dropdown/Dropdown';
import DropMenus from '../DropMenus/DropMenus';

// import panzi from '../../assets/pnazi.png';
import panzi from '../../assets/panzi.png';


export default () => {
  
  return (
      <div className="header">
        <div className="header-main">
          <div className="logo">
             <a href="">
               <img src={panzi} alt="盘子"/>
             </a>
          </div>
          <div className="header-nav-right">
            <ul>
              <li>
                <Popover content={<Dropdown dropMenu={DropMenus}/>}  trigger="hover">
                  <AppstoreAddOutlined className="icon"/>
                </Popover>
              </li>
              <li>
                 <HistoryOutlined  className="icon"/>
              </li>
              <li>
                <SplitCellsOutlined  className="icon"/>
              </li>
              <li>
                <Popover placement="bottomRight" content={<Dropdown dropMenu={DropMenus}/>}  trigger="hover" className="user">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604677773530&di=d9eafa6edbfbf32b4062f394aab35554&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Forj360%2F735ea4a2ly1gk3ntbuxhuj20jg0jgmz7.jpg" alt=""/>
                </Popover>
                <CaretDownOutlined style={{fontSize:"9px",marginLeft:6}}/>
              </li>
            </ul>
          </div>
          <div className="header-search">
            <div className="header-search-bottom">
              <SearchOutlined className="icon"/>
              <input type="text" placeholder="搜索"/>
            </div>
          </div>
          <div className="header-nav-menu">
            <ul className="header-menu">
              <li className="list-item frist-item">
                <a href="">工作台</a>
              </li>
              <li className="list-item">
                <a href="">空间</a>
              </li>
              <li className="list-item">
                <a href="">发现</a>
              </li>
              <li className="list-item">
                <a href="">帮助</a>
              </li>
              <li className="list-item">
                <a href="">反馈</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}