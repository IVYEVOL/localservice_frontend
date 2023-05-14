import 'react'
import './providerCss.css'
import CustomerMenu from './CustomerMenu'
import ServiceDesc from './ServiceDesc'
import ServiceReview from './OrderDesc'
import ServiceMap from './servicemap'
import { Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Review {
    ID: number ,
    CreatedAt: string,
    UpdatedAt: string,
    // "DeletedAt": null,
    //customer_id: string,
    // "service_id": 84,
    // "provider_id": 57,
    description: string,
    status: string,
    service_title: string,
    customer_name: string,
    customer_email: string,
    customer_phone: string,
    postcode: string,
    address: string,
    city: string,
    date: string,
    customer_id: number,

}



const ViewService = () => {
    const { id } = useParams<{ id: string }>();
    const serviceId = Number(id); // 将id转换为number类型
    console.log('接收的id为' + serviceId)

    // const [service, setService] = useState<Service>();
    const [review, setReview] = useState<Review[]>([]);//获取筛选状态后的review

    useEffect(() => {
        let timer = setTimeout(() => {
            showReview()
            // showServiceById();
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    // const showServiceById = () => {//获取service数据
    //     axios
    //         .get('http://51.104.196.52:8090/api/v1/public/service/' + serviceId, {})//获取该ID的service
    //         .then((res) => {
    //             const service: Service = res.data.data
    //             console.log('服务id')
    //             console.log(service.ID); // 获取服务 ID
    //             setService(service);

    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };



    const showReview = () => {//获取review数据
        axios
            .get('http://51.104.196.52:8090/api/v1/order/find_by_order?order_id='+ serviceId, {})//获取所有review
            .then((res) => {
                const reviews: Review[] = res.data.data.map((review: any, index: number) => ({
                    key: index,
                    ID: review.ID,
                    CreatedAt: review.CreatedAt,
                    UpdatedAt: review.UpdatedAt,
                    DeletedAt: review.DeletedAt,
                    user_id: review.user_id,
                    service_id: review.service_id,
                    city: review.city,
                    status: review.status,
                    service_title: review.service_title,
                    date: review.date,
                    description: review.description,
                    customer_name: review.customer_name,
                    customer_email: review.customer_email,
                    customer_phone: review.customer_phone,
                    postcode: review.postcode,
                    address: review.address,
                    customer_id: review.customer_id

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
        <div >
        {review ? (
            <>
                {/* <ServiceDesc serviceData={service} /> */}
                {review.map((item) => (
                    <ServiceReview reviewData={item} />
                ))}
                {/* <ServiceMap serviceMap={service} /> */}
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    )
}

// 由于 service 的初始值为 undefined，useState 钩子中的异步操作会导致 service 在组件首次渲染时没有值。
// 这就是为什么打印 serviceMap 输出 undefined 的原因。
// 为了解决这个问题，你可以在 service 变量有值之后，再渲染整个组件。

export default ViewService;