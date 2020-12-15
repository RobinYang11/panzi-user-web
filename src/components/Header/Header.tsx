import React from 'react';
import './header.less';
import { Popover} from 'antd';
import '../Dropdown/Dropdown'
import Dropdown from '../Dropdown/Dropdown';
import DropMenus from '../../DropMenus';
import q from '../../assets/q.png';
import shiliang from  '../../assets/矢量智能对象.png';
import badou from '../../assets/badou.png'
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  
  return (
      <div className="header">
        <div className="header-main">
          <div className="logo">
             <a href="">
               <img src={q} alt="盘子"/>
             </a>
          </div>
          <div className="header-nav-right">
            <ul>
              <li>
                <Popover content={<Dropdown dropMenu={DropMenus}/>}  trigger="hover">
                  <img src={shiliang} alt="" className="icon"/>
                </Popover>
              </li>
              <li>
                <Popover placement="bottomRight" content={<Dropdown dropMenu={DropMenus}/>}  trigger="hover" className="user">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604677773530&di=d9eafa6edbfbf32b4062f394aab35554&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Forj360%2F735ea4a2ly1gk3ntbuxhuj20jg0jgmz7.jpg" alt="" className="userImg"/>
                </Popover>
                <span>
                  刘佳佳
                </span>
              </li>
            </ul>
          </div>
          <div className="header-nav-menu">
            <ul className="header-menu">
              <li className="list-item frist-item">
                <a href="">工作台</a>
              </li>
              <li className="list-item">
                <a href="">教程</a>
              </li>
              <li className="list-item">
                <a href="">帮助</a>
              </li>
              <li className="list-item">
                <a href="">下载</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}