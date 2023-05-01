import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Route } from 'react-router';
import MesssageList from './MessageList';
import { Link, NavLink, Outlet } from 'react-router-dom'

const items: MenuProps['items'] = [
  {
    label: <NavLink to="/customer">Home</NavLink>,
    key: 'Home',
    // icon: <MailOutlined />,
  },
  // {
  //   label: <NavLink to="mapsearching">Map Searching</NavLink>,
  //   key: 'mail',
  //   // icon: <MailOutlined />,
  // },
  {
    label: <NavLink to="mapsearching">Map Searching</NavLink>,
    key: 'map',
    // icon: <MailOutlined />,
  },
  {
    label: 'IVY',
    key: 'SubMenu',
    // icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        // label: 'Item 1',
        children: [
          {
            label: <NavLink to="messagelist">Message</NavLink>,
            key: 'Message',
          },
          {
            label: <NavLink to="bookinglist">Booking</NavLink>,
            key: 'Booking',
          },
          {
            label: <a href="" target="_blank" rel="noopener noreferrer">
              Log out
            </a>,
            key: 'Log out',
          },


        ],
      },

    ],
  },
  {
    label: <NavLink to="/login">Log in</NavLink>,
    key: 'Log in',
    // icon: <MailOutlined />,
  }
];

const CustomerMenu: React.FC = () => {
  const [current, setCurrent] = useState('Home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <Outlet />
    </div>
  );
};

export default CustomerMenu;



