import React, { createContext, useEffect, useState } from 'react';
import { Button, Card, Pagination, Table } from 'antd';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import ViewService from './ViewService';
import { Outlet } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';
import { useLocation } from "react-router-dom";
import SearchCity from './SearchCity';

const { Meta } = Card;

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


export const ServiceContext = React.createContext<Service[]>([]);
const PAGE_SIZE = 6; // 每页显示的条目数


const ProductCard = () => {

    // const [data, setData] = useState<Service[]>([]); //获取所有的service，这里使用了泛型 <Service[]>，它是一种类型注解，表示 data 是一个数组，其中每个元素都是 Service 类型的对象。
    const [services, setServices] = useState<Service[]>([]);//获取所有的service
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);//获取筛选状态后的service
    const [category, setCategory] = useState<string>('none');//获取当前用户选中的category
    const [currentPage, setCurrentPage] = useState(1);



    console.log('初始值' + category)

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
                console.log(res.data.data)

                const filteredServices = services.filter((service: Service) =>
                    service.Status === 'Approved' && service.DeletedAt === null
                );
                //获取所有 approvedservice
                setFilteredServices(filteredServices);
                // console.log(filteredServices)

                ServiceContext.Provider({ value: filteredServices });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const filterServicesCategory = (category: string) => {//headermenu 的回调函数，通过这样使headermenu在点击button时可以传递需要筛选的种类
        if (category == 'All') {
            setFilteredServices(services);
            setCategory(category);
            console.log("进入" + category)
        }
        else {
            const filteredServices = services.filter((service: Service) =>
                service.Status === "Approved" && service.category === category
            );
            setCategory(category);
            setFilteredServices(filteredServices);
            console.log(category)
            console.log(filteredServices)
            console.log("进入" + category)
        }
        // setCurrentPage(1); // 每次筛选完后，回到第一页
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);

    // const showAllServices = () => {//获取所有service
    //     setFilteredServices(services);
    // };


    const filterServicesCity = (city: string) => {//headermenu 的回调函数，通过这样使headermenu在点击button时可以传递需要筛选的种类
        if (category == 'All' || category == 'none') {
            const filteredServices = services.filter((service: Service) =>
                service.Status === "Approved" && service.city === city
            );
            setFilteredServices(filteredServices);
            console.log("当前处于" + category)
        }
        else {
            const filteredServices = services.filter((service: Service) =>
                service.Status === "Approved" && service.category === category && service.city === city
            );
            setFilteredServices(filteredServices);
            console.log(filteredServices)
            console.log("当前处于" + category)
        }

    };



    return (
        <div>

            <HeaderMenu onFilterCategory={filterServicesCategory} />
            <SearchCity onCityChange={filterServicesCity} />
            {/* {filteredServices.map((item) => { */}
            {paginatedServices.map((item) => {
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
                        <div>Area：{item.city}</div>
                        <div className='view'>
                            {/* <div style={{ marginTop: '10px', display: 'inline' }}>Rating: 4.5</div> */}
                            <NavLink className='nav-link' to={`/customer/viewservice/${item.ID}`}>
                                VIEW
                            </NavLink>
                        </div>
                        <Outlet />
                    </Card>)
            })}

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={PAGE_SIZE}
                    total={filteredServices.length}
                    onChange={onPageChange}
                />
            </div>

        </div>
    );
};

export default ProductCard;



