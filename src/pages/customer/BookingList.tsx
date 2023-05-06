import 'react'
import BookingOrderCard from './BookingOrderCard';
import { NavLink, Outlet } from 'react-router-dom';
import { Card } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';


const BookingList = () => {
    return (
        <div>
            <Card title="BoookingOrder List" style={{ marginLeft: 110, width: 1300, margin: '0 auto' }}>
                <Card
                    // cover={
                    //     <img 
                    //       alt="example"
                    //       src="https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg"
                    //     />
                    //   }
                    className='messagecard'

                    style={{ width: 1200 }}
                    type="inner"
                    title={
                        <span>
                            <ProfileOutlined style={{ marginRight: 8 }} />
                            Home cleanning Service
                        </span>
                    }
                
                extra={

                    <NavLink to="order">MORE</NavLink>
                }>
                <div>Booking Date:13/5/20023</div>
                <div>Booking Status: pending</div>
                <div>Booking Price: 96</div>
            </Card>
            <Outlet />
        </Card>
        </div >
    )
}

export default BookingList;