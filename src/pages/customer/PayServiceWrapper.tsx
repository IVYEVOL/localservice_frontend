import { useParams } from 'react-router-dom';
import PayService from './PayService';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
<<<<<<< HEAD
    service_title: string; // Add service_title property
=======
    service_title: string;
>>>>>>> 98c681d61527efb0d3caf1cbdcb78815fbacca0c
}


const PayServiceWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const serviceId = Number(id); // 将id转换为number类型
    // console.log("serviceId..........")
    // console.log(serviceId)

    const [service, setService] = useState<Service>();
   
    useEffect(() => {
        let timer = setTimeout(() => {
            showServiceById();
        }, 0);

        return () => clearTimeout(timer);
    }, []);


    const showServiceById = () => {//获取service数据
        axios
            .get('http://51.104.196.52:8090/api/v1/public/service/' + serviceId, {})//获取该ID的service
            .then((res) => {
                const service: Service = res.data.data
                console.log('服务')
                console.log(service); // 获取服务 ID
                setService(service);

            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    return service ? <PayService serviceData={service} /> : null;
    
};




export default PayServiceWrapper;