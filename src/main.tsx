import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.css'; // compact theme
import en_GB from 'antd/lib/locale/en_GB';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import App_provider from './App_provider';
import './index.css';
import Login from './pages/login';
import Register from './pages/register';
import Homepage from './pages/homepage';
import Customer from './pages/customer';
import MesssageList from './pages/customer/MessageList';
import ViewService from './pages/customer/ViewService';
import PayService from './pages/customer/PayService';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={en_GB}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/admin/*' element={<App />} />
        <Route path='/provider/*' element={<App_provider />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/customer/messagelist' element={<MesssageList />} />
        <Route path='/customer/viewservice' element={<ViewService />} />
        <Route path='/customer/viewservice/payservice' element={<PayService />} />

      </Routes>
    </ConfigProvider>
  </Router>
)
