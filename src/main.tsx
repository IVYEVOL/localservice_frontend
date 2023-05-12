import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.css'; // compact theme
import en_GB from 'antd/lib/locale/en_GB';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import CustomerRoutes from './CustomerRoutes';
import AdminRoutes from './AdminRoutes';
import ProviderRoutes from './ProviderRoutes';
import './index.css';
import Login from './pages/login';
import Register from './pages/register';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={en_GB}>
      <Routes>
        <Route path="/" element={<Navigate to="/customer" />} />
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

