import 'react'
import PayForm from './PayForm';
import CustomerMenu from './CustomerMenu';
import PayForm_service from './PayForm_service';

const PayService = () => {
    return (
        <div>
            <PayForm_service/>
            <PayForm />
        </div>
    )
}

export default PayService;