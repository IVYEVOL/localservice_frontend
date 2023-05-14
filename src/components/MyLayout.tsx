import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Layout, Menu, Row, Space } from 'antd';
import React, { useState } from 'react';
import { defaultImg as logo, removeToken, removeUser } from '../utils/tools';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from 'antd/lib/skeleton/Title';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const { Header, Sider, Content } = Layout;
const sideMenuData = [
  {
    key: '/admin/new_service_provider',
    icon: <DashboardOutlined />,
    label: 'New Service Provider',
  },
  {
    key: '/admin/service_audit',
    icon: <UserOutlined />,
    label: 'Service Audit',
  },
  {
    key: '/admin/review_management',
    icon: <UserOutlined />,
    label: 'Review Management',
  },

  // {
  //   key: '/admin/message',
  //   icon: <UserOutlined />,
  //   label: 'Message',
  // },
  // {
  //   key: '/logout',
  //   icon: <UserOutlined />,
  //   label: 'Log out',
  // },
  // {
  //   key: '3',
  //   icon: <UploadOutlined />,
  //   label: 'nav 3',
  //   children: [
  //     {
  //       label: 'sub1',
  //       key: '/admin/sub1',
  //     },
  //     {
  //       label: 'sub2',
  //       key: '/admin/sub2',
  //     },
  //   ],
  // },
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
  
  // console.log('我是children');
  // console.log(children);
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { pathname } = useLocation(); // 获取location中的数据

  // console.log('我是pathname');
  // console.log(pathname);
  
  const tmpOpenKeys = findOpenKeys(pathname);

  // 跳转到service_reviews界面的时候不显示siderbar并collapse
  let menuData: { key: string; icon: JSX.Element; label: string; }[] | ItemType[] | undefined = []
  let sideCollapsed = true
  if (!(pathname.includes('/admin/service_reviews') || pathname.includes('/admin/service_detail'))) {menuData=sideMenuData, sideCollapsed = false}


  return (
    <Layout style={{ width: '100vw', height: '100vh' }} id="components-layout-demo-custom-trigger">
      <Sider width={200} trigger={null} collapsible collapsed={sideCollapsed}>
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
          items={menuData}
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
                // {
                //   label: 'Dashboard',
                //   key: 'dashboard',
                // },
                {
                  label: (
                    <span
                      onClick={() => {
                        removeUser();
                        removeToken();
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