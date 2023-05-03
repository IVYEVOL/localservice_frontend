import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import ViewService from './ViewService';
import { Outlet } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';
import { useLocation } from "react-router-dom";

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
}


const { Meta } = Card;

const ProductCard = () => {

    // const [data, setData] = useState<Service[]>([]); //获取所有的service，这里使用了泛型 <Service[]>，它是一种类型注解，表示 data 是一个数组，其中每个元素都是 Service 类型的对象。
    const [services, setServices] = useState<Service[]>([]);//获取所有的service
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);//获取筛选状态后的service
    

    const location = useLocation();
    const category = new URLSearchParams(location.search).get("category");





    useEffect(() => {
        let timer = setTimeout(() => {
            showTable();
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    const showTable = () => {//获取数据
        axios
            .get('http://51.104.196.52:8090/api/v1/public/service/all_service', {})//获取所有service
            .then((res) => {
                const services: Service[] = res.data.data.map((service: any, index: number) => ({
                    key: index + 1,
                    ID: service.ID,
                    title: service.title,
                    prices: service.prices,
                    city: service.city,
                    photos: service.photos,
                    Status: service.Status,
                    category: service.category
                }));
                setServices(services);//获取所有数据
                // console.log(res.data.data[0])

                const filteredServices = services.filter((service: Service) => service.Status === 'Approved');//获取过滤后的service
                setFilteredServices(filteredServices);
                console.log(filteredServices)


            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const filterServicesCategory = () => {//筛选某一种类的service
    //     const filteredServices = services.filter((service: Service) => (service.Status === 'Approved' && service.category === 'Cleaning'));
    //     setFilteredServices(filteredServices);
    //     console.log(filteredServices)
    // };


    const filterServicesCategory = () => {
        const filteredServices = services.filter((service: Service) =>
            service.Status === "Approved" && service.category === category
        );
        setFilteredServices(filteredServices);
    };


    const showAllServices = () => {//获取所有service
        setFilteredServices(services);
    };

    return (
        <div>
            <HeaderMenu onFilterCategory={filterServicesCategory} />
            <Button onClick={filterServicesCategory}>Filter Services</Button>
            <Button onClick={showAllServices}>Show All Services</Button>
            {filteredServices.map((item) => {
                return (
                    <Card
                        key={item.ID}
                        hoverable
                        className='ProductCard'
                        cover={<img alt='example' style={{ height: 180 }} src={item.photos} />}
                    >
                        <Meta title={item.title} description='' />
                        {/* <div style={{ marginTop: '20px' }}>{item.ID}</div> */}
                        <div className='priceFont'>￡{item.prices}</div>
                        <div className='view'>
                            {/* <div style={{ marginTop: '10px', display: 'inline' }}>Rating: 4.5</div> */}
                            <NavLink className='nav-link' to='viewservice'>
                                VIEW
                            </NavLink>
                        </div>

                    </Card>)
            })}
        </div>
    );
};

export default ProductCard;


