import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { defaultImg as logo } from '../utils/tools';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const sideMenuData = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: 'nav 1',
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: 'Profile',
  },
  {
    key: '/admin/order',
    icon: <UserOutlined />,
    label: 'Order',
  },
  {
    key: '/admin/message',
    icon: <UserOutlined />,
    label: 'Message',
  },
  {
    key: '/logout',
    icon: <UserOutlined />,
    label: 'Log out',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
    children: [
      {
        label: 'sub1',
        key: '/admin/sub1',
      },
      {
        label: 'sub2',
        key: '/admin/sub2',
      },
    ],
  },
]
const findOpenKeys = (key: string) => {
  const result: string[] = [];
  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          findInfo(item.children); // 使用递归的方式查找当前页面刷新之后的默认选中项
        }
      }
    });
  };
  return result;
};

const MyLayout = ({ children }: any) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { pathname } = useLocation(); // 获取location中的数据
  const tmpOpenKeys = findOpenKeys(pathname);


  return (
    <Layout style={{ width: '100vw', height: '100vh' }} id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="LocalService" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={tmpOpenKeys}
          defaultSelectedKeys={tmpOpenKeys}
          onClick={({key})=>{
            // alert(key);
            navigate(key)
          }}
          items={sideMenuData}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span className='app-title'>Admin</span>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Dashboard',
                  key: 'dashboard',
                },
                {
                  label: (
                    <span
                      onClick={() => {
                        // console.log('Logout');
                        navigate('/');
                      }}
                    >
                      Logout
                    </span>
                  ),
                  key: 'logOut',
                },
              ],
            }}
          >
            <img
              src={logo}
              style={{
                width: '30px',
                borderRadius: '50%',
                float: 'right',
                marginTop: '16px',
                marginRight: '20px',
              }}
            />
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;