import React from 'react'
import { Layout, Menu} from 'antd';
const { Footer } = Layout;

function MyFooter() {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5', padding: '24px', bottom: '0', width: '100%' }}>Footer</Footer>
  )
}

export default MyFooter