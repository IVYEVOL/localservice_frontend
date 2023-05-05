import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.css'; // compact theme
import en_GB from 'antd/lib/locale/en_GB';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerRoutes from './CustomerRoutes';
import AdminRoutes from './AdminRoutes';
import ProviderRoutes from './ProviderRoutes';
import './index.css';
import Login from './pages/login';
import Register from './pages/register';
import Homepage from './pages/homepage';
import Customer from './pages/customer';
import MesssageList from './pages/customer/MessageList';
import ViewService from './pages/customer/ViewService';
import PayService from './pages/customer/PayService';
import ServiceReviewMessage from './pages/customer/ServiceReviewMessage';
// <<<<<<< HEAD
// import "bootstrap/dist/css/bootstrap.min.css"

import CustomerHome from './pages/customer/CustomerHome';
import BookingList from './pages/customer/BookingList';
import Order from './pages/customer/Order';
import UpdateOrder from './pages/customer/UpdateOrder';
import RequestUpdatingMessage from './pages/customer/RequestUpdatingMessage';
import MapSearching from './pages/customer/MapSearching';
import Cleaning from './pages/customer/Cleaning';
// >>>>>>> 301687729728d7e8db15e5a700103aee2083e211

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={en_GB}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/provider/*' element={<ProviderRoutes />} />
        <Route path='/customer/*' element={<CustomerRoutes />}>
          <Route path='cleaning' element={<Cleaning />}></Route>
          <Route index element={<CustomerHome />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='mapsearching' element={<MapSearching />}></Route>
          <Route path='messagelist/*'>
            <Route index element={<MesssageList />} ></Route>
            <Route path='servicereviewmessage' element={<ServiceReviewMessage />} ></Route>
            <Route path='requestupdatingmessage' element={<RequestUpdatingMessage />} ></Route>
          </Route>
          <Route path='viewservice/*'>
            <Route index element={<ViewService />} ></Route>
            <Route path='payservice' element={<PayService />} ></Route>
          </Route>
          <Route path='bookinglist/*'>
            <Route index element={<BookingList />}></Route>
            <Route path='order' element={<Order />}></Route>
          </Route>
          <Route path='updateorder' element={<UpdateOrder />}></Route>
        </Route>
      </Routes>
    </ConfigProvider>
  </Router>
)

