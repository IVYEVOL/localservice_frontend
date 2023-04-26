import React, { useState } from 'react';
import { Rate, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './customerccss.css'


const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ServiceReview: React.FC = () => {
    const [value, setValue] = useState(3);

    return (
        <div className='ServiceReview'>
            <Avatar size="small" icon={<UserOutlined />} />
            <div style={{ display: 'inline' }}>Julia</div>
            <span style={{ display: 'inline' }}>
                <Rate disabled defaultValue={2} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
            </span>
            <div>xxxxxxxxxxxxxxxxxxx customers review</div>
        </div>

    );
};

export default ServiceReview;





