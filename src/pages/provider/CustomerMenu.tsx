import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Route } from 'react-router';
import MesssageList from './MessageList';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "./providerCss.css"


const items: MenuProps['items'] = [
  {
    label: (
      <div>
        <NavLink to="/provider"><img src='http://51.104.196.52:8090/upload/findserviceLogo.png' alt="Logo" height={40} style={{ margin: 10 }} /></NavLink>
        
      </div>
    ),
    key: 'logo',
    style: { marginLeft:100},
  },

  {
    label: <NavLink to="/provider" style={{ border: 'none', fontWeight: 'bold' ,fontSize:16}}>Service List</NavLink>,
    key: 'Home',
    style: { margin: 10, marginLeft:700},
    // icon: <MailOutlined />,
  },

  {
    label: <div style={{ border: 'none', fontWeight: 'bold' ,fontSize:16}}><img className="profile-avatar2" src='src\assets\profile.png' alt="Profile" />IVY</div>,
    key: 'SubMenu',
    // icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        // label: 'Item 1',
        children: [
          {
            label: <NavLink to="Profile">Profile</NavLink>,
            key: 'profile',
            style: { margin: 2},
           
          },
          {
            label: <NavLink to="messagelist">Message</NavLink>,
            key: 'Message',
            style: { margin: 2},
           
          },
          {
            label: <NavLink to="addservice">Add Service</NavLink>,
            key: 'Add',
            style: { margin: 2},
        
          },
          


        ],
      },

    ],
    style: { margin: 10},
  },
  {
    label: <NavLink to="/login" style={{ border: 'none', fontWeight: 'bold' ,fontSize:16}}>Log Out</NavLink>,
    key: 'Log out',
    // icon: <MailOutlined />,
    style: { margin: 10},
  },
  
];

const CustomerMenu: React.FC = () => {
  const [current, setCurrent] = useState('Home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div  >
      <Menu
        theme='light'
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        // style={{ float:'right' }}
        items={items} />
      <Outlet />
    </div>
  );
};

export default CustomerMenu;



