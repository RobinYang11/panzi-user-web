import React from 'react';
import './header.less';
import { Col, Popover, Row} from 'antd';
import '../Dropdown/Dropdown'
import Dropdown from '../Dropdown/Dropdown';
import DropMenus from '../../DropMenus';
import shiliang from  '../../assets/矢量智能对象.png';
import logo from '../../assets/ICON.png';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  
  return (
      <div className="header">
        <Row className="header-main">
          <Col span={4} className="logo">
             <a href="">
               <img src={logo} alt="盘子" style={{float:"left"}}/>
               <span style={{
                 float:"left",
                 fontSize:"22.5px",
                 color:"#000",
                 marginLeft: "16px",
                 marginTop: "4px"
                 }}>盘八斗</span>
             </a>
          </Col>
          <Col span={15} className="header-nav-menu">
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
          </Col>
          <Col span={4}
           style={{textAlign:"right"}}
           className="header-nav-right"
           >
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
          </Col>
        </Row>
      </div>
  )
}