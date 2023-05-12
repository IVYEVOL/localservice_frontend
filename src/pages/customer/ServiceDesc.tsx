import React, { useEffect, useState } from 'react'
import { Rate, Avatar, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './customerccss.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import PayService from './PayService';
import { useContext } from 'react';
import axios from 'axios';



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

interface ServiceDescProps {
    serviceData: Service;
}


const ServiceDesc: React.FC<ServiceDescProps> = ({ serviceData }) => {
    console.log("当前获取到的service")
    console.log(serviceData)
    console.log(serviceData.ID)
    serviceData

    const PayButton: React.FC = () => ( 
        <Space wrap>
            <Button className='paybutton' type="primary">Book</Button>
        </Space>
    );

    return (
        <div>
            <div className='servicename'>{serviceData.title}</div>
            <div><img className='serviceimage' alt="Loading" src={`http://51.104.196.52:8090/upload/${serviceData.photos}`} /></div>
            <div className='serviceprice'>￡{serviceData.prices}</div>
            <div className='servicedesc'>Description: {serviceData.description}</div>
            <div className='servicedesc'>Availability: {serviceData.city} {serviceData.availibility}</div>
            <div className='servicedesc'>Service Address: {serviceData.address}</div>
            <div className='servicedesc'>Phone: {serviceData.mobile}</div>

            {/* <div className='servicerate'>Rate：<Rate disabled defaultValue={3} /></div> */}

            <Link to={`/customer/viewservice/${serviceData.ID}/payservice`}>
                <PayButton />
            </Link>
            

            {/* <Routes>
                <Route  path={`/customer/viewservice/${serviceData.ID}/payservice`} element={<PayService />}></Route>
            </Routes> */}
            <Outlet/>
        </div>
    );

};

export default ServiceDesc;




