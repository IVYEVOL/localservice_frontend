import React, { useState } from 'react';
import { Rate, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './customerccss.css'

interface Review {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    user_id: number;
    service_id: number;
    content: string;
}

interface ServiceReviewProps {
    reviewData: Review;
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ServiceReview: React.FC<ServiceReviewProps> = ({reviewData}) => {
    

    const [value, setValue] = useState(3);

    return (
        <div className='ServiceReview'>
            <Avatar size="small" icon={<UserOutlined />} />
            <div style={{ display: 'inline' }}>Julia</div>
            <span style={{ display: 'inline' }}>
                <Rate disabled defaultValue={2} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
            </span>
            <div>{reviewData.content}</div>
        </div>

    );
};

export default ServiceReview;





