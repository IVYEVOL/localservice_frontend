import 'react'
import './customerccss.css'
import CustomerMenu from './CustomerMenu'
import ServiceDesc from './ServiceDesc'
import ServiceReview from './ServiceReview'
import ServiceMap from './servicemap'
import { Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Review {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    user_id: number;
    service_id: number;
    content: string;
}


const ViewService = () => {
    const { id } = useParams<{ id: string }>();
    const serviceId = Number(id); // 将id转换为number类型
    console.log('接收的id为' + serviceId)

    const [review, setReview] = useState<Review[]>([]);//获取筛选状态后的review


    useEffect(() => {
        let timer = setTimeout(() => {
            showReview()
        }, 0);

        return () => clearTimeout(timer);
    }, []);



    const showReview = () => {//获取review数据
        axios
            .get('http://51.104.196.52:8090/api/v1/public/review/list/10', {})//获取所有review
            .then((res) => {
                const reviews: Review[] = res.data.data.map((review: any, index: number) => ({
                    key: index,
                    ID: review.ID,
                    CreatedAt: review.CreatedAt,
                    UpdatedAt: review.UpdatedAt,
                    DeletedAt: review.DeletedAt,
                    user_id: review.user_id,
                    service_id: review.service_id,
                    content: review.content,
                }));
                setReview(reviews);//获取所有数据
                console.log("评论数据为：")
                console.log(res.data.data)
                // console.log(review);


            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <div>
            <ServiceDesc serviceId={serviceId} />

            {review.map((item) => (
                <ServiceReview reviewData={item} />
            ))}


            <ServiceMap />

        </div>
    )
}

export default ViewService;