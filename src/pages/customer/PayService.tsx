import 'react'
import PayForm from './PayForm';
import CustomerMenu from './CustomerMenu';
import { useParams } from 'react-router-dom';


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
}
interface PayServiceProps {
    serviceData: Service;
}

    const PayService: React.FC<PayServiceProps> = ({ serviceData }) => {
        console.log("servicedata")
        console.log(serviceData)


        return (
            <div>
                <div>
                    <div ><img className='serviceimage' alt="Loading" src={serviceData?.photos} /></div>
                    <div className='servicename'>{serviceData?.title}</div>
                    <div className='serviceprice'>￡{serviceData?.prices}</div>
                </div>
                <PayForm />
            </div>
        )
    }

export default PayService;