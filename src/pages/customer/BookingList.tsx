import React from 'react';
import BookingOrderCard from './BookingOrderCard';
import { NavLink, Outlet } from 'react-router-dom';
import { Card } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { AuthContext, AuthData } from './AuthContext'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthorization } from '../../utils/tools';
import Cookies from 'js-cookie';

interface Order {
    ID: number;
    customer_id: number;
    service_id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address: string;
    city: string;
    postcode: string;
    date: string;
    description: string;
    status: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    title: string;
}



const BookingList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const userJson = Cookies.get('user');
    const user = userJson ? JSON.parse(userJson) : {};
    console.log(user.user_id)
    const [services, setServices] = useState<any[]>([]);


    useEffect(() => {
        let timer = setTimeout(() => {
            showOrderById()
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const showOrderById = () => {
        getAuthorization();
        axios
            .get('http://51.104.196.52:8090/api/v1/order/my/' + user.user_id, {})
            .then(async (res) => {
                console.log(res.data);
                setOrders(res.data.data);

                // 获取每个订单的服务信息
                const fetchedServices = await Promise.all(
                    res.data.data.map((order: Order) => showServiceById(order.service_id))
                );

                setServices(fetchedServices);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showServiceById = (serviceId: number): Promise<any> => {
        return axios
            .get('http://51.104.196.52:8090/api/v1/public/service/' + serviceId, {})
            .then((res) => {
                console.log("res.data.data");
                console.log(res.data.data);

                return res.data.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Card title="BoookingOrder List" style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}>
                {orders.map((order, index) => (
                    <Card
                        className='messagecard'
                        style={{ width: 1200 }}
                        type="inner"
                        title={
                            <span>
                                <span>
                                    <ProfileOutlined style={{ marginRight: 8 }} />
                                    Service: {services[index]?.title}
                                </span>
                            </span>
                        }
                        extra={
                            <NavLink to={`order/${order.ID}`}>MORE</NavLink>
                        }>
                        <div>
                            Booking Date: {new Date(order.CreatedAt).toISOString().substring(0, 10)} {new Date(order.CreatedAt).toISOString().substring(11, 19)}
                        </div>
                        <div>Booking Status: {order.status}</div>
                    </Card>
                ))}
                <Outlet />
            </Card>
        </div >
    )
}

export default BookingList;