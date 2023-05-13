import React, { useEffect, useState } from 'react';
import { Badge, Descriptions } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';

interface Service {
    key: number;
    ID: number;
    title: string;
    prices: number;
    city: string;
    description: string;
    address: string;
    category: string;
    photos: string;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    areas_coverd: number;
    availibility: string;
    longitude_latitude: string;
    mobile: string;
    user_id: number;
}

const Order: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const orderID = Number(id); // 将id转换为number类型
    console.log('接收的id为' + orderID)
    const [service, setService] = useState<Service>();
    const [order, setOrder] = useState<any>({});

    useEffect(() => {
        let timer = setTimeout(() => {
            showOrderById();

        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const showOrderById = () => {//获取order
        getAuthorization()
        axios
            .get('http://51.104.196.52:8090/api/v1/order/find_by_order?order_id=' + orderID, {})//获取该ID的order
            .then((res) => {
                console.log(res.data.data[0])
                setOrder(res.data.data[0]);
                console.log(order)
                // 在这里调用 showServiceById 函数
                showServiceById(res.data.data[0].service_id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showServiceById = (serviceId: number) => {//获取service数据
        axios
            .get('http://51.104.196.52:8090/api/v1/public/service/' + serviceId, {})//获取该ID的service
            .then((res) => {
                const service: Service = res.data.data
                console.log('服务id')
                console.log(service?.ID); // 获取服务 ID
                setService(service);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Descriptions title="Order detail" bordered style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}>
            <Descriptions.Item label="Product info" span={3}>
                <img style={{ width: 200 }} alt="Loading" src={`http://51.104.196.52:8090/${service?.photos}`} />
                <div>
                    {service?.title}
                </div>
            </Descriptions.Item>
            <Descriptions.Item label="Order ID">{order.ID}</Descriptions.Item>
            <Descriptions.Item label="Name">{order.customer_name}</Descriptions.Item>
            <Descriptions.Item label="Email">{order.customer_email}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{order.customer_phone}</Descriptions.Item>
            <Descriptions.Item label="Postcode">{order.postcode}</Descriptions.Item>
            <Descriptions.Item label="City">{service?.city}</Descriptions.Item>
            
            <Descriptions.Item label="Address" span={3}>{order.address}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text={order.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Amount">￡{service?.prices}</Descriptions.Item>
            <Descriptions.Item label="Time" span={2}>{order.date}</Descriptions.Item>
            <Descriptions.Item label="Description">
                {order.description}
            </Descriptions.Item>
        </Descriptions>
    );
}


export default Order;