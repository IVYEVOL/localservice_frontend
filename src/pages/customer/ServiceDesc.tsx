import React from 'react'
import { Rate, Avatar, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './customerccss.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const ServiceDesc = () => {

    const PayButton: React.FC = () => (
        <Space wrap>
            <Button className='paybutton' type="primary">Pay</Button>
        </Space>
    );

    return (
        <div>
            <div className='servicename'>Home Cleaning Service</div>
            <div><img className='serviceimage' alt="Loading" src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg" /></div>
            <div className='serviceprice'>￡13.95</div>
            <div className='servicedesc'>Eligible for Shipping To Southampton or somewhere else</div>
            <div className='servicerate'>Rate：<Rate disabled defaultValue={3} /></div>

           <NavLink to='payservice'><PayButton /></NavLink> 
<Outlet/>
        </div>
    );

};

export default ServiceDesc;




