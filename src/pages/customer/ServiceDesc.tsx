import React, { useEffect, useState } from 'react'
import { Rate, Avatar, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './customerccss.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import PayService from './PayService';
import { useContext } from 'react';
import axios from 'axios';


interface ServiceDescProps {
    serviceId: number;
}

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



const ServiceDesc: React.FC<ServiceDescProps> = ({ serviceId }) => {
    console.log("当前获取到的serviceID：" + serviceId)

    const [services, setServices] = useState<Service[]>([]);//获取所有的service
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);//获取筛选状态后的service
    const [targetService, setTargetService] = useState<Service | null>(null);//获取应该显示在本页面的service对象


    useEffect(() => {
        let timer = setTimeout(() => {
            showTable();
           
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    const showTable = () => {//获取service数据
        axios
            .get('http://51.104.196.52:8090/api/v1/public/service/all_service', {})//获取所有service
            .then((res) => {
                const services: Service[] = res.data.data.map((service: any, index: number) => ({
                    key: index,
                    ID: service.ID,
                    title: service.title,
                    prices: service.prices,
                    city: service.city,
                    photos: service.photos,
                    Status: service.Status,
                    category: service.category,
                    DeletedAt: service.DeletedAt,
                    CreatedAt: service.DeletedAt,
                    UpdatedAt: service.DeletedAt,
                    areas_coverd: service.areas_coverd,
                    availibility: service.availibility,
                    longitude_latitude: service.longitude_latitude,
                    mobile: service.mobile,
                    user_id: service.user_id,
                }));
                setServices(services);//获取所有数据
                // console.log(res.data.data)

                const filteredServices = services.filter((service: Service) =>
                    service.Status === 'Approved' && service.DeletedAt === null
                );
                //获取所有 approvedservice
                setFilteredServices(filteredServices);
                // console.log(filteredServices)

                const targService = filteredServices.filter((service: Service) => service.ID === serviceId)[0];
                setTargetService(targService)
                // console.log(targetService)
                // console.log(targService)
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const PayButton: React.FC = () => (
        <Space wrap>
            <Button className='paybutton' type="primary">Pay</Button>
        </Space>
    );

    return (
        <div>
            <div className='servicename'>{targetService?.title}</div>
            <div><img className='serviceimage' alt="Loading" src={targetService?.photos} /></div>
            <div className='serviceprice'>￡{targetService?.prices}</div>
            <div className='servicedesc'>Eligible for Shipping To Southampton or somewhere else{targetService?.description}</div>
            <div className='servicerate'>Rate：<Rate disabled defaultValue={3} /></div>

            <Link to='/customer/viewservice/payservice'>
                <PayButton />
            </Link>

            <Routes>
                <Route path='/customer/viewservice/payservice' element={<PayService />}></Route>
            </Routes>
        </div>
    );

};

export default ServiceDesc;




