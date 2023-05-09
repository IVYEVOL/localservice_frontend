import React from 'react';
import { Card } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const MessageCard: React.FC = () => (
  <Card title="Message List">
    <Card
      className='messagecard'
      type="inner"
      title="Request updating for your order"
      extra={
        <NavLink to = "requestupdatingmessage">MORE</NavLink>
      }>
      There are some details for you to update
    </Card>
    <Card
      className='messagecard'
      type="inner"
      title="Review the service!"
      extra={<NavLink to = "servicereviewmessage">MORE</NavLink>}>
      There are service for you to review
    </Card>
    <Outlet/>
  </Card>
);

export default MessageCard;

