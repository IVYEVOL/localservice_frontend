import { Routes, Route } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import Dashboard from './pages/dashboard'
import Users from './pages/customer/profile'
import CustomerMenu from './pages/customer/CustomerMenu'
import { Layout, Menu, Col, Row } from 'antd';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
const { Header, Footer, Sider, Content } = Layout;
import HeaderMenu from './pages/customer/HeaderMenu'
import SearchCity from './pages/customer/SearchCity'
import ProductCard from './pages/customer/ProductCard'
import './pages/customer/customerccss.css'



function CustomerRoutes() {

  return (

    <div>
      {/* <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 800,
        }}
      > */}
        <CustomerMenu />
        <SearchCity />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      {/* </Content> */}
{/* 
      <MyFooter /> */}
      

    </div>






  )
}

export default CustomerRoutes