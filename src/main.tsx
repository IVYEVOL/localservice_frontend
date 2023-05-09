import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.css'; // compact theme
import en_GB from 'antd/lib/locale/en_GB';
// import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
import Profile from './pages/customer/profile';
import PayServiceWrapper from './pages/customer/PayServiceWrapper';
// >>>>>>> 301687729728d7e8db15e5a700103aee2083e211

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={en_GB}>
      <Routes>
        <Route path="/" element={<Navigate to="/customer/" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/provider/*' element={<ProviderRoutes />} />
        <Route path='/customer/*' element={<CustomerRoutes />}>
        </Route>
      </Routes>
    </ConfigProvider>
  </Router>
)

