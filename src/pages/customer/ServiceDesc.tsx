import React, { useEffect, useState } from 'react'
import { Space, Button } from 'antd';
import './customerccss.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';



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


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            setIsLoggedIn(true);
        }
        console.log(user)
    }, []);


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
            <div><img className='serviceimage' alt="Loading" src={`http://51.104.196.52:8090/${serviceData.photos}`} /></div>
            <div className='serviceprice'>￡{serviceData.prices}</div>
            <div style={{ margin: 20, width: 600, marginLeft: 150 , fontSize:14}}>Description: {serviceData.description}</div>
            <div style={{ margin: 20, width: 500, marginLeft: 150 ,fontSize:14}}></div>
            <div style={{ margin: 20, width: 500, marginLeft: 150 , fontSize:14}}>Service Address: {serviceData.address}</div>
            <div style={{ margin: 20, width: 500, marginLeft: 150 , fontSize:14}}>Phone: {serviceData.mobile}</div>
            <div style={{ margin: 20, width: 500, marginLeft: 150 , fontSize:14}}>Availability: {serviceData.city} {serviceData.availibility}</div>

            {/* <div className='servicerate'>Rate：<Rate disabled defaultValue={3} /></div> */}


            <div>
                {isLoggedIn ? (
                    <div>
                        <Link to={`/customer/viewservice/${serviceData.ID}/payservice`}>
                            <PayButton />
                        </Link>
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>




            {/* <Routes>
                <Route  path={`/customer/viewservice/${serviceData.ID}/payservice`} element={<PayService />}></Route>
            </Routes> */}
            <Outlet />
        </div>
    );

};

export default ServiceDesc;




