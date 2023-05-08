import 'react'
import BookingOrderCard from './BookingOrderCard';
import { NavLink, Outlet } from 'react-router-dom';
import { Card } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { AuthContext, AuthData } from './AuthContext'
import { useEffect, useState } from 'react';
import axios from 'axios';


const BookingList = () => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    console.log(authData); // 输出共享的登录数据

    
    useEffect(() => {
        let timer = setTimeout(() => {
           showOrderById()
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const showOrderById = () => {//获取service数据
        axios
            .get('http://51.104.196.52:8090/api/v1/order/my/11', {})//获取该ID的service
            .then((res) => {
                // const service: Service = res.data.data
                console.log(res.data)

            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
            <div>
                <Card title="BoookingOrder List" style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}>
                    <Card
                        className='messagecard'
                        style={{ width: 1200 }}
                        type="inner"
                        title={
                            <span>
                                <ProfileOutlined style={{ marginRight: 8 }} />
                                Home cleanning Service
                            </span>
                        }
                        extra={
                            <NavLink to="order">MORE</NavLink>
                        }>
                        <div>Booking Date:13/5/20023</div>
                        <div>Booking Status: pending</div>
                        <div>Booking Price: 96</div>
                    </Card>
                    <Outlet />
                </Card>
            </div >
    )
}

export default BookingList;