import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Navigate, Route } from 'react-router';
import MesssageList from './MessageList';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "./customerccss.css"
import { getAuthorization, removeToken } from '../../utils/tools';
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
  // console.log(user.user_id)


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
      url: "http://51.104.196.52:8090/api/v1/user/" + user.user_id,  //这里不能写死28
    }).then((ret) => {
      console.log(ret.data.data)
      setUserdetail(ret.data.data)
      console.log("userdetail")
      // console.log(userdetail)
    }
    );
  };

 

const navigate = useNavigate();const items: MenuProps['items'] = [
  {
    label: (
      <div>
        <NavLink to="/customer"><img src='http://51.104.196.52:8090/upload/findserviceLogo.png' alt="Logo" height={40} style={{ margin: 10 }} /></NavLink>
      </div>
    ),
    key: 'logo',
    style: { marginLeft: 100 },
  },
  {
    label: <NavLink to="/customer" style={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}>Home</NavLink>,
    key: 'Home',
    style: { margin: 10, marginLeft: 700 },
  },
  userJson ? (
    {
      label: (
        <div style={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}>
          <img
            className="profile-avatar2"
            src={`http://51.104.196.52:8090/${userdetail?.avatar}`}
            alt="Profile"
          />
          {userdetail?.nick_name}
        </div>
      ),
      key: 'SubMenu',
      children: [
        {
          type: 'group',
          children: [
            {
              label: <NavLink to="customer/profile">Profile</NavLink>,
              key: 'profile',
              style: { margin: 2 },
            },
            {
              label: <NavLink to="customer/messagelist">Message</NavLink>,
              key: 'Message',
              style: { margin: 2 },
            },
            {
              label: <NavLink to="customer/bookinglist">Booking</NavLink>,
              key: 'Booking',
              style: { margin: 2 },
            },
            {
              label: (
                <span
                  onClick={() => {
                    removeToken();
                    Cookies.remove('user'); // 这将删除名为'user'的Cookie项
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
    }
  ) : null,
  !userJson ? (
    {
      label: (
        <NavLink to="/customer/login" style={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}>
          Log in
        </NavLink>
      ),
      key: 'Log in',
      style: { margin: 10 },
    }
  ) : null,
].filter((item) => item !== null);

const [current, setCurrent] = useState('Home');

const onClick: MenuProps['onClick'] = (e) => {
  console.log('click ', e);
  console.log(e.key);

  // if(e.key == "Log out"){
  //   console.log('logout在这');
  //     removeToken()
  //     useNavigate()('/')
  // }


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


