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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ConfigProvider locale={en_GB}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/admin/*' element={<App />} />
        <Route path='/provider/*' element={<App_provider />} />
        
      </Routes>
    </ConfigProvider>
  </Router>
)
