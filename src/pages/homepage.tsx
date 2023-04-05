import React from 'react';
import { Layout, Menu, Col, Row } from 'antd';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';
const { Header, Footer, Sider, Content } = Layout;

function HomePage() {
  return (
    <Layout>
      <MyHeader />

        <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 800,
            }}
          >
            Content Here
            <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
            <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
        </Content>

        <MyFooter />
    </Layout>
  );
}

export default HomePage;