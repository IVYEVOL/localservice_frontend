
import { Layout, Menu } from 'antd';
const { Header } = Layout;

function MyHeader() {
  return (
    <Header>
      <div/>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Menu.Item key="1">Homepage</Menu.Item>
        <Menu.Item key="2" style={{ marginLeft: 'auto' }}>Login</Menu.Item>
      </Menu>
    </Header>
  )
}

export default MyHeader