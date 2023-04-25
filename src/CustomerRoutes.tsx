import { Routes, Route } from 'react-router-dom'
import MyLayout from "./components/MyLayout"
import Dashboard from './pages/dashboard'
import Users from './pages/customer/profile'
<<<<<<< HEAD
import CustomerMenu from './pages/customer/CustomerMenu'
import { Layout, Menu, Col, Row } from 'antd';
import MyHeader from './components/MyHeader';
import MyFooter from './components/MyFooter';
const { Header, Footer, Sider, Content } = Layout;
import HeaderMenu from './pages/customer/HeaderMenu'
import SearchCity from './pages/customer/SearchCity'
import ProductCard from './pages/customer/ProductCard'
import './pages/customer/customerccss.css'
=======
>>>>>>> 1bf789d574e9f7a3c2d52524a374381e9e6a4b27


function CustomerRoutes() {

  return (
<<<<<<< HEAD


    <div>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 800,
        }}
      >
        <CustomerMenu />
        <SearchCity />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Content>

      <MyFooter />

    </div>




=======
    <MyLayout>
      <Routes>

      </Routes>
    </MyLayout>
>>>>>>> 1bf789d574e9f7a3c2d52524a374381e9e6a4b27
  )
}

export default CustomerRoutes