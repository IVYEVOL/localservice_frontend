// import React from 'react'

// function Profile() {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile

import React, { useState } from 'react';
import { Rate, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './providerCss.css';
import profileImg from '../../assets/logo.png'
import { Button, Card, Nav } from "react-bootstrap"

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ServiceReview: React.FC = () => {
    const [value, setValue] = useState(3);
   // const id = profile.name

    return (
        <div>
            <img
                src={profileImg}
                style={{
                display: 'block',
                margin: '20px auto',
                borderRadius: '16px',
                width: '200px',
          }}
        />  
            <div className='servicedesc'>Name: Alex</div>
            <div className='servicedesc'>City: London</div>
            <div className='servicedesc'>Mobile: 12345667 </div>
            <div className='servicedesc'>category: Pet </div>
            {/* <span style={{ display: 'inline' }}>
                <Rate disabled defaultValue={2} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
            </span> */}
        </div>

    );
};

export default ServiceReview;





