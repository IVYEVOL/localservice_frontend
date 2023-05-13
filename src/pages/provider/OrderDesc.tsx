import React, { useState } from 'react';
import { Rate, Avatar, Space, Form, Button, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './providerCss.css'
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';

interface Review {
    ID: number;
    // title: string;
    // prices: number;
     city: String;
    
    // description: string;
    // address: string;
    // category: string;
    // photos: string;
    status: String;
    // CreatedAt: string;
    // UpdatedAt: string;
    // DeletedAt: string | null;
    // areas_coverd: number;
    // availibility: string;
    // longitude_latitude: string;
    // mobile: string;
    // user_id: number;
}

interface ServiceReviewProps {
    reviewData: Review;
}

// const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ServiceReview: React.FC<ServiceReviewProps> = ({reviewData}) => {
    

    const [value, setValue] = useState(3);
    

    const postFormData  = () => {
        getAuthorization();
        const status = form.getFieldValue("status");
        
        //console.log("--------------status:"+status)
        
        //token暂时写死
        // axios.defaults.headers.common['Authorization'] = "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6NCwiRW1haWwiOiIyIiwic3ViIjoiVG9rZW4iLCJleHAiOjE2ODM2NTE3OTUsImlhdCI6MTY4MzY0OTk5NX0.VvujZG0p3I8Z75HK840QF777XLlRB9f0SKbSU5YyKLA";
        axios.request({
          method: "PATCH",
          url: "http://51.104.196.52:8090/api/v1/order/update_status/" + reviewData.ID,
          params: { status:status}
        }).then((res) => {
            alert("success");
          }
        );
      }
      
      function showFormData() {
        console.log(form.getFieldsValue());//Get all form data
    
          //If the form data has not been changed, the data obtained will be undefined
      }
    
    
    
        
      const [form] = Form.useForm();

    return (
      
        <div className='ServiceReview' style={{marginTop:40}}>
            <Avatar size="small" icon={<UserOutlined/>}/>
            <div style={{ display: 'inline' }}>Anonymous</div>
            <div>{reviewData.status}</div>
            <Form
             labelCol={{ span: 4 }}
             wrapperCol={{ span: 14 }}
             layout="horizontal"
             style={{ maxWidth: 600 }}
             form={form}
            >
                <Form.Item name="status" label="Radio">
                    <Radio.Group>
                        <Radio value="accepted"> accepted </Radio>
                         <Radio value="rejected"> Rejected </Radio>
                    </Radio.Group>
            </Form.Item>
            <Form.Item label="Button">
             <Button type="primary" onClick={postFormData}>Button</Button>
            </Form.Item>
          </Form>
        </div>

    );
};

export default ServiceReview;
