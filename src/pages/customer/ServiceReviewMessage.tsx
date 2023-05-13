import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { Button, Form, Input, InputNumber } from 'antd';
import { Card, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import Cookies from 'js-cookie';

interface RateStarProps {
    rating: number;
    setRating: (value: number) => void;
}



const ServiceReviewMessage = () => {
    const { id, id2 } = useParams<{ id: string; id2: string }>();
    const orderID = Number(id); // 将id转换为number类型
    console.log('接收的id为' + orderID)
    const messageID = Number(id2); // 将id转换为number类型
    const userJson = Cookies.get('user');
    const user = userJson ? JSON.parse(userJson) : {};
    console.log(user.user_id)
    const [rating, setRating] = useState(3);

    const [review, setReview] = useState('');
    const [serviceID, setServiceID] = useState(0)
    const navigate = useNavigate()
    // //提交表单

    const [servicetitle, setServicetitle] = useState("Loadig...")


    //获取oder中的serviceID
    useEffect(() => {
        let timer = setTimeout(() => {
            showOrderById()
            getServiceTitleByOrderId()
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // 当 servicetitle 发生变化时重新渲染组件
        // 此时 servicetitle 的值已经是最新的
    }, [servicetitle]);


    const getServiceTitleByOrderId = () => {
        getAuthorization();
        axios
            .get('http://51.104.196.52:8090/api/v1/order/find_by_order?order_id=' + orderID, {})
            .then(async (res) => {
                console.log("res.data.data.service_title");
                console.log(res.data.data);
                setServicetitle(res.data.data[0].service_title)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const showOrderById = () => {
        getAuthorization();
        axios
            .get('http://51.104.196.52:8090/api/v1/order/find_by_order?order_id=' + orderID, {})
            .then(async (res) => {
                console.log("shabi");
                console.log(res.data.data[0].service_id);
                setServiceID(res.data.data[0].service_id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //五角星评分
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const RateStar: React.FC<RateStarProps> = ({ rating, setRating }) => {
        const [value, setValue] = useState(3);
        return (
            <span style={{ marginLeft: 40 }}>
                <Rate
                    tooltips={desc}
                    onChange={(value) => setRating(value)}
                    value={rating}
                />
                {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ""}
            </span>
        );
    };

    const onFinish = async (values: any) => {
        const review = values.review;
        if (!review) {
            alert("review cannot be empty.");
            return;
        }
        // 等待 showOrderById 执行
        showOrderById();
        // showOrderById();
        getAuthorization();
        axios.request({
            method: "POST",
            url: "http://51.104.196.52:8090/api/v1/review/add",
            params: { user_id: user.user_id, service_id: serviceID, content: review, rating: rating }
        }).then((res) => {
            alert("success");
            changeMessageStatus()
            navigate('/');
        })
        changeMessageStatus()
        console.log('Received values of form:', values);
    };


    const changeMessageStatus = () => {//change the status of message
        getAuthorization();
        axios.request({
            method: "PATCH",
            url: `http://51.104.196.52:8090/api/v1/update/info/update_msg_status/${messageID}?status=Completed`
        }).then((res) => {
            console.log("changeMessageStatus success")
        }
        );
    }

    return (
        <div>
            <Card>
                <Card
                    style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}
                    type="inner"
                    title="Review Your Service"
                >
                    {servicetitle && (<div style={{ marginLeft: 130 }}>
                        <div style={{ fontSize: '24px' }}>{servicetitle}</div>
                        {/* ... */}
                    </div>
                    )}

                    <Form
                        name="simple_form"
                        onFinish={onFinish}
                        style={{ marginTop: 30, marginLeft: 35, width: 500 }}
                    >
                        <Form.Item name="rating" label="rating">
                            <RateStar rating={rating} setRating={setRating} />
                        </Form.Item>
                        <Form.Item name="review" label="review">
                            <Input.TextArea
                                style={{ width: '100%', minHeight: 200 }}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>

                </Card>
            </Card>
        </div>
    )

}

export default ServiceReviewMessage










