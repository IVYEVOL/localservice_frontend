// import React from 'react'

// import serviceList from '../../provider_data/services.json'
// // import "bootstrap/dist/css/bootstrap.min.css"
// import { Col, Row } from "react-bootstrap"
// import {ServiceLayout}  from '../../components/ServiceLayout'


// function ServiceList() {
//   return (
//     <>
//       <h1> Service List</h1>
//       <Row md={2} xs={1} lg={3} className="g-3">
//         {serviceList.map(item => (
//           <Col key={item.id}>
//             <ServiceLayout {...item} />
//           </Col>
//         ))}
//       </Row>
//     </>

//   )
// }

// export default ServiceList
import React, { useEffect, useState } from 'react';
import { Card, Col, Pagination, Row } from 'antd';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import SearchCity from './SearchCity';
import HeaderMenu from './HeaderMenu';
import { AuthContext, AuthData } from "./AuthContext";
import Cookies from 'js-cookie';
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

const PAGE_SIZE = 6;
const { Meta } = Card;
const ServiceList = () => {
    // get user id
    const userJson = Cookies.get('user');
    const user = userJson ? JSON.parse(userJson) : {};
    console.log(user.user_id)



    const [services, setServices] = useState<Service[]>([]);//approved的service
    const [total, setTotal] = useState(0);//services的总数量
    const [currentPage, setCurrentPage] = useState(1);//当前所在的页数
    // const [category, setCategory] = useState<string>('All');//获取当前用户选中的category
    // const [city, setCity] = useState<string>('none');//获取当前用户选中的category
    const [authData, setAuthData] = useState<AuthData | null>(null);

    // useEffect(() => {
    //     fetchServices(currentPage);

    // }, [currentPage, category, city]);

    useEffect(() => {
      fetchServices(currentPage);

  }, [currentPage]);

    const fetchServices = (page: number) => {
        getAuthorization();
        let url = 'http://51.104.196.52:8090/api/v1/service/provider_service/'+ user.user_id ;//'http://51.104.196.52:8090/api/v1/service/provider_service/'+ user.user_id
        // if (category !== 'All' && city == 'none') {//点击除了all之外的按钮时
        //     url = `http://51.104.196.52:8090/api/v1/public/service/category?category=${category}`;
        //     console.log(11111111111111)
        // }
        // if (category !== 'All' && city !== 'none') {
        //     url = `http://51.104.196.52:8090/api/v1/public/service/city_n_cat?category=${category}&city=${city}`
        //     console.log(22222222222)
        // }
        //axios.defaults.headers.common['Authorization'] = "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjgsIkVtYWlsIjoicHJvdmlkZXIxIiwic3ViIjoiVG9rZW4iLCJleHAiOjE2ODM2NzU3OTUsImlhdCI6MTY4MzY3Mzk5NX0.2KOGRbqd9GhhsEORED6ZZJU1izo56TMHZjOksa0IGzM";
        axios
            .get(url, {//获取approved的service
                // page,
                // limit: PAGE_SIZE,
            })
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

                setServices(services);
                // setServices(res.data.services);
                setTotal(res.data.total);
                console.log(services);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const filterServicesCategory = (category: string) => {
        setCurrentPage(1);
        // setCategory(category);
        fetchServices(1);
    };

    const filterServicesCity = (city: string) => {//headermenu 的回调函数，通过这样使headermenu在点击button时可以传递需要筛选的种类
        setCurrentPage(1);
        // setCity(city);
        console.log('choose' + city);
        fetchServices(1);
    };



    return (
        
            <div style={{ padding: '24px', justifyContent: 'center' }}>

                {/* <HeaderMenu onFilterCategory={filterServicesCategory} />
                <SearchCity onCityChange={filterServicesCity} /> */}

                <Row gutter={[16, 16]} style={{ marginTop: 40 }}>
                    {services.map((service) => (
                        <Col xs={24} sm={12} md={8} key={service.ID}>
                            <NavLink to={`/provider/viewservice/${service.ID}`}>
                                <Card
                                    hoverable
                                    style={{ height: '340px', width: '280px', margin: 'auto' }}
                                    // cover={<img alt="example" src={`http://51.104.196.52:8090/${service.photos}`} style={{ height: '180px',width:'400px' ,objectFit: 'cover' }} />}
                                    cover={<img
                                      alt="example"
                                      src={`http://51.104.196.52:8090/${service.photos}`}
                                      style={{ height: '180px', width: '280px', objectFit: 'cover' }} />}
                                >
                          
                                    <Meta
                                        title={<div style={{ fontSize: '18px' }}>{service.title}</div>}
                                        description={<div style={{ fontSize: '12px' }}>{service.city}</div>}
                                    />

                                    <div style={{ marginTop: '50px' }}>
                                        <span style={{ fontSize: '14px' }}>Price: </span>
                                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '20px' }}>￡{service.prices}</div>
                                        <br />
                                        <span style={{ fontSize: '14px' }}>Service status: </span>
                                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{service.Status}</div>
                                        
                                    </div>
                                </Card>
                            </NavLink>
                        </Col>
                    ))}
                </Row>

                <div style={{ textAlign: 'center' }}>
                    <Pagination
                        style={{ margin: 10 }}
                        current={currentPage}
                        pageSize={PAGE_SIZE}
                        total={total}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        
    );
};

export default ServiceList;
