import React from 'react';
import { Card } from 'antd';
import './customerccss.css';

const MessageCard: React.FC = () => (
  <Card title="Message List">
    <Card className='messagecard' type="inner" title="Request updating for your order" extra={<a href="#">More</a>}>
      There are some details for you to update
    </Card>
    <Card
      className='messagecard'
      type="inner"
      title="Review the service!"
      extra={<a href="#">More</a>}>
      There are service for you to review
    </Card>
  </Card>
);

export default MessageCard;

