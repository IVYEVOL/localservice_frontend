import 'react'
import './customerccss.css'
import CustomerMenu from './CustomerMenu'
import ServiceDesc from './ServiceDesc'
import ServiceReview from './ServiceReview'

const ViewService = () => {
    return (
        <div>
            <CustomerMenu />
            <ServiceDesc/>
            <ServiceReview/>
            <ServiceReview/>
            <ServiceReview/>
            <ServiceReview/>
        </div>
    )
}

export default ViewService;