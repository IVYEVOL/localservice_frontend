import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "./customerccss.css"
import { getAuthorization, removeToken, getUser } from '../../utils/tools';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface UserData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  email: string;
  password: string;
  nick_name: string;
  avatar: string;
  mobile: string;
  role: string;
}

const CustomerMenu: React.FC = () => {
  const [userdetail, setUserdetail] = useState<UserData>()
  const userJson = Cookies.get('user');
  const user = userJson ? JSON.parse(userJson) : {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user');
    setIsLoggedIn(false);
  };


  useEffect(() => {
    let timer = setTimeout(() => {
      getUserData()
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const getUserData = () => {
    getAuthorization();
    axios.request({
      method: "GET",
      url: "http://51.104.196.52:8090/api/v1/user/" + user.user_id,
    }).then((ret) => {
      console.log(ret.data.data)
      setUserdetail(ret.data.data)
      console.log("userdetail")
      // console.log(userdetail)
    }
    );
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div>
          <NavLink to="/customer"><img src='http://127.0.0.1:5173/src/assets/findserviceLogo.png' alt="Logo" height={40} style={{ margin: 10 }} /></NavLink>
        </div>
      ),
      key: 'logo',
      style: { marginLeft: 100 },
    },
    {
      label: <NavLink to="/customer" style={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}>Home</NavLink>,
      key: 'Home',
      style: { margin: 10, marginLeft: 700 },
      // icon: <MailOutlined />,
    },
    {
      label: 
       <div style={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}><img className="profile-avatar2"
        src={`http://51.104.196.52:8090/${userdetail?.avatar}`}
        alt="Profile" />
        {userdetail?.nick_name}
      </div>,
      key: 'SubMenu',
      // icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          // label: 'Item 1',
          children: [
            {
              label: <NavLink to="profile">Profile</NavLink>,
              key: 'profile',
              style: { margin: 2 },

            },
            {
              label: <NavLink to="messagelist">Message</NavLink>,
              key: 'Message',
              style: { margin: 2 },

            },
            {
              label: <NavLink to="bookinglist">Booking</NavLink>,
              key: 'Booking',
              style: { margin: 2 },

            },
            {
              label: (
                <span
                  onClick={() => {
                    removeToken();
                    console.log('Logout');
                    navigate('/');
                  }}
                >
                  Logout
                </span>
              ),
              key: 'Log out',
              style: { margin: 2 },

            },
          ],
        },

      ],
      style: { margin: 10 },
    },
    {
      label: <NavLink to="/customer/login" style={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}>Log in</NavLink>,
      key: 'Log in',
      // icon: <MailOutlined />,
      style: { margin: 10 },
    },
  ];

  const navigate = useNavigate();
  const [current, setCurrent] = useState('Home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    
    <div  >
      <Menu
        theme='light'
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items} />
      <Outlet />

    </div>
  );
};

export default CustomerMenu;



