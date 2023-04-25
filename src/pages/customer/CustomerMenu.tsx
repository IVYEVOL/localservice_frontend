import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Map Searching',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Name',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        // label: 'Item 1',
        children: [
          {
            label: 'Message',
            key: 'Message',
          },
          {
            label: 'Booking',
            key: 'Booking',
          },
          {
            label: 'Log out',
            key: 'Log out',
          },
        ],
      },
      
    ],
  },
];

const CustomerMenu: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default CustomerMenu;

