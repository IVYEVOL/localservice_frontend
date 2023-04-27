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
            label: <a href="" target="_blank" rel="noopener noreferrer">
              Message
            </a>,
            key: 'Message',
          },
          {
            label: <a href="" target="_blank" rel="noopener noreferrer">
              Booking
            </a>,
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
    label: <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Log in
    </a>,
    key: 'Log in',
    // icon: <MailOutlined />,
  }
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



