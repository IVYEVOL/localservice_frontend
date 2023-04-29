import React from 'react';
import { Badge, Descriptions } from 'antd';

const Order: React.FC = () => (
    <Descriptions title="Order detail" bordered>
        <Descriptions.Item label="Product info" span={3}>
            <img style={{width: 200}} alt="Loading" src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg" />
            <div>
                Home Cleaninng Service 
            </div>
        </Descriptions.Item>
        <Descriptions.Item label="Name">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Email">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Phone Number">YES</Descriptions.Item>
        <Descriptions.Item label="Postcode">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="City" span={2}>
            2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>Address</Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Time" span={2}>$20.00</Descriptions.Item>

        <Descriptions.Item label="Description">
            yixiebeizhufhuiafhsiudfdgggggggggggggggggggggggggggggggggggggggggggggggg
        </Descriptions.Item>
    </Descriptions>
);

export default Order;