import React, { useState } from 'react';
import { Rate, Avatar, Space, Form, Button, Radio, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './providerCss.css'
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import Meta from 'antd/lib/card/Meta';
import TextArea from 'antd/lib/input/TextArea';

interface Review {
    ID: number;
     service_title: string;
    // prices: number;
    customer_name:string;
    customer_email:string;
    customer_phone:string;
    city: string;
    postcode:string;
    address: string;

    
    description: string;
    // address: string;
    // category: string;
    // photos: string;
    status: string;
    CreatedAt: string;
    UpdatedAt: string;
    // DeletedAt: string | null;
    // areas_coverd: number;
    // availibility: string;
    // longitude_latitude: string;
    // mobile: string;
    customer_id: number;
    date: string
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

        if (status == "Completed") {
            addReview();
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
          }
        if(status == "Update"){
            updateDescription();
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        }
        
        
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

      const addReview  = () => {
        getAuthorization();
        axios.request({
          method: "POST",
          url: "http://51.104.196.52:8090/api/v1/update/info/message/add",
          params: {user_id: reviewData.customer_id,order_id:reviewData.ID, status: "Pending", message: "Please add review"}
        }).then((res) => {
            alert("success");
          }
        );
        getAuthorization();
        axios.request({
          method: "POST",
          url: "http://51.104.196.52:8090/api/v1/update/info/add",
          params: {user_id: reviewData.customer_id,order_id:reviewData.ID, status: "Pending", message: "Please add review"}
        }).then((res) => {
            alert("success");
            console.log("updateDescription  info:")
            
          }
        );
      }

      const updateDescription  = () => {
        const message = form.getFieldValue("message");
        console.log(message)

        getAuthorization();
        axios.request({
          method: "POST",
          url: "http://51.104.196.52:8090/api/v1/update/info/add",
          params: {user_id: reviewData.customer_id,order_id:reviewData.ID, status: "Pending", message:message }
        }).then((res) => {
            alert("success");
            console.log("updateDescription  info:")
            
          }
        );
        axios.request({
            method: "POST",
            url: "http://51.104.196.52:8090/api/v1/update/info/message/add",
            params: {user_id: reviewData.customer_id,order_id:reviewData.ID, status: "Pending", message: "Please update descrition"}
          }).then((res) => {
              alert("success");
            }
          );
      }
      
     
    
    
    
    
        
      const [form] = Form.useForm();

    return (
      
        <div style={{ padding: '24px', justifyContent: 'center' }} >
            <Avatar size="small" icon={<UserOutlined/>}/>
            <div style={{ display: 'inline' ,fontSize: '14px'}} >order detail</div>
            <Card
                hoverable
                style={{ height: '100vh', maxWidth: '80%', margin: 'auto' }}
                // cover={<img alt="example" src={`http://51.104.196.52:8090/${service.photos}`} style={{ height: '180px',width:'400px' ,objectFit: 'cover' }} />}
            >
                <Meta
                    title={<div style={{ fontSize: '18px' }}>{reviewData.service_title}</div>}
                                      
                />

                <div style={{ marginTop: '30px' }}>
                    {/* <span style={{ fontSize: '14px' }}>Description: </span>
                    <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '10px' }}>{service.description}</div> */}
                       <span style={{ fontSize: '14px' }}>Custom name: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.customer_name}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Custom email: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.customer_email}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Custom phone: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.customer_phone}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Description: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.description}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Address: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.address}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Postcode: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.postcode}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Date: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.date}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>CreatedAt: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.CreatedAt}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>UpdatedAt: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.UpdatedAt}</div>
                        <br />
                        <br />
                        <span style={{ fontSize: '14px' }}>Status: </span>
                        <div style={{ display: 'inline', fontWeight: 'bold', fontSize: '14px' }}>{reviewData.status}</div>
                        </div>
                        <br />
                        
                        <Form
                            labelCol={{ span: 14 }}
                            wrapperCol={{ span: 34 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                            form={form}
                        >
                        <Form.Item name="status" >
                            <Radio.Group  >
                            <Radio onClick={() => document.getElementById('provider_textarea')!.style.display = 'none'} style={{ display: 'inline-block', fontSize: '14px' }} value="Accepted">
                                Accepted
                            </Radio>
                            <Radio onClick={() => document.getElementById('provider_textarea')!.style.display = 'none'}  style={{ display: 'inline-block', fontSize: '14px' }} value="Rejected">
                                Rejected
                            </Radio>
                            <Radio onClick={() => document.getElementById('provider_textarea')!.style.display = ''} style={{ display: 'inline-block', fontSize: '14px' }} value="Update">
                                Update description
                            </Radio>
                            <Radio onClick={() => document.getElementById('provider_textarea')!.style.display = 'none'} style={{ display: 'inline-block', fontSize: '14px' }} value="Completed">
                                Completed
                            </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div id="provider_textarea" style={{ display: "none" }}>

                            <Form.Item
                            name="status"
                            initialValue={"Pending"}
                            hidden>
                            </Form.Item>

                        <Form.Item
                            name="message"
                            label="Brief description of update requirements"
                            rules={[
                            {
                                required: false,
                                message: 'Please input your phone number!'
                            },

                            ]}
                        >
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 50, marginBottom: 24 }}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                console.log('Change:', e.target.value);
                            }}
                        placeholder="less than 100 characters"
                        />
                        </Form.Item>
                    </div>
                         
                        <Form.Item label="">
                            <Button type="primary" style={{ display: 'inline-block', fontSize: '14px' }} onClick={postFormData}>
                            Change status
                            </Button>
                        </Form.Item>
</Form>

                                </Card>
           
        </div>

    );
};

export default ServiceReview;
